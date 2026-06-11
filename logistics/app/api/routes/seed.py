# """
# seed.py — Run once to populate DB and place orders.
# Usage: python seed.py
# Place this file alongside supermarkets.json, riders.json, customers.json
# """

# import httpx
# import json
# from pathlib import Path

# BASE = "http://localhost:8000/api"

# # with open("supermarkets.json") as f:
# #     supermarkets_data = json.load(f)

# # with open("riders.json") as f:
# #     riders_data = json.load(f)

# # with open("customers.json") as f:
# #     customers_data = json.load(f)

# SCRIPT_DIR = Path(__file__).resolve().parent

# with open(SCRIPT_DIR / "supermarkets.json") as f:
#     supermarkets_data = json.load(f)

# with open(SCRIPT_DIR / "riders.json") as f:
#     riders_data = json.load(f)

# with open(SCRIPT_DIR / "customers.json") as f:
#     customers_data = json.load(f)

# # ── Step 1: Supermarkets ──────────────────────────────────────────────────────

# # print("Seeding supermarkets...")
# # sm_id_map = {}

# # for sm in supermarkets_data["supermarkets"]:
# #     # Removed trailing slash to prevent standard redirect 405s
# #     res = httpx.post(f"{BASE}/supermarkets", json={
# #         "name": sm["name"],
# #         "lat":  sm["lat"],
# #         "lon":  sm["lon"],
# #     })
# #     if res.status_code == 201:
# #         sm_id_map[sm["id"]] = res.json()["id"]
# #         print(f"  ✓ {sm['name']}")
# #     else:
# #         print(f"  ✗ {sm['name']} → {res.status_code}: {res.text}")

# # print(f"Done: {len(sm_id_map)}/{len(supermarkets_data['supermarkets'])}\n")


# # ── Step 2: Riders ────────────────────────────────────────────────────────────
# # ── Step 2: Riders ────────────────────────────────────────────────────────────

# # print("Seeding riders...")
# # rider_id_map = {}

# # for rider in riders_data["riders"]:
# #     res = httpx.post(f"{BASE}/riders/", json={
# #     "name":         rider["name"],
# #     "phone":        rider["phone"],
# #     "current_lat":  rider["lat"],
# #     "current_lon":  rider["lon"],
# #     "vehicle_type": rider["vehicle"],  # ← add this
# # })
# #     if res.status_code == 201:
# #         rider_id_map[rider["id"]] = res.json()["id"]
# #         print(f"  ✓ {rider['name']}")
# #     else:
# #         print(f"  ✗ {rider['name']} → {res.status_code}: {res.text}")

# # print(f"Done: {len(rider_id_map)}/{len(riders_data['riders'])}\n")
# # # ── Step 3: Customers ─────────────────────────────────────────────────────────

# # # print("Seeding customers...")
# # # cu_id_map = {}

# # # for c in customers_data["customers"]:
# # #     res = httpx.post(f"{BASE}/customers/", json={
# # #         "name":  c["name"],
# # #         "phone": c["phone"],
# # #         "lat":   c["lat"],
# # #         "lon":   c["lon"],
# # #     })
# # #     if res.status_code == 201:
# # #         cu_id_map[c["id"]] = res.json()["id"]
# # #         print(f"  ✓ {c['name']}")
# # #     else:
# # #         print(f"  ✗ {c['name']} → {res.text}")

# # # print(f"Done: {len(cu_id_map)}/{len(customers_data['customers'])}\n")


# # # ── Step 4: Place Orders ──────────────────────────────────────────────────────

# # print("Placing orders...")
# # sm_db_ids = list(sm_id_map.values())
# # placed = 0

# # for c in customers_data["customers"]:
# #     cu_db_id = cu_id_map.get(c["id"])
# #     if not cu_db_id:
# #         continue

