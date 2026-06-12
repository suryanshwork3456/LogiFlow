// pages/admin/Analytics/index.jsx
import { useState, useMemo } from 'react';
import { BarChart2, Filter, X } from 'lucide-react';
import { useAdminFilter } from '../../../context/AdminFilterContext';

import CompanyReports from './components/CompanyReports';
import TrendCharts from './components/TrendCharts';
import RiderAnalytics from './components/RiderAnalytics';
import RevenueAnalytics from './components/RevenueAnalytics';
import ExportPanel from './components/ExportPanel';

import {
  COMPANY_REPORTS,
  STATE_GROWTH,
  RIDER_TRENDS,
  REVENUE_BREAKDOWN,
  TIME_RANGES,
} from './AnalyticsData';

const buildCSV = (data, excludeKeys = []) => {
  if (!data || data.length === 0) return '';
  const allKeys = Object.keys(data[0]).filter(k => !excludeKeys.includes(k));
  const header = allKeys.join(',');
  const rows = data.map(obj =>
    allKeys.map(k => {
      const val = obj[k];
      if (val === null || val === undefined) return '';
      const str = String(val);
      return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
    }).join(',')
  );
  return [header, ...rows].join('\n');
};

const ARRAY_FIELDS = ['dailyOrders', 'dailyFuelSaved', 'weeklyDeliveries', 'monthlyTrend', 'cities'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const { filters } = useAdminFilter();

  const filteredCompanies = useMemo(() =>
    COMPANY_REPORTS.filter(c => {
      if (filters.company !== 'All Companies' && c.company !== filters.company) return false;
      if (filters.state !== 'All States' && c.state !== filters.state) return false;
      if (filters.city !== 'All Cities' && c.city !== filters.city) return false;
      return true;
    }),
    [filters]
  );

  const filteredRiders = useMemo(() =>
    RIDER_TRENDS.filter(r => {
      if (filters.company !== 'All Companies' && r.company !== filters.company) return false;
      if (filters.state !== 'All States' && r.state !== filters.state) return false;
      return true;
    }),
    [filters]
  );

  const handleExport = (company) => {
    const csv = buildCSV([company], ARRAY_FIELDS);
    const safeRange = timeRange.replace(/\s/g, '-');
    const safeName = company.company.toLowerCase().replace(/\s/g, '-');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logiflow-${safeName}-${safeRange}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Build filter label for banner
  const activeFilters = [
    filters.company !== 'All Companies' && `Company: ${filters.company}`,
    filters.state !== 'All States' && `State: ${filters.state}`,
    filters.city !== 'All Cities' && `City: ${filters.city}`,
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 w-full space-y-8" style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#1A1A2E' }}
          >
            <BarChart2 size={20} color="#FF5722" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#1A1A2E' }}>Analytics & Reports</h1>
            <p className="text-sm mt-0.5" style={{ color: '#555F6D' }}>
              Historical trends, performance reports, and actionable insights
            </p>
          </div>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-gray-200 shadow-sm self-start sm:self-auto">
          {TIME_RANGES.map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
              style={
                timeRange === range
                  ? { backgroundColor: '#FF5722', color: '#fff' }
                  : { color: '#555F6D', backgroundColor: 'transparent' }
              }
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter banner */}
      {activeFilters.length > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border"
          style={{ backgroundColor: '#FFF8E1', borderColor: '#FFE082' }}
        >
          <Filter size={14} style={{ color: '#F57F17' }} />
          <span className="text-sm font-medium" style={{ color: '#F57F17' }}>
            Filters active:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(f => (
              <span
                key={f}
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: '#FF980020', color: '#E65100' }}
              >
                {f}
              </span>
            ))}
          </div>
          <span className="text-xs ml-auto" style={{ color: '#9E9E9E' }}>
            Showing filtered results
          </span>
        </div>
      )}

      {/* Empty state */}
      {filteredCompanies.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-xl border-2 border-dashed"
          style={{ borderColor: '#E0E0E0', backgroundColor: '#FAFAFA' }}
        >
          <X size={36} className="mb-3" style={{ color: '#BDBDBD' }} />
          <h3 className="text-base font-semibold text-gray-600">No companies match your filters</h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your filter selections to see analytics data.
          </p>
        </div>
      )}

      {filteredCompanies.length > 0 && (
        <>
          <CompanyReports companies={filteredCompanies} onExport={handleExport} />
          <TrendCharts stateGrowth={STATE_GROWTH} companies={filteredCompanies} />
        </>
      )}

      <RiderAnalytics riders={filteredRiders.length > 0 ? filteredRiders : RIDER_TRENDS} />
      <RevenueAnalytics revenue={REVENUE_BREAKDOWN} />
      <ExportPanel
        companies={filteredCompanies}
        stateGrowth={STATE_GROWTH}
        riders={filteredRiders.length > 0 ? filteredRiders : RIDER_TRENDS}
        revenue={REVENUE_BREAKDOWN}
        timeRange={timeRange}
      />
    </div>
  );
}