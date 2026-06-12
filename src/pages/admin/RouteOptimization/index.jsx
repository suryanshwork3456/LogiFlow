import { useState, useMemo } from 'react';
import { ALL_ROUTES, OPTIMIZATION_SUMMARY } from "./RouteOptimization";
import OptimizationComparison from './components/OptimizationComparison';
import ActiveRoutesTable from './components/ActiveRoutesTable';
import OptimizationStats from './components/OptimizationStats';
import HowItWorks from './components/HowItWorks';
import RouteDetailModal from './components/RouteDetailModal';
import { useAdminFilter } from '../../../context/AdminFilterContext';
import { X } from 'lucide-react';

export default function RouteOptimizationPage() {
  const { filters } = useAdminFilter();
  const [selectedRoute, setSelectedRoute] = useState(null);

  const filteredRoutes = useMemo(
    () =>
      ALL_ROUTES.filter((r) => {
        if (filters.company && filters.company !== 'All Companies' && r.company !== filters.company) return false;
        if (filters.state && filters.state !== 'All States' && r.state !== filters.state) return false;
        if (filters.city && filters.city !== 'All Cities' && r.city !== filters.city) return false;
        return true;
      }),
    [filters]
  );

  const activeFilters = [
    filters.company && filters.company !== 'All Companies' && { label: 'Company', value: filters.company },
    filters.state && filters.state !== 'All States' && { label: 'State', value: filters.state },
    filters.city && filters.city !== 'All Cities' && { label: 'City', value: filters.city },
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 w-full space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A2E]">Route Optimization</h1>
          <p className="text-sm text-[#555F6D] mt-0.5">AI-powered delivery route optimization across all fleets</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#555F6D]">
          <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
          Live · {OPTIMIZATION_SUMMARY.lastOptimizedAt}
        </div>
      </div>

      {/* Active filter banner */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-[#FF5722]/8 border border-[#FF5722]/20 rounded-xl">
          <span className="text-xs font-bold text-[#FF5722]">Filtered:</span>
          {activeFilters.map((f, i) => (
            <span key={i} className="px-2.5 py-0.5 bg-[#FF5722] text-white text-xs font-bold rounded-full">
              {f.label}: {f.value}
            </span>
          ))}
          <span className="text-xs text-[#555F6D] ml-1">
            Showing {filteredRoutes.length} of {ALL_ROUTES.length} routes
          </span>
        </div>
      )}

      {/* Before/After comparison */}
      <OptimizationComparison routes={filteredRoutes} />

      {/* Active routes table */}
      <ActiveRoutesTable routes={filteredRoutes} onRouteSelect={setSelectedRoute} />

      {/* Stats bar */}
      <OptimizationStats summary={OPTIMIZATION_SUMMARY} routes={filteredRoutes} />

      {/* How it works */}
      <HowItWorks />

      {/* Detail modal */}
      {selectedRoute && (
        <RouteDetailModal route={selectedRoute} onClose={() => setSelectedRoute(null)} />
      )}
    </div>
  );
}