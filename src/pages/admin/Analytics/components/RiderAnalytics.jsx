// components/RiderAnalytics.jsx
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const RANK_COLORS = {
  1: { bg: '#FFF8E1', text: '#F57F17', border: '#FFD54F', label: '🥇' },
  2: { bg: '#FAFAFA', text: '#616161', border: '#BDBDBD', label: '🥈' },
  3: { bg: '#FFF3E0', text: '#BF360C', border: '#FFCCBC', label: '🥉' },
};

const MiniBarChart = ({ data, color = '#FF5722' }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const w = 70;
  const h = 24;
  const barW = (w / data.length) - 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-16 h-6 flex-shrink-0">
      {data.map((v, i) => {
        const barH = (v / max) * (h - 2);
        return (
          <rect
            key={i}
            x={i * (barW + 2)}
            y={h - barH - 1}
            width={barW}
            height={barH}
            fill={color}
            rx="1"
            opacity="0.8"
          />
        );
      })}
    </svg>
  );
};

const OnTimeRateBadge = ({ rate }) => {
  let color, bg;
  if (rate >= 95) { color = '#2E7D32'; bg = '#E8F5E9'; }
  else if (rate >= 90) { color = '#E65100'; bg = '#FFF3E0'; }
  else { color = '#C62828'; bg = '#FFEBEE'; }
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ color, backgroundColor: bg }}>
      {rate}%
    </span>
  );
};

const SortHeader = ({ label, field, sortField, sortDir, onSort }) => (
  <button
    className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-800 transition-colors"
    onClick={() => onSort(field)}
  >
    {label}
    {sortField === field
      ? sortDir === 'asc'
        ? <ChevronUp size={12} className="text-orange-500" />
        : <ChevronDown size={12} className="text-orange-500" />
      : <ChevronDown size={12} className="opacity-30" />}
  </button>
);

export default function RiderAnalytics({ riders }) {
  const [sortField, setSortField] = useState('currentRating');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sorted = [...riders].sort((a, b) => {
    const mult = sortDir === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * mult;
  });

  const totalDeliveries = riders.reduce((s, r) => s + r.totalDeliveries30d, 0);
  const totalEarnings = riders.reduce((s, r) => s + r.earningsThisMonth, 0);
  const avgRating = riders.length > 0
    ? (riders.reduce((s, r) => s + r.currentRating, 0) / riders.length).toFixed(2)
    : '—';

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Rider Performance Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Top 10 riders ranked by rating — click headers to sort</p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
          Top 10 by Rating
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="overflow-x-auto">
          <div className="min-w-[860px]">
            <div
              className="grid gap-3 px-4 py-3 border-b border-gray-100"
              style={{
                gridTemplateColumns: '40px 180px 80px 90px 90px 80px 80px 100px 72px',
                backgroundColor: '#F9FAFB',
              }}
            >
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">#</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Rider</span>
              <SortHeader label="Rating" field="currentRating" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Deliveries" field="totalDeliveries30d" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">On-time</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Avg Time</span>
              <SortHeader label="Earnings" field="earningsThisMonth" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">7-Day Trend</span>
            </div>

            {sorted.map((rider, idx) => {
              const originalRank = riders.findIndex(r => r.name === rider.name) + 1;
              const rankStyle = RANK_COLORS[originalRank] || {};
              return (
                <div
                  key={rider.name}
                  className="grid gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors items-center"
                  style={{ gridTemplateColumns: '40px 180px 80px 90px 90px 80px 80px 100px 72px' }}
                >
                  {/* Rank */}
                  <div
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold"
                    style={originalRank <= 3
                      ? { backgroundColor: rankStyle.bg, color: rankStyle.text, border: `1px solid ${rankStyle.border}` }
                      : { backgroundColor: '#F5F5F5', color: '#9E9E9E' }
                    }
                  >
                    {originalRank <= 3 ? rankStyle.label : originalRank}
                  </div>

                  {/* Name + company */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: '#1A1A2E' }}
                    >
                      {rider.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-gray-900 truncate">{rider.name}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-gray-400 truncate">{rider.city}</span>
                        <span
                          className="text-xs px-1.5 py-0 rounded font-medium flex-shrink-0"
                          style={{ backgroundColor: '#FF572215', color: '#FF5722' }}
                        >
                          {rider.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <span className="text-sm font-bold text-gray-900">⭐ {rider.currentRating}</span>
                    <span
                      className="ml-1 text-xs"
                      style={{ color: rider.ratingTrend >= 0 ? '#4CAF50' : '#EF5350' }}
                    >
                      {rider.ratingTrend >= 0 ? '+' : ''}{rider.ratingTrend}
                    </span>
                  </div>

                  {/* Deliveries */}
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{rider.totalDeliveries30d.toLocaleString()}</span>
                    <span
                      className="ml-1 text-xs"
                      style={{ color: rider.deliveriesTrend >= 0 ? '#4CAF50' : '#EF5350' }}
                    >
                      {rider.deliveriesTrend >= 0 ? '+' : ''}{rider.deliveriesTrend}%
                    </span>
                  </div>

                  {/* On-time rate */}
                  <div><OnTimeRateBadge rate={rider.onTimeRate} /></div>

                  {/* Avg delivery time */}
                  <div className="text-sm text-gray-700">{rider.avgDeliveryTime} min</div>

                  {/* Earnings */}
                  <div className="text-sm font-semibold text-gray-900">₹{rider.earningsThisMonth.toLocaleString()}</div>

                  {/* Weekly sparkline */}
                  <MiniBarChart data={rider.weeklyDeliveries} color="#FF5722" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div
          className="grid grid-cols-3 divide-x divide-gray-100 px-0"
          style={{ backgroundColor: '#F9FAFB' }}
        >
          {[
            { label: 'Avg Rating', value: `⭐ ${avgRating}` },
            { label: 'Total Deliveries (30d)', value: totalDeliveries.toLocaleString() },
            { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}` },
          ].map(stat => (
            <div key={stat.label} className="px-5 py-3 text-center">
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}