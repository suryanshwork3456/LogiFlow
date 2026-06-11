"""
Assignment Engine
-----------------
Orchestrates the full assignment cycle:

  1. Fetch all pending orders + available riders from DB
  2. Build batches (batching_service)
  3. For each batch, score all riders (scoring_service)
  4. Greedily assign best available rider per batch
  5. Persist assignments to DB

Run on a Celery beat schedule (every N seconds) OR triggered on new order.
"""

import logging
from datetime import datetime, timezone
from typing import List, Dict

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, func

from app.models.models import Order, Rider, Supermarket, OrderStatus, RiderStatus
from app.schemas.schemas import AssignmentResult, BatchAssignmentResult
from app.services.batching_service import build_batches, BatchGroup
from app.services.scoring_service import rank_riders_for_batch, ScoreBreakdown

logger = logging.getLogger(__name__)


# ── Helpers ───────────────────────────────────────────────────────────────────

async def _fetch_pending_orders(db: AsyncSession) -> List[Order]:
    result = await db.execute(
        select(Order)
        .where(Order.status == OrderStatus.pending)
        .order_by(Order.created_at.asc())
    )
    return result.scalars().all()


async def _fetch_available_riders(db: AsyncSession) -> List[Rider]:
    result = await db.execute(
        select(Rider).where(
            Rider.is_active == True,
            Rider.status.in_([RiderStatus.idle, RiderStatus.delivering]),
            Rider.current_lat.is_not(None),
        )
    )
    return result.scalars().all()


async def _fetch_supermarket(db: AsyncSession, supermarket_id: int) -> Supermarket:
    result = await db.execute(
        select(Supermarket).where(Supermarket.id == supermarket_id)
    )
    return result.scalar_one_or_none()


async def _build_active_orders_map(riders: List[Rider], db: AsyncSession) -> Dict[int, int]:
    """Query Postgres for each rider's active order count."""
    rider_ids = [r.id for r in riders]
    result = await db.execute(
        select(Order.rider_id, func.count(Order.id))
        .where(
            Order.rider_id.in_(rider_ids),
            Order.status.in_([OrderStatus.assigned, OrderStatus.picked_up])
        )
        .group_by(Order.rider_id)
    )
    rows = result.all()

    # Default 0 for riders with no active orders
    mapping = {r.id: 0 for r in riders}
    for rider_id, count in rows:
        mapping[rider_id] = count
    return mapping


# ── Core assignment logic ─────────────────────────────────────────────────────

async def run_assignment_cycle(db: AsyncSession) -> BatchAssignmentResult:
    """
    Full assignment cycle. Safe to call repeatedly.
    """
    pending_orders = await _fetch_pending_orders(db)
    available_riders = await _fetch_available_riders(db)

    if not pending_orders:
        logger.info("Assignment cycle: no pending orders")
        return BatchAssignmentResult(
            assignments=[],
            unassigned_order_ids=[],
            total_orders_processed=0,
        )

    if not available_riders:
        logger.warning("Assignment cycle: no available riders for %d orders", len(pending_orders))
        return BatchAssignmentResult(
            assignments=[],
            unassigned_order_ids=[o.id for o in pending_orders],
            total_orders_processed=len(pending_orders),
        )

    # Build batches from pending orders
    batches: List[BatchGroup] = build_batches(pending_orders)

    # Get active-order counts from Postgres
    active_orders_map = await _build_active_orders_map(available_riders, db)  # FIX: was missing `db`

    # Track which riders are still "available" this cycle (greedy lock)
    taken_rider_ids = set()

    assignments: List[AssignmentResult] = []
    unassigned_order_ids: List[int] = []

    for batch in batches:
        supermarket = await _fetch_supermarket(db, batch.supermarket_id)
        if not supermarket:
            logger.error("Supermarket %d not found for batch %s", batch.supermarket_id, batch.batch_id)
            unassigned_order_ids.extend(batch.order_ids)
            continue

        # Score all eligible, not-yet-taken riders
        eligible_riders = [r for r in available_riders if r.id not in taken_rider_ids]
        ranked: List[ScoreBreakdown] = rank_riders_for_batch(
            batch=batch,
            riders=eligible_riders,
            active_orders_map=active_orders_map,
            market_lat=supermarket.lat,
            market_lon=supermarket.lon,
        )

        if not ranked:
            unassigned_order_ids.extend(batch.order_ids)
            continue

        best: ScoreBreakdown = ranked[0]
        rider_id = best.rider_id

        # Persist: update all orders in this batch
        now = datetime.now(timezone.utc)
        await db.execute(
            update(Order)
            .where(Order.id.in_(batch.order_ids))
            .values(
                rider_id=rider_id,
                status=OrderStatus.assigned,
                batch_id=batch.batch_id,
                rider_to_market_km=best.rider_to_market_km,
                market_to_customer_km=best.market_to_centroid_km,
                total_distance_km=best.total_distance_km,
                assignment_score=best.total_score,
                assigned_at=now,
            )
        )
        await db.commit()

        # Update in-memory active order counts
        active_orders_map[rider_id] = active_orders_map.get(rider_id, 0) + len(batch.order_ids)

        # Mark rider as taken for this cycle
        taken_rider_ids.add(rider_id)

        for order_id in batch.order_ids:
            assignments.append(AssignmentResult(
                order_id=order_id,
                rider_id=rider_id,
                efficiency_score=best.total_score,
                distance_score=best.distance_score,
                batch_score=best.batch_score,
                rating_score=best.rating_score,
                busyness_score=best.busyness_score,
                batch_id=batch.batch_id,
                total_distance_km=best.total_distance_km,
            ))

    logger.info(
        "Assignment cycle done: %d assigned, %d unassigned",
        len(assignments), len(unassigned_order_ids),
    )
    return BatchAssignmentResult(
        assignments=assignments,
        unassigned_order_ids=unassigned_order_ids,
        total_orders_processed=len(pending_orders),
    )


