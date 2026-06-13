import asyncio
import random

from app.db.session import AsyncSessionLocal
from app.models.models import (
    Rider,
    Customer,
    Supermarket,
    Order,
    RiderStatus,
    OrderStatus,
)

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def seed():
    async with AsyncSessionLocal() as db:
        from sqlalchemy import delete

        await db.execute(delete(Order))
        await db.execute(delete(Customer))
        await db.execute(delete(Supermarket))
        await db.execute(delete(Rider))
        await db.commit()

        print("Creating Riders...")

        riders = []

        rider_names = [
            "Rahul Sharma",
            "Priya Verma",
            "Amit Singh",
            "Neha Gupta",
            "Rohan Yadav",
            "Ankit Mishra",
            "Pooja Saxena",
            "Vikas Kumar",
        ]

        for i, name in enumerate(rider_names, start=1):
            rider = Rider(
                name=name,
                phone=f"98765000{i:02}",
                email=f"rider{i}@logiflow.com",
                hashed_password="demo_password",
                current_lat=26.85 + random.uniform(-0.03, 0.03),
                current_lon=80.95 + random.uniform(-0.03, 0.03),
                status="idle",
                avg_rating=round(random.uniform(4.3, 5.0), 1),
                total_deliveries=random.randint(50, 500),
                max_capacity=4,
                vehicle_type="bike",
            )

            db.add(rider)
            riders.append(rider)

        await db.commit()

        print("Creating Supermarkets...")

        supermarkets = [
            Supermarket(
                name="Reliance Fresh Hazratganj",
                address="Hazratganj, Lucknow",
                lat=26.8467,
                lon=80.9462,
            ),
            Supermarket(
                name="Big Bazaar Gomti Nagar",
                address="Gomti Nagar, Lucknow",
                lat=26.8500,
                lon=81.0000,
            ),
            Supermarket(
                name="DMart Indira Nagar",
                address="Indira Nagar, Lucknow",
                lat=26.8900,
                lon=81.0200,
            ),
            Supermarket(
                name="Spencer's Alambagh",
                address="Alambagh, Lucknow",
                lat=26.8100,
                lon=80.9000,
            ),
            Supermarket(
                name="Easyday Mahanagar",
                address="Mahanagar, Lucknow",
                lat=26.8800,
                lon=80.9500,
            ),
        ]

        for s in supermarkets:
            db.add(s)

        await db.commit()

        print("Creating Customers...")

        customer_ids = []

        areas = [
            "Hazratganj",
            "Gomti Nagar",
            "Indira Nagar",
            "Alambagh",
            "Mahanagar",
            "Jankipuram",
            "Aliganj",
            "Vikas Nagar",
            "Chinhat",
            "Rajajipuram",
        ]

        for i in range(1, 31):
            area = random.choice(areas)

            customer = Customer(
                name=f"Customer {i}",
                phone=f"9000000{i:03}",
                email=f"customer{i}@gmail.com",
                lat=26.85 + random.uniform(-0.05, 0.05),
                lon=80.95 + random.uniform(-0.05, 0.05),
                address=f"{area}, Lucknow",
            )

            db.add(customer)

        await db.commit()

        customers = (await db.execute(Customer.__table__.select())).fetchall()

        print("Creating Orders...")

        statuses = (
            [OrderStatus.pending] * 10
            + [OrderStatus.assigned] * 8
            + [OrderStatus.picked_up] * 7
            + [OrderStatus.delivered] * 5
        )

        random.shuffle(statuses)

        supermarkets_db = (
            await db.execute(Supermarket.__table__.select())
        ).fetchall()

        riders_db = (
            await db.execute(Rider.__table__.select())
        ).fetchall()

        for i in range(30):
            customer = random.choice(customers)
            supermarket = random.choice(supermarkets_db)

            status = statuses[i]

            rider_id = None

            if status != OrderStatus.pending:
                rider_id = random.choice(riders_db).id

            order = Order(
                customer_id=customer.id,
                supermarket_id=supermarket.id,
                rider_id=rider_id,
                delivery_lat=customer.lat,
                delivery_lon=customer.lon,
                delivery_address=customer.address,
                status=status,
                items_json='["Milk","Bread","Eggs"]',
                rider_to_market_km=round(random.uniform(1, 5), 1),
                market_to_customer_km=round(random.uniform(2, 10), 1),
                total_distance_km=round(random.uniform(3, 15), 1),
                assignment_score=round(random.uniform(70, 100), 1),
            )

            db.add(order)

        await db.commit()

        print("Demo data inserted successfully!")


if __name__ == "__main__":
    asyncio.run(seed())