# #     res = httpx.post(f"{BASE}/orders/", json={
# #         "customer_id":    cu_db_id,
# #         "supermarket_id": random.choice(sm_db_ids),
# #         "delivery_lat":   c["lat"],
# #         "delivery_lon":   c["lon"],
# #     })
# #     if res.status_code == 201:
# #         placed += 1
# #         print(f"  ✓ Order for {c['name']}")
# #     else:
# #         print(f"  ✗ {c['name']} → {res.text}")
# #     time.sleep(0.05)

# # print(f"Done: {placed}/{len(customers_data['customers'])}\n")


# # ── Step 5: Trigger Assignment ────────────────────────────────────────────────
# # ── Step 5: Trigger Assignment ────────────────────────────────────────────────

# print("Running assignment engine...")
# try:
#     # Increased timeout just in case the engine calculation takes a bit of time
#     res = httpx.post(f"{BASE}/orders/trigger-assignment", timeout=60)
    
#     if res.status_code in [200, 201]:
#         try:
#             result = res.json()
            
#             print(f"\nResults:")
#             print(f"  Processed   : {result.get('total_processed', 0)}")
#             print(f"  Assigned    : {result.get('assigned', 0)}")
#             print(f"  Unassigned  : {result.get('unassigned', 0)}")

#             print("\nSample assignments:")
#             for a in result.get("details", [])[:10]:
#                 print(
#                     f"  Order {a.get('order_id', '???'):>4} → Rider {a.get('rider_id', '???'):>3} | "
#                     f"score: {a.get('efficiency_score', 0.0):.3f} | "
#                     f"dist: {a.get('total_distance_km', 0.0):.2f}km | "
#                     f"batch: {a.get('batch_id')[:8] if a.get('batch_id') else 'none'}"
#                 )
#         except json.JSONDecodeError:
#             # This catches the plain text responses and prevents the crash!
#             print(f"\nEngine ran successfully, but returned a non-JSON response.")
#             print(f"Server response text: {res.text}")
#     else:
#         print(f"Engine failed with status code {res.status_code}: {res.text}")
        
# except Exception as e:
#     print(f"Error communicating with assignment endpoint: {e}")


"""
seed.py — Run once to populate DB and place orders.
Usage: python seed.py
Place this file alongside supermarkets.json, riders.json, customers.json
"""

import httpx
import json
import random
import time
from pathlib import Path

BASE = "http://localhost:8000/api"

# Fixes working-directory conflicts dynamically
SCRIPT_DIR = Path(__file__).resolve().parent

with open(SCRIPT_DIR / "supermarkets.json") as f:
    supermarkets_data = json.load(f)

with open(SCRIPT_DIR / "riders.json") as f:
    riders_data = json.load(f)

with open(SCRIPT_DIR / "customers.json") as f:
    customers_data = json.load(f)


# # ── Step 1: Supermarkets ──────────────────────────────────────────────────────

# print("Seeding supermarkets...")
# sm_id_map = {}

# for sm in supermarkets_data.get("supermarkets", []):
#     res = httpx.post(f"{BASE}/supermarkets", json={
#         "name": sm["name"],
#         "lat":  sm["lat"],
#         "lon":  sm["lon"],
#     })
#     if res.status_code in [200, 201]:
#         sm_id_map[sm["id"]] = res.json()["id"]
#         print(f"  ✓ {sm['name']}")
#     else:
#         print(f"  ✗ {sm['name']} → {res.status_code}: {res.text}")

# print(f"Done: {len(sm_id_map)}/{len(supermarkets_data.get('supermarkets', []))}\n")


# # ── Step 2: Riders ────────────────────────────────────────────────────────────

# print("Seeding riders...")
# rider_id_map = {}

# for rider in riders_data.get("riders", []):
#     res = httpx.post(f"{BASE}/riders", json={
#         "name":         rider["name"],
#         "phone":        rider["phone"],
#         "current_lat":  rider["lat"],
#         "current_lon":  rider["lon"],
#         "vehicle_type": rider["vehicle"],
#     })
#     if res.status_code in [200, 201]:
#         rider_id_map[rider["id"]] = res.json()["id"]
#         print(f"  ✓ {rider['name']}")
#     else:
#         print(f"  ✗ {rider['name']} → {res.status_code}: {res.text}")

