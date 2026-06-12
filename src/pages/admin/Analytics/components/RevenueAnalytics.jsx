// components/RevenueAnalytics.jsx

const SEGMENT_COLORS = ['#FF5722', '#2196F3', '#FF9800', '#4CAF50'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getLastSixMonthLabels = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return MONTH_LABELS[d.getMonth()];
  });
};

const DonutChart = ({ revenue }) => {
  const segments = [
    { label: 'Delivery Revenue', value: revenue.deliveryRevenue, color: SEGMENT_COLORS[0] },
    { label: 'COD Fees', value: revenue.codFees, color: SEGMENT_COLORS[1] },
    { label: 'Surcharge', value: revenue.surcharge, color: SEGMENT_COLORS[2] },
    { label: 'Subscription', value: revenue.subscriptionRevenue, color: SEGMENT_COLORS[3] },
  ];
  const total = segments.reduce((s, seg) => s + seg.value, 0);

  const cx = 100;
  const cy = 100;
  const r = 72;
  const innerR = 46;

  let cumulativeAngle = -Math.PI / 2;
  const paths = segments.map(seg => {
    const fraction = seg.value / total;
    const angle = fraction * 2 * Math.PI;
    const x1 = cx + r * Math.cos(cumulativeAngle);
    const y1 = cy + r * Math.sin(cumulativeAngle);
    const x2 = cx + r * Math.cos(cumulativeAngle + angle);
    const y2 = cy + r * Math.sin(cumulativeAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const xi1 = cx + innerR * Math.cos(cumulativeAngle);
    const yi1 = cy + innerR * Math.sin(cumulativeAngle);
    const xi2 = cx + innerR * Math.cos(cumulativeAngle + angle);
    const yi2 = cy + innerR * Math.sin(cumulativeAngle + angle);
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi1} ${yi1} Z`;
    cumulativeAngle += angle;
    return { ...seg, path, pct: (fraction * 100).toFixed(1) };
  });

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 200" className="w-44 h-44">
        {paths.map(seg => (
          <path key={seg.label} d={seg.path} fill={seg.color} opacity="0.9" />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="10" fill="#555F6D" fontWeight="500">Total Revenue</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="12" fill="#1A1A2E" fontWeight="700">
          ₹{(total / 1000000).toFixed(2)}M
        </text>
      </svg>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2 w-full">
        {paths.map(seg => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-gray-600 truncate">{seg.label}</span>
            <span className="text-xs font-semibold text-gray-800 ml-auto">{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthlyBarChart = ({ data }) => {
  const labels = getLastSixMonthLabels();
  const max = Math.max(...data);
  const w = 320;
  const h = 160;
  const padL = 44;
  const padB = 24;
  const padT = 20;
  const padR = 12;
  const chartW = w - padL - padR;
  const chartH = h - padB - padT;
  const barW = chartW / data.length - 8;
  const yTicks = 4;
  const tickStep = Math.ceil(max / yTicks / 500000) * 500000;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40">
      {/* Y grid */}
      {Array.from({ length: yTicks + 1 }, (_, i) => {
        const val = i * tickStep;
        const y = padT + chartH - (val / (yTicks * tickStep)) * chartH;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#F0F0F0" strokeWidth="1" />
            <text x={padL - 4} y={y + 3} fontSize="8" fill="#BDBDBD" textAnchor="end">
              {val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${val / 1000}k`}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((v, i) => {
        const barH = (v / (yTicks * tickStep)) * chartH;
        const x = padL + i * ((chartW) / data.length) + 4;
        const y = padT + chartH - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill="#FF5722" rx="3" opacity="0.85" />
            <text x={x + barW / 2} y={y - 3} fontSize="7.5" fill="#555" textAnchor="middle">
              {(v / 1000000).toFixed(2)}M
            </text>
            <text x={x + barW / 2} y={h - padB + 14} fontSize="9" fill="#555F6D" textAnchor="middle">
              {labels[i]}
            </text>
          </g>
        );
      })}
      <line x1={padL} y1={padT + chartH} x2={w - padR} y2={padT + chartH} stroke="#E0E0E0" />
    </svg>
  );
};

export default function RevenueAnalytics({ revenue }) {
  const costs = revenue.costBreakdown;
  const totalCosts = Object.values(costs).reduce((s, v) => s + v, 0);
  const netProfit = revenue.totalRevenue - totalCosts;
  const netMargin = ((netProfit / revenue.totalRevenue) * 100).toFixed(1);

  const costItems = [
    { label: 'Fuel Costs', value: costs.fuelCosts, color: '#FF9800' },
    { label: 'Rider Payouts', value: costs.riderPayouts, color: '#2196F3' },
    { label: 'Operational Costs', value: costs.operationalCosts, color: '#9C27B0' },
    { label: 'Tech Infrastructure', value: costs.techInfra, color: '#4CAF50' },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Revenue & Cost Analytics</h2>
          <p className="text-sm text-gray-500 mt-0.5">Revenue composition, monthly trends, and cost structure</p>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}
        >
          +{revenue.revenueTrend}% vs last period
        </span>
      </div>

      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue Breakdown</h3>
          <DonutChart revenue={revenue} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Revenue Trend</h3>
          <MonthlyBarChart data={revenue.monthlyRevenue} />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {costItems.map(item => {
          const pct = ((item.value / totalCosts) * 100).toFixed(1);
          return (
            <div key={item.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-gray-600">{item.label}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">₹{item.value.toLocaleString()}</div>
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: item.color }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{pct}% of total costs</div>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div
        className="mt-4 flex flex-wrap items-center gap-6 px-5 py-4 rounded-xl"
        style={{ backgroundColor: '#1A1A2E' }}
      >
        {[
          { label: 'Net Margin', value: `${netMargin}%`, color: netProfit >= 0 ? '#4CAF50' : '#EF5350' },
          { label: 'Total Revenue', value: `₹${revenue.totalRevenue.toLocaleString()}`, color: '#FF9800' },
          { label: 'Total Costs', value: `₹${totalCosts.toLocaleString()}`, color: '#2196F3' },
          { label: 'Net Profit', value: `₹${netProfit.toLocaleString()}`, color: '#4CAF50' },
        ].map(item => (
          <div key={item.label}>
            <div className="text-xs text-gray-400">{item.label}</div>
            <div className="text-base font-bold mt-0.5" style={{ color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}