import { useMemo } from 'react';
import { Zap, MapPin, Route, Fuel, Truck, AlertCircle } from 'lucide-react';

export default function StatsBar({ vehicles }) {
  const stats = useMemo(() => {
    if (!vehicles || vehicles.length === 0) {
      return {
        avgSpeed: 0,
        totalDistance: 0,
        fuelSaved: 0,
        activeCount: 0,
        delayedCount: 0,
      };
    }

    const avgSpeed = Math.round(
      vehicles.reduce((s, v) => s + v.speed, 0) / vehicles.length
    );

    const totalDistance = Math.round(
      vehicles.reduce((s, v) => s + (v.deliveries.done * (4 + 5 * 6)), 0)
    );

    const fuelSaved = Math.round(vehicles.length * 280);

    const activeCount = vehicles.filter(v => v.status === 'On Route').length;
    const delayedCount = vehicles.filter(v => v.status === 'Delayed').length;

    return { avgSpeed, totalDistance, fuelSaved, activeCount, delayedCount };
  }, [vehicles]);

  const items = [
    {
      icon: <Zap size={18} />,
      value: `${stats.avgSpeed} km/h`,
      label: 'Avg Speed',
    },
    {
      icon: <MapPin size={18} />,
      value: '±3m',
      label: 'GPS Accuracy',
    },
    {
      icon: <Route size={18} />,
      value: `${stats.totalDistance.toLocaleString('en-IN')} km`,
      label: 'Total Distance Today',
    },
    {
      icon: <Fuel size={18} />,
      value: `₹${stats.fuelSaved.toLocaleString('en-IN')}`,
      label: 'Fuel Saved',
    },
    {
      icon: <Truck size={18} />,
      value: stats.activeCount,
      label: 'Active Vehicles',
    },
    {
      icon: <AlertCircle size={18} />,
      value: stats.delayedCount,
      label: 'Delayed',
      valueColor: stats.delayedCount > 0 ? '#FF5722' : '#4CAF50',
    },
  ];

  return (
    <div
      className="w-full rounded-2xl px-8 py-6 shadow-xl"
      style={{ background: '#1A1A2E' }}
    >
      <div className="flex flex-wrap lg:flex-nowrap justify-around items-center gap-6">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-8">
            <div className="flex flex-col items-center text-center min-w-[90px]">
              <div className="mb-2 opacity-50 text-white">{item.icon}</div>
              <div
                className="text-3xl font-extrabold text-white leading-none mb-1"
                style={item.valueColor ? { color: item.valueColor } : {}}
              >
                {item.value}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF5722]">
                {item.label}
              </div>
            </div>
            {i < items.length - 1 && (
              <div className="hidden lg:block w-px h-12 bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}