import json, random, uuid
 
# City center (e.g., Lucknow)
LAT, LON = 26.8467, 80.9462
SPREAD = 0.08  # ~9km radius
 
def rand_coord():
    return round(LAT + random.uniform(-SPREAD, SPREAD), 6), \
           round(LON + random.uniform(-SPREAD, SPREAD), 6)
 
supermarket_names = ["FreshMart","QuickShop","DailyBasket","MegaStore","CityGrocer",
"SuperSave","PrimePick","ValueMart","FoodHub","GreenGrocer","SmartShop","BestBuy Mart",
"EasyCart","PeoplesMart","UrbanStore","FastGrocer","NearbyMart","LocalHub","TownShop",
"FreshZone","QuickBuy","DailyNeeds","MegaMart","CitySupermart","SaveMore","PrimeMart",
"ValueShop","FoodZone","GreenMart","SmartCart","BestMart","EasyShop","PeoplesStore",
"UrbanMart","FastShop","NearbyCart","LocalMart","TownMart","FreshHub","QuickZone",
"DailySave","MegaHub","CityStore","SaveZone","PrimeSave","ValueZone","FoodSave",
"GreenHub","SmartSave","BestZone"]
 
first = ["Amit","Priya","Rahul","Neha","Vikram","Sunita","Rohan","Pooja","Suresh","Kavita",
"Arun","Meena","Ravi","Anita","Sanjay","Rekha","Deepak","Nisha","Manoj","Seema",
"Ajay","Rina","Sunil","Geeta","Ramesh","Usha","Vinod","Lata","Prasad","Manju"]
last = ["Sharma","Verma","Singh","Gupta","Mishra","Yadav","Tiwari","Pandey","Joshi","Srivastava"]
 
def make_person(i, prefix):
    f = random.choice(first)
    l = random.choice(last)
    lat, lon = rand_coord()
    return {"id": f"{prefix}-{i+1:03}", "name": f"{f} {l}",
            "phone": f"9{random.randint(100000000,999999999)}",
            "lat": lat, "lon": lon}
 
supermarkets = []
for i in range(50):
    lat, lon = rand_coord()
    supermarkets.append({"id": f"SM-{i+1:03}", "name": supermarket_names[i],
                         "lat": lat, "lon": lon,
                         "rating": round(random.uniform(3.5, 5.0), 1)})
 
riders = []
for i in range(30):
    r = make_person(i, "RD")
    r["vehicle"] = random.choice(["bike","scooter","bicycle"])
    r["available"] = random.choice([True, False])
    riders.append(r)
 
customers = [make_person(i, "CU") for i in range(150)]
 
data = {"city": "Lucknow", "supermarkets": supermarkets,
        "riders": riders, "customers": customers}
 
with open("city_data.json", "w") as f:
    json.dump(data, f, indent=2)
 
print(f"✅ city_data.json generated — {len(supermarkets)} supermarkets, {len(riders)} riders, {len(customers)} customers")