import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// --------------------
// FIX LEAFLET ICON ISSUE
// --------------------
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// --------------------
// FIXED LOCATION
// --------------------
const warehouse = [28.6139, 77.2090];

// --------------------
// CUSTOM ICON (BOX STYLE)
// --------------------
function icon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:14px;
      height:14px;
      background:${color};
      border-radius:4px;
      border:2px solid white;
      box-shadow:0 0 6px rgba(0,0,0,0.3);
    "></div>`
  });
}

export default function LiveMap() {
  // --------------------
  // DRIVER STATE
  // --------------------
  const [drivers, setDrivers] = useState([
    { id: 1, name: "Rajan", lat: 28.620, lng: 77.210, status: "on" },
    { id: 2, name: "Priya", lat: 28.630, lng: 77.225, status: "delay" },
    { id: 3, name: "Arjun", lat: 28.610, lng: 77.200, status: "on" }
  ]);

  // --------------------
  // LIVE MOVEMENT SIMULATION
  // --------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev =>
        prev.map(d => ({
          ...d,
          lat: d.lat + (Math.random() - 0.5) * 0.003,
          lng: d.lng + (Math.random() - 0.5) * 0.003
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={warehouse}
      zoom={12}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "16px"
      }}
    >
      {/* MAP LAYER */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* WAREHOUSE */}
      <Marker position={warehouse} icon={icon("black")}>
        <Popup>🏬 Warehouse</Popup>
      </Marker>

      {/* DRIVERS (LIVE MOVING) */}
      {drivers.map(d => (
        <Marker
          key={d.id}
          position={[d.lat, d.lng]}
          icon={icon(d.status === "on" ? "#22c55e" : "#ef4444")}
        >
          <Popup>
            <b>{d.name}</b>
            <br />
            Status: {d.status === "on" ? "Active 🟢" : "Delayed 🔴"}
          </Popup>
        </Marker>
      ))}

      {/* ROUTES (WAREHOUSE → DRIVER) */}
      {drivers.map(d => (
        <Polyline
          key={d.id}
          positions={[warehouse, [d.lat, d.lng]]}
          color="#3b82f6"
          weight={3}
          dashArray="6 10"
        />
      ))}
    </MapContainer>
  );
}