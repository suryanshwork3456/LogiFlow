// src/pages/admin/AIDelayPrediction/index.jsx
import React, { useState, useMemo } from 'react';
import PredictionMetrics from './components/PredictionMetrics';
import RiskScoreTable from './components/RiskScoreTable';
import PredictionChart from './components/PredictionChart';
import VariablesPanel from './components/VariablesPanel';
import RiskDetailModal from './components/RiskDetailModal';
import { ALL_ROUTES, PREDICTION_METRICS, HOURLY_ACCURACY, VARIABLES } from './AIDelayData';
import { useAdminFilter } from '../../../context/AdminFilterContext';

export default function AIDelayPredictionPage() {
  const { filters } = useAdminFilter();
  const [selectedRoute, setSelectedRoute] = useState(null);

  const filteredRoutes = useMemo(() => {
    return ALL_ROUTES.filter(r => {
      if (filters.company !== 'All Companies' && r.company !== filters.company) return false;
      if (filters.state !== 'All States' && r.state !== filters.state) return false;
      if (filters.city !== 'All Cities' && r.city !== filters.city) return false;
      return true;
    });
  }, [filters]);

  const activeFilterLabel = useMemo(() => {
    const parts = [];
    if (filters.company !== 'All Companies') parts.push(filters.company);
    if (filters.state !== 'All States') parts.push(filters.state);
    if (filters.city !== 'All Cities') parts.push(filters.city);
    return parts.length ? parts.join(' · ') : '';
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 w-full space-y-8">
      {/* Active filter banner */}
      {activeFilterLabel && (
        <div className="bg-[#1A1A2E] text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="font-semibold">Filters active:</span> {activeFilterLabel}
        </div>
      )}

      {/* Top metrics */}
      <PredictionMetrics
        metrics={PREDICTION_METRICS}
        routesCount={filteredRoutes.length}
      />

      {/* Risk table */}
      <RiskScoreTable
        routes={filteredRoutes}
        onRouteSelect={setSelectedRoute}
      />

      {/* Hourly accuracy chart */}
      <PredictionChart hourlyData={HOURLY_ACCURACY} />

      {/* Variables panel */}
      <VariablesPanel variables={VARIABLES} />

      {/* Route detail modal */}
      {selectedRoute && (
        <RiskDetailModal
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
        />
      )}
    </div>
  );
}