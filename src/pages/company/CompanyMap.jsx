import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import CompanyLayout from "./CompanyLayout";

/* ICON FIX */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const getStatusColor = (status) => {
  if (status === "On Time") return "#22c55e";
  if (status === "At Risk") return "#f59e0b";
  return "#ef4444";
};

export default function CompanyMap() {
  const warehouse = [28.6139, 77.209];

  const riders = [
    {
      id: 1,
      name: "Rahul Singh",
      status: "On Time",
      order: "ORD-7821",
      eta: "12 min",
      distance: "8.4 km",
      rating: "4.8",
      current: [28.628, 77.22],
      destination: [28.642, 77.235],
    },
    {
      id: 2,
      name: "Aman Kumar",
      status: "At Risk",
      order: "ORD-7834",
      eta: "18 min",
      distance: "12 km",
      rating: "4.7",
      current: [28.622, 77.24],
      destination: [28.655, 77.28],
    },
    {
      id: 3,
      name: "Deepak Sharma",
      status: "Delayed",
      order: "ORD-7855",
      eta: "42 min",
      distance: "22 km",
      rating: "4.5",
      current: [28.63, 77.255],
      destination: [28.67, 77.31],
    },
  ];

  const [selectedRider, setSelectedRider] = useState(riders[0]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredRiders = riders.filter((rider) => {
    const matchesStatus =
      filter === "All" || rider.status === filter;

    const matchesSearch =
      rider.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      rider.order
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <CompanyLayout title="Fleet Command Center">

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

        <StatCard title="Active Riders" value="34" />

        <StatCard title="Deliveries" value="176" />

        <StatCard
          title="Delayed"
          value="3"
          valueClass="text-red-500"
        />

        <StatCard
          title="Revenue"
          value="₹1.2L"
          valueClass="text-green-600"
        />

        <StatCard title="Avg ETA" value="18 min" />

      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-6">

        {/* Left Panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow p-4">

          <h2 className="font-bold mb-4">
            🚚 Fleet Riders
          </h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search rider or order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-2
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-[#FF5A1F]
            "
          />

          {/* Filters */}
          <div className="flex gap-2 mb-5 flex-wrap">

            {["All", "On Time", "At Risk", "Delayed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm transition ${
                  filter === status
                    ? "bg-[#FF5A1F] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}

          </div>

          {/* Rider List */}
          {filteredRiders.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedRider(r)}
              className={`p-3 mb-3 rounded-xl cursor-pointer border transition ${
                selectedRider.id === r.id
                  ? "bg-blue-50 border-blue-500"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between">

                <b>{r.name}</b>

                <span
                  style={{
                    color: getStatusColor(r.status),
                  }}
                  className="text-sm font-semibold"
                >
                  {r.status}
                </span>

              </div>

              <p className="text-sm text-gray-500">
                {r.order}
              </p>

              <p className="text-sm">
                ETA: {r.eta}
              </p>

            </div>
          ))}

          {filteredRiders.length === 0 && (
            <p className="text-gray-500 text-sm">
              No riders found.
            </p>
          )}

        </div>

        {/* Map */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow p-4">

          <div className="flex justify-between mb-3">

            <h2 className="font-bold">
              🗺️ Live Fleet Map
            </h2>

            <span className="text-sm text-gray-500">
              Tracking: {selectedRider.name}
            </span>

          </div>

          <MapContainer
            center={selectedRider.current}
            zoom={13}
            style={{
              height: "520px",
              borderRadius: "12px",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredRiders.map((r) => (
              <Marker
                key={r.id}
                position={r.current}
              >
                <Popup>
                  <b>{r.name}</b>

                  <br />

                  {r.status}

                  <br />

                  {r.order}
                </Popup>
              </Marker>
            ))}

            <Polyline
              positions={[
                warehouse,
                selectedRider.current,
                selectedRider.destination,
              ]}
              color="blue"
            />

          </MapContainer>

        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow p-5">

          <h2 className="font-bold mb-5">
            📦 Delivery Intelligence
          </h2>

          <Info
            label="Rider"
            value={selectedRider.name}
          />

          <Info
            label="Order"
            value={selectedRider.order}
          />

          <Info
            label="ETA"
            value={selectedRider.eta}
          />

          <Info
            label="Distance"
            value={selectedRider.distance}
          />

          <Info
            label="Rating"
            value={`⭐ ${selectedRider.rating}`}
          />

        </div>

      </div>

    </CompanyLayout>
  );
}

function StatCard({
  title,
  value,
  valueClass = "",
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className={`text-2xl font-bold ${valueClass}`}>
        {value}
      </h2>

    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div className="mb-4">

      <p className="text-gray-500">
        {label}
      </p>

      <p className="font-semibold">
        {value}
      </p>

    </div>
  );
}