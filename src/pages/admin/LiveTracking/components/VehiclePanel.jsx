import { X, Phone, MessageCircle, Navigation, AlertTriangle, FileText, Star } from 'lucide-react';

const STATUS_COLORS = {
  'On Route': { bg: '#4CAF50', light: '#4CAF50' + '1A' },
  'Delayed': { bg: '#FF5722', light: '#FF5722' + '1A' },
  'Loading': { bg: '#FF9800', light: '#FF9800' + '1A' },
  'Idle': { bg: '#9E9E9E', light: '#9E9E9E' + '1A' },
};

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS['Idle'];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold"
      style={{ background: c.light, color: c.bg, border: `1px solid ${c.bg}33` }}
    >
      {status}
    </span>
  );
}

function ProgressBar({ value, color = '#FF5722', height = 6 }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: '#F0F0F0' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(value, 100)}%`, background: color }}
      />
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          fill={i <= Math.round(rating) ? '#FF9800' : 'none'}
          stroke={i <= Math.round(rating) ? '#FF9800' : '#CCC'}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-[#1A1A2E]">{rating}</span>
    </div>
  );
}

export default function VehiclePanel({ vehicle, onClose }) {
  if (!vehicle) return null;

  const deliveryPct = Math.round((vehicle.deliveries.done / vehicle.deliveries.total) * 100);
  const complianceColor = vehicle.speedCompliance >= 90 ? '#4CAF50' : vehicle.speedCompliance >= 75 ? '#FF9800' : '#FF5722';

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-[#E0E0E0] shadow-md overflow-hidden h-full"
         style={{ minHeight: 600 }}>

      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-[#E0E0E0] bg-[#FAFAFA]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-extrabold text-[#FF5722] leading-none">{vehicle.id}</div>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={vehicle.status} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F0F0] text-[#555F6D] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-2 text-xs text-[#555F6D] font-medium">
          <span className="font-bold text-[#1A1A2E]">{vehicle.company}</span>
          {' · '}{vehicle.city}, {vehicle.state}
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Section 1 — Live Stats Grid */}
        <div>
          <div className="text-[10px] font-bold text-[#555F6D] uppercase tracking-widest mb-3">Live Stats</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Driver', value: vehicle.driver },
              { label: 'Speed', value: `${vehicle.speed} km/h` },
              { label: 'ETA', value: vehicle.eta },
              { label: 'Distance Left', value: `${vehicle.distanceLeft} km` },
              { label: 'Last Ping', value: vehicle.lastPing },
              { label: 'Packages', value: vehicle.packageCount },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F8F8F8] rounded-xl p-3">
                <div className="text-[10px] font-semibold text-[#555F6D] uppercase tracking-wide mb-0.5">{label}</div>
                <div className="font-bold text-[#1A1A2E] text-sm leading-snug">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-[#F8F8F8] rounded-xl p-3">
            <div className="text-[10px] font-semibold text-[#555F6D] uppercase tracking-wide mb-0.5">Route</div>
            <div className="font-bold text-[#1A1A2E] text-sm">
              {vehicle.origin} <span className="text-[#FF5722]">→</span> {vehicle.destination}
            </div>
          </div>
        </div>

        {/* Section 2 — Fuel */}
        <div>
          <div className="text-[10px] font-bold text-[#555F6D] uppercase tracking-widest mb-3">Fuel Level</div>
          <div className="bg-[#F8F8F8] rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#1A1A2E]">Tank</span>
              <span className="text-sm font-bold" style={{
                color: vehicle.fuelLevel < 30 ? '#FF5722' : vehicle.fuelLevel < 50 ? '#FF9800' : '#4CAF50'
              }}>
                {vehicle.fuelLevel}%
              </span>
            </div>
            <ProgressBar
              value={vehicle.fuelLevel}
              color={vehicle.fuelLevel < 30 ? '#FF5722' : vehicle.fuelLevel < 50 ? '#FF9800' : '#4CAF50'}
              height={8}
            />
            {vehicle.fuelLevel < 30 && (
              <div className="mt-2 text-xs text-[#FF5722] font-semibold flex items-center gap-1">
                <AlertTriangle size={11} /> Low fuel — refuel soon
              </div>
            )}
          </div>
        </div>

        {/* Section 3 — Package Info */}
        <div>
          <div className="text-[10px] font-bold text-[#555F6D] uppercase tracking-widest mb-3">Package Info</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#F8F8F8] rounded-xl p-3 text-center">
              <div className="text-[10px] font-semibold text-[#555F6D] mb-1">Order ID</div>
              <div className="font-bold text-[#FF5722] text-xs">{vehicle.orderId}</div>
            </div>
            <div className="bg-[#F8F8F8] rounded-xl p-3 text-center">
              <div className="text-[10px] font-semibold text-[#555F6D] mb-1">Packages</div>
              <div className="font-bold text-[#1A1A2E] text-lg">{vehicle.packageCount}</div>
            </div>
            <div className="bg-[#F8F8F8] rounded-xl p-3 text-center">
              <div className="text-[10px] font-semibold text-[#555F6D] mb-1">Vehicle</div>
              <div className="font-bold text-[#1A1A2E] text-[10px] leading-tight">{vehicle.vehicle}</div>
            </div>
          </div>
        </div>

        {/* Section 4 — Driver Performance */}
        <div>
          <div className="text-[10px] font-bold text-[#555F6D] uppercase tracking-widest mb-3">Driver Performance</div>
          <div className="bg-[#F8F8F8] rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                   style={{ background: '#FF5722' }}>
                {vehicle.initials}
              </div>
              <div>
                <div className="font-bold text-[#1A1A2E] text-sm">{vehicle.driver}</div>
                <Stars rating={vehicle.rating} />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#555F6D] font-medium">Deliveries</span>
                  <span className="font-bold text-[#1A1A2E]">
                    {vehicle.deliveries.done}/{vehicle.deliveries.total}
                  </span>
                </div>
                <ProgressBar value={deliveryPct} color="#1A1A2E" height={5} />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#555F6D] font-medium">Speed Compliance</span>
                  <span className="font-bold" style={{ color: complianceColor }}>
                    {vehicle.speedCompliance}%
                  </span>
                </div>
                <ProgressBar value={vehicle.speedCompliance} color={complianceColor} height={5} />
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-[#555F6D] font-medium">Harsh Braking Today</span>
                <span className="font-bold" style={{ color: vehicle.harshBraking > 3 ? '#FF5722' : '#1A1A2E' }}>
                  {vehicle.harshBraking} event{vehicle.harshBraking !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 — Contact */}
        <div>
          <div className="text-[10px] font-bold text-[#555F6D] uppercase tracking-widest mb-3">Contact</div>
          <div className="flex gap-2">
            <a
              href={`tel:${vehicle.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#E0E0E0]
                         text-[#1A1A2E] font-semibold text-sm hover:bg-[#F5F5F5] transition-colors"
            >
              <Phone size={14} />
              <span>{vehicle.phone}</span>
            </a>
            <button className="w-11 flex items-center justify-center rounded-xl border border-[#25D366] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Sticky Quick Actions ── */}
      <div className="px-5 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] space-y-2">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                           bg-[#FF5722] text-white font-bold text-sm hover:bg-[#E64A19] transition-colors">
          <Navigation size={14} />
          Reroute Vehicle
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                           border border-[#FF5722] text-[#FF5722] font-bold text-sm
                           hover:bg-[#FF5722]/5 transition-colors">
          <AlertTriangle size={14} />
          Send Alert
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-1.5
                           text-[#555F6D] font-semibold text-xs hover:text-[#1A1A2E] transition-colors">
          <FileText size={12} />
          View Full Report
        </button>
      </div>
    </div>
  );
}