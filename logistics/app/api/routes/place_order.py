import random
import httpx
import json

import time
customers = list(range(1, 131))   # customer IDs 1-130
supermarkets = list(range(1, 51)) # supermarket IDs 1-50

BASE = "http://localhost:8000/api"

for cust_id in customers:
    httpx.post(f"{BASE}/orders/", json={
        "customer_id": cust_id,
        "supermarket_id": random.choice(supermarkets),
        "delivery_lat": customers_data[cust_id]["lat"],
        "delivery_lon": customers_data[cust_id]["lon"],
    })