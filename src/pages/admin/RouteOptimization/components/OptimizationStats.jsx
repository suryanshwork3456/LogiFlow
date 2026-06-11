import { useMemo } from 'react';
import { TrendingDown, IndianRupee, Timer, Route } from 'lucide-react';

export default function OptimizationStats({ summary, routes }) {
  const liveAvgReduction = useMemo(() => {
    if (!routes.length) return summary.avgDistanceReduction;
    const avg = routes.reduce((a, r) => a + r.distanceReduction, 0) / routes.length;
    return Math.round(avg);
  }, [routes, summary.avgDistanceReduction]);

  const stats = [
    {
      icon: TrendingDown,
      value: `${liveAvgReduction}%`,
      label: 'Avg Distance Reduced',
      sub: 'vs manual dispatch',
    },
    {
      icon: IndianRupee,
      value: `₹${summary.totalFuelSaved.toLocaleString()}`,
      label: 'Total Fuel Saved Today',
      sub: 'across all routes',
    },
    {
      icon: Timer,
      value: `${summary.avgOptimizationTime} sec`,
      label: 'Optimization Time',
      sub: 'per route optimization',
    },
    {
      icon: Route,
      value: summary.maxStopsSupported,
      label: 'Max Stops Supported',
      sub: 'per single route',
    },
  ];

  return (
    <div className="bg-[#1A1A2E] rounded-2xl shadow-xl overflow-hidden">
      <div className="px-6 pt-5 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
          <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Live Performance</span>
        </div>
        <span className="text-white/40 text-[10px]">Updated {summary.lastOptimizedAt}</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="px-6 py-6 flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF5722]/20 flex items-center justify-center mb-1">
                <Icon size={18} className="text-[#FF5722]" />
              </div>
              <div className="text-3xl font-extrabold text-[#FF5722] leading-none">{s.value}</div>
              <div className="text-white/90 font-bold text-xs tracking-wide uppercase">{s.label}</div>
              <div className="text-white/40 text-[10px]">{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-white/40 text-[10px] font-mono">{summary.algorithmVersion}</span>
        <span className="text-white/40 text-[10px]">{summary.totalRoutesOptimized} total routes optimized</span>
      </div>
    </div>
  );
}