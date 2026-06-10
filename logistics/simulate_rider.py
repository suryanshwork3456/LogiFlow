import asyncio
import random
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

# Tumhara exact database URL
DATABASE_URL = "postgresql+asyncpg://postgres:postgresaks@localhost:5432/delivery"

async def simulate_rider():
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)
    
    print("\n🚀 Live GPS Simulation Loop Shuru Ho Raha Hai... (Ctrl+C dabayein rokne ke liye)\n")
    
    # Nairobi coordinates jahan se shuru karna hai
    current_lat = -1.2921
    current_lon = 36.8219
    
    async with AsyncSessionLocal() as db:
        try:
            while True:
                # Thoda thoda location badalna
                current_lat += random.uniform(-0.001, 0.001)
                current_lon += random.uniform(-0.001, 0.001)
                
                # SEDA RAW SQL QUERY: Bina kisi model dependency ke seedhe database me update
                query = text("""
                    UPDATE public.riders 
                    SET current_lat = :lat, current_lon = :lon, status = 'idle'::riderstatus 
                    WHERE id = 1;
                """)
                
                await db.execute(query, {"lat": current_lat, "lon": current_lon})
                await db.commit()
                
                print(f"📡 [GPS PING] Rider 1 Live Location -> Lat: {current_lat:.5f}, Lon: {current_lon:.5f}")
                
                # Har 3 second me update hoga
                await asyncio.sleep(3)
                
        except asyncio.CancelledError:
            print("\nSimulation paused.")

if __name__ == "__main__":
    try:
        asyncio.run(simulate_rider())
    except KeyboardInterrupt:
        print("\nSimulation stopped. Bye!")