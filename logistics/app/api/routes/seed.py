"""
seed.py — Run once to populate DB and place orders.
Usage: python seed.py
Place this file alongside supermarkets.json, riders.json, customers.json
"""

import httpx
import json
import random
import time

BASE = "http://localhost:8000/api"

with open("supermarkets.json") as f:
    supermarkets_data = json.load(f)

with open("riders.json") as f:
    riders_data = json.load(f)

with open("customers.json") as f:
    customers_data = json.load(f)


# ── Step 1: Supermarkets ──────────────────────────────────────────────────────

# print("Seeding supermarkets...")
# sm_id_map = {}

# for sm in supermarkets_data["supermarkets"]:
#     res = httpx.post(f"{BASE}/supermarkets/", json={
#         "name": sm["name"],
#         "lat":  sm["lat"],
#         "lon":  sm["lon"],
#     })
#     if res.status_code == 201:
#         sm_id_map[sm["id"]] = res.json()["id"]
#         print(f"  ✓ {sm['name']}")
#     else:
#         print(f"  ✗ {sm['name']} → {res.text}")

# print(f"Done: {len(sm_id_map)}/{len(supermarkets_data['supermarkets'])}\n")


# ── Step 2: Riders ────────────────────────────────────────────────────────────

print("Seeding riders...")
rider_id_map = {}

for rider in riders_data["riders"]:
    res = httpx.post(f"{BASE}/auth/register", json={
        "name":         rider["name"],
        "phone":        rider["phone"],
        "password":     "password123",
        "max_capacity": 4,
    })
    if res.status_code != 201:
        print(f"  ✗ {rider['name']} → {res.text}")
        continue

    db_id = res.json()["id"]
    rider_id_map[rider["id"]] = db_id

    login = httpx.post(f"{BASE}/auth/login", json={
        "phone": rider["phone"], "password": "password123"
    })
    token = login.json().get("access_token")
    if token:
        httpx.patch(
            f"{BASE}/riders/me/location",
            json={"lat": rider["lat"], "lon": rider["lon"]},
            headers={"Authorization": f"Bearer {token}"},
        )
    print(f"  ✓ {rider['name']}")

print(f"Done: {len(rider_id_map)}/{len(riders_data['riders'])}\n")


# ── Step 3: Customers ─────────────────────────────────────────────────────────

# print("Seeding customers...")
# cu_id_map = {}

# for c in customers_data["customers"]:
#     res = httpx.post(f"{BASE}/customers/", json={
#         "name":  c["name"],
#         "phone": c["phone"],
#         "lat":   c["lat"],
#         "lon":   c["lon"],
#     })
#     if res.status_code == 201:
#         cu_id_map[c["id"]] = res.json()["id"]
#         print(f"  ✓ {c['name']}")
#     else:
#         print(f"  ✗ {c['name']} → {res.text}")

# print(f"Done: {len(cu_id_map)}/{len(customers_data['customers'])}\n")


# ── Step 4: Place Orders ──────────────────────────────────────────────────────

print("Placing orders...")
sm_db_ids = list(sm_id_map.values())
placed = 0

for c in customers_data["customers"]:
    cu_db_id = cu_id_map.get(c["id"])
    if not cu_db_id:
        continue

    res = httpx.post(f"{BASE}/orders/", json={
        "customer_id":    cu_db_id,
        "supermarket_id": random.choice(sm_db_ids),
        "delivery_lat":   c["lat"],
        "delivery_lon":   c["lon"],
    })
    if res.status_code == 201:
        placed += 1
        print(f"  ✓ Order for {c['name']}")
    else:
        print(f"  ✗ {c['name']} → {res.text}")
    time.sleep(0.05)

print(f"Done: {placed}/{len(customers_data['customers'])}\n")


# ── Step 5: Trigger Assignment ────────────────────────────────────────────────

print("Running assignment engine...")
res = httpx.post(f"{BASE}/orders/trigger-assignment", timeout=30)
result = res.json()

print(f"\nResults:")
print(f"  Processed  : {result['total_processed']}")
print(f"  Assigned   : {result['assigned']}")
print(f"  Unassigned : {result['unassigned']}")

print("\nSample assignments:")
for a in result["details"][:10]:
    print(
        f"  Order {a['order_id']:>4} → Rider {a['rider_id']:>3} | "
        f"score: {a['efficiency_score']:.3f} | "
        f"dist: {a['total_distance_km']:.2f}km | "
        f"batch: {a['batch_id'][:8] if a['batch_id'] else 'none'}"
    )

print("\n--- Summary ---")
assigned = httpx.get(f"{BASE}/orders/?status=assigned&limit=200").json()
pending  = httpx.get(f"{BASE}/orders/?status=pending&limit=200").json()
print(f"Assigned : {len(assigned)}")
print(f"Pending  : {len(pending)}")