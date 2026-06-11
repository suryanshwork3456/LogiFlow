import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';

const COMPANY_COLORS = {
  Amazon: { bg: 'bg-[#FF9800]/15', text: 'text-[#E65100]' },
  Flipkart: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Meesho: { bg: 'bg-pink-100', text: 'text-pink-700' },
  Zomato: { bg: 'bg-red-100', text: 'text-red-700' },
  Blinkit: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
};

const STATUS_STYLES = {
  Active: 'bg-[#4CAF50]/15 text-[#2E7D32]',
  Completed: 'bg-gray-100 text-[#555F6D]',
  Pending: 'bg-[#FF9800]/15 text-[#E65100]',
};

const SORT_OPTIONS = [
  { value: 'savings', label: 'Best Savings' },
  { value: 'stops', label: 'Most Stops' },
  { value: 'recent', label: 'Recent' },
];

export default function ActiveRoutesTable({ routes, onRouteSelect }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('savings');

  const filtered = useMemo(() => {
    let result = routes.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.driver.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.vehicleId.toLowerCase().includes(q) ||
        r.origin.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'savings') return b.fuelSaved - a.fuelSaved;
      if (sortBy === 'stops') return b.stops - a.stops;
      if (sortBy === 'recent') return a.id.localeCompare(b.id) * -1;
      return 0;
    });

    return result;
  }, [routes, search, statusFilter, sortBy]);

  const counts = useMemo(
    () => ({
      All: routes.length,
      Active: routes.filter((r) => r.status === 'Active').length,
      Completed: routes.filter((r) => r.status === 'Completed').length,
      Pending: routes.filter((r) => r.status === 'Pending').length,
    }),
    [routes]
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E0E0E0] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E0E0E0] flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <h2 className="font-bold text-[#1A1A2E] text-lg whitespace-nowrap">Optimized Routes</h2>
          <span className="px-2.5 py-0.5 bg-[#1A1A2E] text-white text-xs font-bold rounded-full">
            {filtered.length}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-0.5 bg-[#4CAF50]/15 text-[#2E7D32] text-xs font-bold rounded-full">
            <span className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full animate-pulse inline-block" />
            LIVE
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-[#E0E0E0] flex flex-wrap items-center gap-3 bg-[#FAFAFA]">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555F6D]" size={14} />
          <input
            type="text"
            placeholder="Search driver, company, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-[#E0E0E0] rounded-lg bg-white focus:outline-none focus:border-[#FF5722] text-[#1A1A2E] placeholder-[#999]"
          />
        </div>

        <div className="flex gap-1">
          {['All', 'Active', 'Completed', 'Pending'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                statusFilter === s
                  ? 'bg-[#1A1A2E] text-white'
                  : 'bg-white border border-[#E0E0E0] text-[#555F6D] hover:border-[#1A1A2E]'
              }`}
            >
              {s} <span className="opacity-70">({counts[s]})</span>
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="ml-auto text-xs border border-[#E0E0E0] rounded-lg px-3 py-2 bg-white text-[#1A1A2E] focus:outline-none focus:border-[#FF5722] cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              Sort: {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🗺️</div>
            <p className="font-bold text-[#1A1A2E] mb-1">No routes match your filters</p>
            <p className="text-sm text-[#555F6D]">Try adjusting the search or status filter</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
                {['Route ID', 'Company', 'Driver / Vehicle', 'Route', 'Stops', 'Before', 'After', 'Savings', 'Reduction', 'Status', 'Confidence'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-bold text-[#555F6D] uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const co = COMPANY_COLORS[r.company] || { bg: 'bg-gray-100', text: 'text-gray-700' };
                const borderColor =
                  r.status === 'Active'
                    ? 'border-l-4 border-l-[#4CAF50]'
                    : r.status === 'Pending'
                    ? 'border-l-4 border-l-[#FF9800]'
                    : 'border-l-4 border-l-transparent';

                return (
                  <tr
                    key={r.id}
                    onClick={() => onRouteSelect(r)}
                    className={`border-b border-[#F0F0F0] cursor-pointer hover:bg-[#FFF3E0] transition-colors ${borderColor}`}
                  >
                    <td className="px-4 py-3 font-bold text-[#FF5722] whitespace-nowrap">{r.id}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${co.bg} ${co.text}`}>
                        {r.company}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#1A1A2E] text-xs">{r.driver}</div>
                      <div className="text-[#555F6D] text-[10px] mt-0.5">{r.vehicleId}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[180px]">
                      <div className="text-xs font-medium text-[#1A1A2E] truncate">
                        {r.origin} → {r.destination}
                      </div>
                      <div className="text-[10px] text-[#555F6D] mt-0.5">{r.city}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-[#1A1A2E]/10 text-[#1A1A2E] text-xs font-bold rounded-full">
                        {r.stops}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs text-[#555F6D]">{r.manualDistance} km</div>
                      <div className="text-[10px] text-[#999]">{r.manualTime}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs font-semibold text-[#4CAF50]">{r.optimizedDistance} km</div>
                      <div className="text-[10px] text-[#4CAF50]/70">{r.optimizedTime}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs font-bold text-[#1A1A2E]">₹{r.fuelSaved}</div>
                      <div className="text-[10px] text-[#555F6D]">{r.timeSaved} min</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xl font-extrabold text-[#FF5722]">{r.distanceReduction}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_STYLES[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-semibold text-[#555F6D]">{r.confidence}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}