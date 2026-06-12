import { useState } from 'react';
import { Search, Clock } from 'lucide-react';

const STATUS_COLORS = {
  'On Route': '#4CAF50',
  'Delayed': '#FF5722',
  'Loading': '#FF9800',
  'Idle': '#9E9E9E',
};

const STATUS_BG = {
  'On Route': '#4CAF50' + '18',
  'Delayed': '#FF5722' + '18',
  'Loading': '#FF9800' + '18',
  'Idle': '#9E9E9E' + '18',
};

export default function FleetList({ vehicles, selectedVehicle, onVehicleSelect }) {
  const [search, setSearch] = useState('');

  const filtered = vehicles.filter(v =>
    v.id.toLowerCase().includes(search.toLowerCase()) ||
    v.driver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E0E0E0] flex items-center justify-between bg-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1A1A2E] text-sm">Fleet List</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5722]/10 text-[#FF5722]">
            {vehicles.length}
          </span>
        </div>
        <div className="flex gap-2 text-[10px] font-semibold text-[#555F6D]">
          <span style={{ color: '#4CAF50' }}>● {vehicles.filter(v => v.status === 'On Route').length} On Route</span>
          <span style={{ color: '#FF5722' }}>● {vehicles.filter(v => v.status === 'Delayed').length} Delayed</span>
          <span style={{ color: '#FF9800' }}>● {vehicles.filter(v => v.status === 'Loading').length} Loading</span>
          <span style={{ color: '#9E9E9E' }}>● {vehicles.filter(v => v.status === 'Idle').length} Idle</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] rounded-xl">
          <Search size={13} className="text-[#555F6D] shrink-0" />
          <input
            type="text"
            placeholder="Search by vehicle ID or driver name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-xs text-[#1A1A2E] placeholder-[#999] outline-none w-full font-medium"
          />
        </div>
      </div>

      {/* List */}
      <div className="overflow-y-auto" style={{ maxHeight: 320 }}>
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-[#555F6D] text-sm">
            <div className="text-3xl mb-2">🔍</div>
            No vehicles match "{search}"
          </div>
        ) : (
          filtered.map(vehicle => {
            const isSelected = selectedVehicle?.id === vehicle.id;
            const borderColor = STATUS_COLORS[vehicle.status] || '#9E9E9E';
            const statusBg = STATUS_BG[vehicle.status] || '#9E9E9E18';

            return (
              <button
                key={vehicle.id}
                onClick={() => onVehicleSelect(vehicle)}
                className="w-full text-left px-4 py-3 border-b border-[#F0F0F0] last:border-b-0
                           flex items-center justify-between gap-3 transition-colors duration-150"
                style={{
                  borderLeft: `3px solid ${borderColor}`,
                  background: isSelected ? '#FFF5F2' : 'transparent',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#FAFAFA'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold shrink-0"
                    style={{ background: borderColor }}
                  >
                    {vehicle.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#1A1A2E] text-sm">{vehicle.id}</div>
                    <div className="text-xs text-[#555F6D] font-medium truncate">{vehicle.driver}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: '#1A1A2E', color: 'white' }}
                  >
                    {vehicle.company}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: statusBg, color: borderColor }}
                  >
                    {vehicle.status}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px] text-[#555F6D]">
                    <Clock size={9} />
                    <span>{vehicle.eta}</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}