# ── Single-order trigger ──────────────────────────────────────────────────────

async def assign_single_order(order_id: int, db: AsyncSession) -> AssignmentResult | None:
    """
    Immediately try to assign one specific order (called on new order creation).
    Falls back to the next scheduled cycle if no rider is available.
    """
    order = await db.get(Order, order_id)
    if not order or order.status != OrderStatus.pending:
        return None

    result = await run_assignment_cycle(db)
    for a in result.assignments:
        if a.order_id == order_id:
            return a
    return None



# """
# Assignment Engine
# -----------------
# Orchestrates the full assignment cycle:

#   1. Fetch all pending orders + available riders from DB
#   2. Build batches (batching_service)
#   3. For each batch, score all riders (scoring_service)
#   4. Greedily assign best available rider per batch
#   5. Persist assignments to DB

# Run on a Celery beat schedule (every N seconds) OR triggered on new order.
# """

# import logging
# from datetime import datetime, timezone
# from typing import List, Dict

# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import select, update, func, cast
# from sqlalchemy.dialects.postgresql import ENUM

# from app.models.models import Order, Rider, Supermarket, OrderStatus, RiderStatus
# from app.schemas.schemas import AssignmentResult, BatchAssignmentResult
# from app.services.batching_service import build_batches, BatchGroup
# from app.services.scoring_service import rank_riders_for_batch, ScoreBreakdown

# logger = logging.getLogger(__name__)


# # ── Helpers ───────────────────────────────────────────────────────────────────

# async def _fetch_pending_orders(db: AsyncSession) -> List[Order]:
#     result = await db.execute(
#         select(Order)
#         .where(Order.status == OrderStatus.pending)
#         .order_by(Order.created_at.asc())
#     )
#     return result.scalars().all()


# async def _fetch_available_riders(db: AsyncSession) -> List[Rider]:
#     result = await db.execute(
#         select(Rider).where(
#             Rider.is_active == True,
#             Rider.status.in_([RiderStatus.idle, RiderStatus.delivering]),
#             Rider.current_lat.is_not(None),
#         )
#     )
#     return result.scalars().all()


# async def _fetch_supermarket(db: AsyncSession, supermarket_id: int) -> Supermarket:
#     result = await db.execute(
#         select(Supermarket).where(Supermarket.id == supermarket_id)
#     )
#     return result.scalar_one_or_none()


# async def _build_active_orders_map(riders: List[Rider], db: AsyncSession) -> Dict[int, int]:
#     """Query Postgres for each rider's active order count."""
#     rider_ids = [r.id for r in riders]
#     result = await db.execute(
#         select(Order.rider_id, func.count(Order.id))
#         .where(
#             Order.rider_id.in_(rider_ids),
#             Order.status.in_([OrderStatus.assigned, OrderStatus.picked_up])
#         )
#         .group_by(Order.rider_id)
#     )
#     rows = result.all()

