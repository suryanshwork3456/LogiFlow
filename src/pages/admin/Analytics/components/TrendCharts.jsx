// components/TrendCharts.jsx

const Sparkline = ({ data, color = '#FF5722' }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-20 h-7 flex-shrink-0">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const GroupedBarChart = ({ companies }) => {
  if (!companies || companies.length === 0) return null;
  const maxOrders = Math.max(...companies.map(c => c.totalOrders));
  const w = 520;
  const h = 180;
  const padL = 40;
  const padB = 36;
  const padT = 20;
  const padR = 12;
  const chartW = w - padL - padR;
  const chartH = h - padB - padT;
  const barWidth = Math.min(42, (chartW / companies.length) - 8);
  const gap = chartW / companies.length;

  const yTicks = 4;
  const tickStep = Math.ceil(maxOrders / yTicks / 1000) * 1000;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44">
      {/* Y grid lines + labels */}
      {Array.from({ length: yTicks + 1 }, (_, i) => {
        const val = i * tickStep;
        const y = padT + chartH - (val / (yTicks * tickStep)) * chartH;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#E0E0E0" strokeWidth="0.8" />
            <text x={padL - 4} y={y + 3} fontSize="9" fill="#9E9E9E" textAnchor="end">
              {val >= 1000 ? `${val / 1000}k` : val}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {companies.map((c, i) => {
        const barH = (c.totalOrders / (yTicks * tickStep)) * chartH;
        const x = padL + i * gap + (gap - barWidth) / 2;
        const y = padT + chartH - barH;
        return (
          <g key={c.company}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barH}
              fill={c.companyColor}
              rx="3"
              opacity="0.9"
            />
            <text
              x={x + barWidth / 2}
              y={y - 4}
              fontSize="8"
              fill="#555"
              textAnchor="middle"
            >
              {(c.totalOrders / 1000).toFixed(1)}k
            </text>
            <text
              x={x + barWidth / 2}
              y={h - padB + 14}
              fontSize="8.5"
              fill="#555F6D"
              textAnchor="middle"
            >
              {c.company.length > 7 ? c.company.slice(0, 6) + '…' : c.company}
            </text>
          </g>
        );
      })}

      {/* X axis */}
      <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="#E0E0E0" strokeWidth="1" />
    </svg>
  );
};

export default function TrendCharts({ stateGrowth, companies }) {
  const maxOrders = stateGrowth.length > 0 ? Math.max(...stateGrowth.map(s => s.currentOrders)) : 1;

  const topState = [...stateGrowth].sort((a, b) => b.growthPercent - a.growthPercent)[0];
  const topCompany = companies.length > 0
    ? [...companies].sort((a, b) => b.totalOrders - a.totalOrders)[0]
    : null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Growth & Distribution Trends</h2>
          <p className="text-sm text-gray-500 mt-0.5">State-wise expansion and company order volumes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Section A — State-wise Growth */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">State-wise Order Growth</h3>
          <div className="space-y-4">
            {stateGrowth.map(s => (
              <div key={s.state}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">{s.state}</span>
                    <span className="text-xs text-gray-400">{s.currentOrders.toLocaleString()} orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: s.growthPercent >= 0 ? '#E8F5E9' : '#FFEBEE',
                        color: s.growthPercent >= 0 ? '#2E7D32' : '#C62828',
                      }}
                    >
                      {s.growthPercent >= 0 ? '+' : ''}{s.growthPercent}%
                    </span>
                    <Sparkline data={s.monthlyTrend} color={s.growthPercent >= 0 ? '#4CAF50' : '#EF5350'} />
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(s.currentOrders / maxOrders) * 100}%`,
                      backgroundColor: s.growthPercent >= 0 ? '#FF5722' : '#EF5350',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section B — Company Comparison */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Company Order Volume Comparison</h3>
          {companies.length > 0 ? (
            <GroupedBarChart companies={companies} />
          ) : (
            <div className="flex items-center justify-center h-44 text-sm text-gray-400">
              No company data for current filters
            </div>
          )}
        </div>
      </div>

      {/* Insight Box */}
      {(topState || topCompany) && (
        <div
          className="mt-4 px-5 py-4 rounded-xl"
          style={{ backgroundColor: '#1A1A2E' }}
        >
          <p className="text-sm text-white leading-relaxed">
            {topState && (
              <>
                📈 <span className="font-semibold text-orange-400">{topState.state}</span> leads growth at{' '}
                <span className="font-semibold text-green-400">+{topState.growthPercent}%</span> this period
                {topCompany && ' — '}
              </>
            )}
            {topCompany && (
              <>
                <span className="font-semibold text-orange-400">{topCompany.company}</span> processed the most orders this period{' '}
                <span className="font-semibold text-white">({topCompany.totalOrders.toLocaleString()} total)</span>, with a success rate of{' '}
                <span className="font-semibold text-green-400">{topCompany.successRate}%</span>.
              </>
            )}
          </p>
        </div>
      )}
    </section>
  );
}