# print(f"Done: {len(rider_id_map)}/{len(riders_data.get('riders', []))}\n")

# import random

print("Seeding riders...")
rider_id_map = {}

for rider in riders_data.get("riders", []):
    res = httpx.post(f"{BASE}/riders/", json={
        "name":         rider["name"],
        "phone":        rider["phone"],
        "current_lat":  rider["lat"],
        "current_lon":  rider["lon"],
        "vehicle_type": rider["vehicle"],
        "rating":       round(random.uniform(3.5, 5.0), 2),   # random rating 3.5–5.0
        "total_deliveries": random.randint(10, 500),           # varied experience
    })
    if res.status_code in [200, 201]:
        rider_id_map[rider["id"]] = res.json()["id"]
        print(f"  ✓ {rider['name']}")
    else:
        print(f"  ✗ {rider['name']} → {res.status_code}: {res.text}")

print(f"Done: {len(rider_id_map)}/{len(riders_data.get('riders', []))}\n")
# # ── Step 3: Customers ─────────────────────────────────────────────────────────

# print("Seeding customers...")
# cu_id_map = {}

# for c in customers_data.get("customers", []):
#     res = httpx.post(f"{BASE}/customers", json={
#         "name":  c["name"],
#         "phone": c["phone"],
#         "lat":   c["lat"],
#         "lon":   c["lon"],
#     })
#     if res.status_code in [200, 201]:
#         cu_id_map[c["id"]] = res.json()["id"]
#         print(f"  ✓ {c['name']}")
#     else:
#         print(f"  ✗ {c['name']} → {res.text}")

# print(f"Done: {len(cu_id_map)}/{len(customers_data.get('customers', []))}\n")


# # ── Step 4: Place Orders ──────────────────────────────────────────────────────

# print("Placing orders...")
# sm_db_ids = list(sm_id_map.values())
# placed = 0

# if not sm_db_ids:
#     print("Cannot place orders: No supermarkets were seeded successfully.")
# else:
#     for c in customers_data.get("customers", []):
#         cu_db_id = cu_id_map.get(c["id"])
#         if not cu_db_id:
#             continue

#         res = httpx.post(f"{BASE}/orders/ ", json={
#             "customer_id":    cu_db_id,
#             "supermarket_id": random.choice(sm_db_ids),
#             "delivery_lat":   c["lat"],
#             "delivery_lon":   c["lon"],
#         })
#         if res.status_code in [200, 201]:
#             placed += 1
#             print(f"  ✓ Order for {c['name']}")
#         else:
#             print(f"  ✗ {c['name']} → {res.status_code}: {res.text}")
#         time.sleep(0.05)

# print(f"Done: {placed}/{len(customers_data.get('customers', []))}\n")


# ── Step 5: Trigger Assignment ────────────────────────────────────────────────

print("Running assignment engine...")
try:
    res = httpx.post(f"{BASE}/orders/trigger-assignment", timeout=60)
    
    if res.status_code in [200, 201]:
        try:
            result = res.json()
            
            print(f"\nResults:")
            print(f"  Processed   : {result.get('total_orders_processed', 0)}")
            print(f"  Assigned    : {len(result.get('assignments', []))}")
            print(f"  Unassigned  : {len(result.get('unassigned_order_ids', []))}")

            print("\nSample assignments:")
            for a in result.get("assignments", [])[:10]:
                print(
                    f"  Order {a.get('order_id', '???'):>4} → Rider {a.get('rider_id', '???'):>3} | "
                    f"score: {a.get('efficiency_score', 0.0):.3f} | "
                    f"dist: {a.get('total_distance_km', 0.0):.2f}km | "
                    f"batch: {a.get('batch_id')[:8] if a.get('batch_id') else 'none'}"
                )
        except json.JSONDecodeError:
            print(f"\nEngine ran successfully, but returned a non-JSON response.")
            print(f"Server response text: {res.text}")
    else:
        print(f"Engine failed with status code {res.status_code}: {res.text}")
        
except Exception as e:
    print(f"Error communicating with assignment endpoint: {e}")