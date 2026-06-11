import { useState, useMemo, useEffect } from 'react';
import { Truck, MapPin, AlertCircle, CheckCircle, Filter, X } from 'lucide-react';

// Component imports
import TrackingMap from './components/TrackingMap';
import VehiclePanel from './components/VehiclePanel';
import FleetList from './components/FleetList';
import StatsBar from './components/StatsBar';
import DriverCards from './components/DriverCards';

// Data
import { ALL_VEHICLES } from './LiveTrackingData';

import { useAdminFilter } from '../../../context/AdminFilterContext';

// ── KPI Card ──────────────────────────────────────────────────────────
function KPICard({ icon, label, value, sub, accent, bgAccent }) {
  return (
    <div
      className="flex-1 min-w-[160px] bg-white rounded-2xl border border-[#E0E0E0] px-5 py-4 shadow-sm
                 flex items-center gap-4"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: bgAccent }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div>
        <div className="text-2xl font-extrabold text-[#1A1A2E] leading-none">{value}</div>
        <div className="text-xs font-bold text-[#555F6D] mt-0.5">{label}</div>
        {sub && <div className="text-[10px] font-semibold mt-0.5" style={{ color: accent }}>{sub}</div>}
      </div>
    </div>
  );
}

// ── Filter Banner ──────────────────────────────────────────────────────
function FilterBanner({ filters }) {
  const active = Object.entries(filters).filter(([k, v]) =>
    v && v !== 'All Companies' && v !== 'All Cities' && v !== 'All States' && v !== null
  );

  if (active.length === 0) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#FF5722]/8 border border-[#FF5722]/20 rounded-xl">
      <Filter size={14} className="text-[#FF5722] shrink-0" />
      <span className="text-sm font-semibold text-[#1A1A2E]">
        Filters active:
      </span>
      <div className="flex flex-wrap gap-2">
        {active.map(([key, val]) => (
          <span
            key={key}
            className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FF5722]/15 text-[#FF5722]"
          >
            {key}: {String(val)}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────
export default function LiveTrackingPage() {
  const { filters } = useAdminFilter();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Reset selected vehicle when filters change
  useEffect(() => {
    setSelectedVehicle(null);
  }, [filters]);

  // Filter vehicles based on active filters
  const filteredVehicles = useMemo(() =>
    ALL_VEHICLES.filter(v => {
      if (filters.company !== 'All Companies' && v.company !== filters.company) return false;
      if (filters.city !== 'All Cities' && v.city !== filters.city) return false;
      if (filters.state !== 'All States' && v.state !== filters.state) return false;
      return true;
    }),
    [filters]
  );

  // Derived KPI counts
  const onRouteCount = filteredVehicles.filter(v => v.status === 'On Route').length;
  const delayedCount = filteredVehicles.filter(v => v.status === 'Delayed').length;
  const loadingCount = filteredVehicles.filter(v => v.status === 'Loading').length;
  const idleCount = filteredVehicles.filter(v => v.status === 'Idle').length;

  return (
    <div className="max-w-full px-6 md:px-10 py-6 w-full space-y-6" style={{ background: '#F5F5F5', minHeight: '100vh' }}>

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A2E]">Live Tracking</h1>
          <p className="text-sm text-[#555F6D] font-medium mt-0.5">
            Real-time fleet visibility across all cities
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
          <span className="text-xs font-bold text-[#4CAF50] uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* ── Filter Banner ── */}
      <FilterBanner filters={filters} />

      {/* ── KPI Row ── */}
      <div className="flex flex-wrap gap-4">
        <KPICard
          icon={<Truck size={20} />}
          label="Total Fleet"
          value={filteredVehicles.length}
          sub={`${ALL_VEHICLES.length} total fleet`}
          accent="#1A1A2E"
          bgAccent="#1A1A2E12"
        />
        <KPICard
          icon={<CheckCircle size={20} />}
          label="On Route"
          value={onRouteCount}
          sub={`${Math.round((onRouteCount / (filteredVehicles.length || 1)) * 100)}% of fleet`}
          accent="#4CAF50"
          bgAccent="#4CAF5015"
        />
        <KPICard
          icon={<AlertCircle size={20} />}
          label="Delayed"
          value={delayedCount}
          sub={delayedCount > 0 ? 'Needs attention' : 'All on time'}
          accent="#FF5722"
          bgAccent="#FF572215"
        />
        <KPICard
          icon={<MapPin size={20} />}
          label="Loading / Idle"
          value={loadingCount + idleCount}
          sub={`${loadingCount} loading · ${idleCount} idle`}
          accent="#FF9800"
          bgAccent="#FF980015"
        />
      </div>

      {/* ── Main Area: Map + Side Panel ── */}
      <div className="flex gap-5 items-start">

        {/* Map + Fleet List column */}
        <div className={selectedVehicle ? 'w-[65%]' : 'w-full'} style={{ transition: 'width 0.3s ease' }}>
          <TrackingMap
            vehicles={filteredVehicles}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
          />
          <FleetList
            vehicles={filteredVehicles}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
          />
        </div>

        {/* Vehicle detail panel */}
        {selectedVehicle && (
          <div className="w-[35%] shrink-0" style={{ transition: 'opacity 0.3s ease' }}>
            <VehiclePanel
              vehicle={selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
            />
          </div>
        )}
      </div>

      {/* ── Stats Bar ── */}
      <StatsBar vehicles={filteredVehicles} />

      {/* ── Driver Performance Cards ── */}
      <DriverCards vehicles={filteredVehicles} />

    </div>
  );
}