#     # Default 0 for riders with no active orders
#     mapping = {r.id: 0 for r in riders}
#     for rider_id, count in rows:
#         mapping[rider_id] = count
#     return mapping


# # ── Core assignment logic ─────────────────────────────────────────────────────

# async def run_assignment_cycle(db: AsyncSession) -> BatchAssignmentResult:
#     """
#     Full assignment cycle. Safe to call repeatedly.
#     """
#     pending_orders = await _fetch_pending_orders(db)
#     available_riders = await _fetch_available_riders(db)

#     if not pending_orders:
#         logger.info("Assignment cycle: no pending orders")
#         return BatchAssignmentResult(
#             assignments=[],
#             unassigned_order_ids=[],
#             total_orders_processed=0,
#         )

#     if not available_riders:
#         logger.warning("Assignment cycle: no available riders for %d orders", len(pending_orders))
#         return BatchAssignmentResult(
#             assignments=[],
#             unassigned_order_ids=[o.id for o in pending_orders],
#             total_orders_processed=len(pending_orders),
#         )

#     # Build batches from pending orders
#     batches: List[BatchGroup] = build_batches(pending_orders)

#     # Get active-order counts from Postgres
#     active_orders_map = await _build_active_orders_map(available_riders, db)

#     # Track which riders are still "available" this cycle (greedy lock)
#     taken_rider_ids = set()

#     assignments: List[AssignmentResult] = []
#     unassigned_order_ids: List[int] = []

#     for batch in batches:
#         supermarket = await _fetch_supermarket(db, batch.supermarket_id)
#         if not supermarket:
#             logger.error("Supermarket %d not found for batch %s", batch.supermarket_id, batch.batch_id)
#             unassigned_order_ids.extend(batch.order_ids)
#             continue

#         # Score all eligible, not-yet-taken riders
#         eligible_riders = [r for r in available_riders if r.id not in taken_rider_ids]
#         ranked: List[ScoreBreakdown] = rank_riders_for_batch(
#             batch=batch,
#             riders=eligible_riders,
#             active_orders_map=active_orders_map,
#             market_lat=supermarket.lat,
#             market_lon=supermarket.lon,
#         )

#         if not ranked:
#             unassigned_order_ids.extend(batch.order_ids)
#             continue

#         best: ScoreBreakdown = ranked[0]
#         rider_id = best.rider_id

#         # Persist: update all orders in this batch
#         now = datetime.now(timezone.utc)
#         await db.execute(
#             update(Order)
#             .where(Order.id.in_(batch.order_ids))
#             .values(
#                 rider_id=rider_id,
#                 status=OrderStatus.assigned,
#                 batch_id=batch.batch_id,
#                 rider_to_market_km=best.rider_to_market_km,
#                 market_to_customer_km=best.market_to_centroid_km,
#                 total_distance_km=best.total_distance_km,
#                 assignment_score=best.total_score,
#                 assigned_at=now,
#             )
#         )
#         await db.commit()

#         # Update in-memory active order counts
#         active_orders_map[rider_id] = active_orders_map.get(rider_id, 0) + len(batch.order_ids)

#         # Mark rider as taken for this cycle
#         taken_rider_ids.add(rider_id)

#         for order_id in batch.order_ids:
#             assignments.append(AssignmentResult(
#                 order_id=order_id,
#                 rider_id=rider_id,
#                 efficiency_score=best.total_score,
#                 distance_score=best.distance_score,
#                 batch_score=best.batch_score,
#                 rating_score=best.rating_score,
#                 busyness_score=best.busyness_score,
#                 batch_id=batch.batch_id,
#                 total_distance_km=best.total_distance_km,
#             ))

#     logger.info(
#         "Assignment cycle done: %d assigned, %d unassigned",
#         len(assignments), len(unassigned_order_ids),
#     )
#     return BatchAssignmentResult(
#         assignments=assignments,
#         unassigned_order_ids=unassigned_order_ids,
#         total_orders_processed=len(pending_orders),
#     )


# # ── Single-order trigger ──────────────────────────────────────────────────────

# async def assign_single_order(order_id: int, db: AsyncSession) -> AssignmentResult | None:
#     """
#     Immediately try to assign one specific order (called on new order creation).
#     Falls back to the next scheduled cycle if no rider is available.
#     """
#     order = await db.get(Order, order_id)
#     if not order or order.status != OrderStatus.pending:
#         return None

#     result = await run_assignment_cycle(db)
#     for a in result.assignments:
#         if a.order_id == order_id:
#             return a
#     return None