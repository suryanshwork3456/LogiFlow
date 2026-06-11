import { useMemo } from 'react';
import { Star, Zap, AlertTriangle } from 'lucide-react';

function ProgressBar({ value, color = '#4CAF50', height = 5 }) {
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
          stroke={i <= Math.round(rating) ? '#FF9800' : '#DDD'}
        />
      ))}
      <span className="ml-1 text-xs font-bold text-[#1A1A2E]">{rating}</span>
    </div>
  );
}

export default function DriverCards({ vehicles }) {
  const topDrivers = useMemo(() => {
    if (!vehicles || vehicles.length === 0) return [];
    return [...vehicles]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, [vehicles]);

  if (topDrivers.length === 0) {
    return null;
  }

  const STATUS_COLORS = {
    'On Route': '#4CAF50',
    'Delayed': '#FF5722',
    'Loading': '#FF9800',
    'Idle': '#9E9E9E',
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E0E0E0] shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-extrabold text-[#1A1A2E]">Top Performers Today</h2>
        <span className="text-xs font-semibold text-[#555F6D]">Ranked by rating</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {topDrivers.map((vehicle, index) => {
          const deliveryPct = Math.round((vehicle.deliveries.done / vehicle.deliveries.total) * 100);
          const complianceColor = vehicle.speedCompliance >= 90 ? '#4CAF50' : '#FF9800';
          const statusColor = STATUS_COLORS[vehicle.status] || '#9E9E9E';

          return (
            <div
              key={vehicle.id}
              className="border border-[#E8E8E8] rounded-xl p-5 bg-[#FAFAFA]
                         hover:shadow-md hover:border-[#FF5722]/30 transition-all duration-200 relative"
            >
              {/* Rank badge */}
              <div
                className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center
                           text-[10px] font-extrabold"
                style={{
                  background: index === 0 ? '#FF9800' : index === 1 ? '#9E9E9E' : '#CD7F32',
                  color: 'white',
                }}
              >
                #{index + 1}
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg shrink-0"
                  style={{ background: '#FF5722' }}
                >
                  {vehicle.initials}
                </div>
                <div>
                  <div className="font-bold text-[#1A1A2E] text-[15px] leading-tight">{vehicle.driver}</div>
                  <div className="text-[10px] font-bold text-[#555F6D] uppercase tracking-wider mt-0.5">
                    {vehicle.id}
                  </div>
                  <div className="mt-1">
                    <Stars rating={vehicle.rating} />
                  </div>
                </div>
              </div>

              {/* Status + Company */}
              <div className="flex gap-2 mb-4">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: statusColor + '20', color: statusColor }}
                >
                  {vehicle.status}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A1A2E]/10 text-[#1A1A2E]">
                  {vehicle.company}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                {/* Deliveries */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#555F6D] font-medium">Deliveries</span>
                    <span className="font-bold text-[#1A1A2E]">
                      {vehicle.deliveries.done}/{vehicle.deliveries.total}
                    </span>
                  </div>
                  <ProgressBar value={deliveryPct} color="#1A1A2E" />
                </div>

                {/* Speed compliance */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <div className="flex items-center gap-1 text-[#555F6D] font-medium">
                      <Zap size={10} />
                      Speed Compliance
                    </div>
                    <span className="font-bold" style={{ color: complianceColor }}>
                      {vehicle.speedCompliance}%
                    </span>
                  </div>
                  <ProgressBar value={vehicle.speedCompliance} color={complianceColor} />
                </div>

                {/* Harsh braking */}
                <div className="flex justify-between items-center text-xs pt-1 border-t border-[#EEEEEE]">
                  <div className="flex items-center gap-1 text-[#555F6D] font-medium">
                    <AlertTriangle size={10} />
                    Harsh Braking
                  </div>
                  <span
                    className="font-bold"
                    style={{ color: vehicle.harshBraking > 3 ? '#FF5722' : vehicle.harshBraking > 0 ? '#FF9800' : '#4CAF50' }}
                  >
                    {vehicle.harshBraking} event{vehicle.harshBraking !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}