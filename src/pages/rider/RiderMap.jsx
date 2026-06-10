import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

export default function RiderMap() {
  const riderLocation = [28.6139, 77.209];
  const deliveryLocation = [28.7041, 77.1025];

  const nearbyRiders = [
    {
      id: 1,
      name: "Rahul",
      rating: 4.9,
      distance: "0.8 km",
      position: [28.62, 77.2],
    },
    {
      id: 2,
      name: "Amit",
      rating: 4.8,
      distance: "1.2 km",
      position: [28.61, 77.22],
    },
    {
      id: 3,
      name: "Deepak",
      rating: 4.7,
      distance: "1.7 km",
      position: [28.615, 77.215],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-[#1A1A2E]">
          🚚 Smart Rider Hub
        </h1>

        <p className="text-gray-600 mt-2">
          AI Route Optimization & Rider Collaboration
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Distance</h3>
          <p className="text-2xl font-bold">12.4 km</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">ETA</h3>
          <p className="text-2xl font-bold">22 min</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Traffic</h3>
          <p className="text-2xl font-bold text-orange-500">
            Moderate
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Nearby Riders</h3>
          <p className="text-2xl font-bold text-green-600">
            3
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Map */}
        <div className="col-span-8 bg-white rounded-3xl shadow overflow-hidden">
          <MapContainer
            center={riderLocation}
            zoom={12}
            style={{
              height: "650px",
              width: "100%",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Current Rider */}
            <Marker position={riderLocation}>
              <Popup>
                <strong>You</strong>
              </Popup>
            </Marker>

            {/* Delivery */}
            <Marker position={deliveryLocation}>
              <Popup>
                Delivery Destination
              </Popup>
            </Marker>

            {/* Route */}
            <Polyline
              positions={[
                riderLocation,
                deliveryLocation,
              ]}
            />

            {/* Nearby Riders */}
            {nearbyRiders.map((rider) => (
              <Marker
                key={rider.id}
                position={rider.position}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">
                      {rider.name}
                    </h3>

                    <p>
                      ⭐ {rider.rating}
                    </p>

                    <p>
                      📍 {rider.distance}
                    </p>

                    <button
                      style={{
                        background: "#FF5A1F",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        marginTop: "10px",
                      }}
                    >
                      Transfer Delivery
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-6">
          {/* Route Details */}
          <div className="bg-white rounded-2xl p-5 shadow">
            <h2 className="text-xl font-bold mb-4">
              Route Details
            </h2>

            <p>Distance: 12.4 km</p>
            <p>ETA: 22 min</p>
            <p>Status: Active</p>
          </div>

          {/* AI Recommendation */}
          <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-orange-500">
            <h2 className="text-xl font-bold mb-4">
              AI Recommendation
            </h2>

            <p className="font-semibold">
              Recommended Rider:
            </p>

            <p>Rahul ⭐ 4.9</p>
            <p>Distance: 0.8 km</p>
            <p>ETA Improvement: 18 min</p>

            <button className="mt-4 bg-[#FF5A1F] text-white px-4 py-2 rounded-xl">
              Send Transfer Request
            </button>
          </div>

          {/* Nearby Riders */}
          <div className="bg-white rounded-2xl p-5 shadow">
            <h2 className="text-xl font-bold mb-4">
              Nearby Riders
            </h2>

            {nearbyRiders.map((rider) => (
              <div
                key={rider.id}
                className="flex justify-between py-2 border-b"
              >
                <div>
                  <p className="font-medium">
                    {rider.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ⭐ {rider.rating}
                  </p>
                </div>

                <span>{rider.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}