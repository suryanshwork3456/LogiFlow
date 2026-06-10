// filepath: src/components/admin/AdminFilterBar.jsx
import React from 'react';
import { RotateCcw, ChevronDown } from 'lucide-react';
import { useAdminFilter, FILTER_DATA } from '../../context/AdminFilterContext.jsx';

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-[#E0E0E0] text-[#1A1A2E] text-sm font-semibold rounded-xl px-4 py-2.5 pr-9 focus:outline-none focus:border-[#FF5722] cursor-pointer hover:border-[#FF5722] transition-colors min-w-[140px]"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555F6D] pointer-events-none"
      />
    </div>
  );
}

export default function AdminFilterBar() {
  const { filters, updateFilter, resetFilters } = useAdminFilter();

  const cityOptions = FILTER_DATA.cities[filters.state] || ['All Cities'];

  const isFiltered =
    filters.state !== 'All States' ||
    filters.city !== 'All Cities' ||
    filters.company !== 'All Companies' ||
    filters.dateRange !== 'Today';

  return (
    <div className="bg-white border-b border-[#E0E0E0] px-6 py-3 flex flex-wrap items-center gap-3">

      {/* Filter label */}
      <span className="text-xs font-bold text-[#555F6D] uppercase tracking-widest shrink-0">
        Filter:
      </span>

      {/* State */}
      <FilterSelect
        label="State"
        value={filters.state}
        options={FILTER_DATA.states}
        onChange={(val) => updateFilter('state', val)}
      />

      {/* City — cascades from state */}
      <FilterSelect
        label="City"
        value={filters.city}
        options={cityOptions}
        onChange={(val) => updateFilter('city', val)}
      />

      {/* Company */}
      <FilterSelect
        label="Company"
        value={filters.company}
        options={FILTER_DATA.companies}
        onChange={(val) => updateFilter('company', val)}
      />

      {/* Date Range */}
      <FilterSelect
        label="Date Range"
        value={filters.dateRange}
        options={FILTER_DATA.dateRanges}
        onChange={(val) => updateFilter('dateRange', val)}
      />

      {/* Reset — only shows when something is filtered */}
      {isFiltered && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold text-[#FF5722] border border-[#FF5722]/30 rounded-xl hover:bg-[#FF5722]/5 transition-all"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      )}

      {/* Active filter pills — shows what's currently selected */}
      {isFiltered && (
        <div className="flex flex-wrap gap-2 ml-auto">
          {filters.state !== 'All States' && (
            <span className="px-3 py-1 bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold rounded-full">
              📍 {filters.state}
            </span>
          )}
          {filters.city !== 'All Cities' && (
            <span className="px-3 py-1 bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold rounded-full">
              🏙 {filters.city}
            </span>
          )}
          {filters.company !== 'All Companies' && (
            <span className="px-3 py-1 bg-[#1A1A2E]/10 text-[#1A1A2E] text-xs font-bold rounded-full">
              🏢 {filters.company}
            </span>
          )}
          {filters.dateRange !== 'Today' && (
            <span className="px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-xs font-bold rounded-full">
              📅 {filters.dateRange}
            </span>
          )}
        </div>
      )}
    </div>
  );
}