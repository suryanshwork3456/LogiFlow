import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const STATUS_COLORS = {
  'On Route': '#4CAF50',
  'Delayed': '#FF5722',
  'Loading': '#FF9800',
  'Idle': '#9E9E9E',
};

const createVehicleIcon = (vehicle, isSelected) => {
  const color = STATUS_COLORS[vehicle.status] || '#9E9E9E';
  const pulseAnim = vehicle.status === 'Delayed'
    ? 'animation: ping 0.8s cubic-bezier(0,0,0.2,1) infinite;'
    : vehicle.status === 'On Route'
    ? 'animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite;'
    : '';

  return L.divIcon({
    className: '',
    html: `
      <style>
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      </style>
      <div style="position:relative;text-align:center;width:50px">
        <div style="
          position:relative;
          width:${isSelected ? '18px' : '14px'};
          height:${isSelected ? '18px' : '14px'};
          border-radius:50%;
          background:${color};
          box-shadow:0 0 ${isSelected ? '14px' : '8px'} ${color};
          border:2px solid white;
          margin:0 auto;
          z-index:2;
          ${isSelected ? 'transform:scale(1.3);' : ''}
        ">
          ${pulseAnim ? `<div style="
            position:absolute;inset:0;border-radius:50%;
            background:${color};opacity:0.5;
            ${pulseAnim}
          "></div>` : ''}
        </div>
        <div style="
          background:${isSelected ? color : 'white'};
          color:${isSelected ? 'white' : '#1A1A2E'};
          padding:1px 4px;
          border-radius:3px;
          font-size:9px;
          font-weight:bold;
          white-space:nowrap;
          margin-top:3px;
          box-shadow:0 1px 3px rgba(0,0,0,0.2);
          display:inline-block;
        ">${vehicle.id}</div>
      </div>`,
    iconSize: [50, 32],
    iconAnchor: [25, 8],
  });
};

const TILE_LAYERS = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
    label: 'Street View',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri',
    label: 'Satellite',
  },
};

function MapBoundsUpdater({ vehicles }) {
  const map = useMap();

  useEffect(() => {
    if (!vehicles || vehicles.length === 0) return;
    const bounds = L.latLngBounds(vehicles.map(v => [v.lat, v.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
  }, [vehicles, map]);

  return null;
}

export default function TrackingMap({ vehicles, selectedVehicle, onVehicleSelect }) {
  const [tileMode, setTileMode] = useState('street');

  if (!vehicles || vehicles.length === 0) {
    return (
      <div
        className="w-full rounded-2xl border border-[#E0E0E0] bg-[#F5F5F5] flex flex-col items-center justify-center"
        style={{ minHeight: 550 }}
      >
        <div className="text-5xl mb-4">🗺️</div>
        <p className="text-[#1A1A2E] font-bold text-lg">No vehicles match the current filters</p>
        <p className="text-[#555F6D] text-sm mt-1">Adjust company, city, or state filters to see vehicles</p>
      </div>
    );
  }

  const center = [vehicles[0].lat, vehicles[0].lng];

  return (
    <div
      className="relative w-full rounded-2xl border border-[#E0E0E0] overflow-hidden shadow-sm"
      style={{ minHeight: 550 }}
    >
      {/* Live badge */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-1
                      bg-[#4CAF50]/20 text-[#4CAF50] rounded-full border border-[#4CAF50]/40
                      backdrop-blur-sm">
        <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider">LIVE</span>
      </div>

      {/* Top-right controls row */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2">
        {/* Layer toggle button */}
        <button
          onClick={() => setTileMode(m => m === 'street' ? 'satellite' : 'street')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                     border backdrop-blur-sm transition-all duration-200"
          style={{
            background: tileMode === 'satellite' ? '#1A1A2E' : 'rgba(255,255,255,0.9)',
            color: tileMode === 'satellite' ? 'white' : '#1A1A2E',
            borderColor: tileMode === 'satellite' ? '#FF5722' : '#E0E0E0',
          }}
        >
          {tileMode === 'street' ? '🛰️ Satellite' : '🗺️ Street View'}
        </button>

        {/* Vehicle count badge */}
        <div className="px-3 py-1.5 bg-[#1A1A2E]/80 text-white rounded-full text-xs font-bold backdrop-blur-sm">
          {vehicles.length} vehicles
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={11}
        style={{ height: 550, width: '100%' }}
        zoomControl={false}
      >
        {/* Swap TileLayer based on tileMode state */}
        <TileLayer
          key={tileMode}
          url={TILE_LAYERS[tileMode].url}
          attribution={TILE_LAYERS[tileMode].attribution}
        />

        <MapBoundsUpdater vehicles={vehicles} />

        {vehicles.map(vehicle => {
          const color = STATUS_COLORS[vehicle.status] || '#9E9E9E';
          const isSelected = selectedVehicle?.id === vehicle.id;

          return (
            <div key={vehicle.id}>
              {/* Planned route — dashed orange */}
              <Polyline
                positions={vehicle.routePath}
                pathOptions={{
                  color: '#FF5722',
                  dashArray: '8 4',
                  weight: 2,
                  opacity: 0.6,
                }}
              />
              {/* Actual path traveled — solid status color */}
              <Polyline
                positions={vehicle.actualPath}
                pathOptions={{
                  color,
                  weight: 3,
                  opacity: 0.9,
                }}
              />
              {/* Vehicle marker */}
              <Marker
                position={[vehicle.lat, vehicle.lng]}
                icon={createVehicleIcon(vehicle, isSelected)}
                zIndexOffset={isSelected ? 1000 : 0}
                eventHandlers={{ click: () => onVehicleSelect(vehicle) }}
              >
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#FF5722', marginBottom: 2 }}>
                      {vehicle.id}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1A1A2E', marginBottom: 6 }}>
                      {vehicle.driver}
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                      <span style={{
                        background: '#FF5722', color: 'white',
                        borderRadius: 4, padding: '1px 7px', fontSize: 10, fontWeight: 700,
                      }}>
                        {vehicle.company}
                      </span>
                      <span style={{
                        background: color + '22', color,
                        borderRadius: 4, padding: '1px 7px', fontSize: 10, fontWeight: 700,
                        border: `1px solid ${color}44`,
                      }}>
                        {vehicle.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#555F6D', marginBottom: 8 }}>
                      ETA: <strong style={{ color: '#1A1A2E' }}>{vehicle.eta}</strong>
                    </div>
                    <button
                      onClick={() => onVehicleSelect(vehicle)}
                      style={{
                        background: '#FF5722', color: 'white',
                        border: 'none', borderRadius: 6,
                        padding: '5px 12px', fontWeight: 700,
                        fontSize: 11, cursor: 'pointer', width: '100%',
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}