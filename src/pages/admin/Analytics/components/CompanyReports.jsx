// components/CompanyReports.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, TrendingUp, TrendingDown } from 'lucide-react';

const TrendBadge = ({ value, isImprovement = false, suffix = '%' }) => {
  // For improvement metrics (delivery time, cost): negative = good
  const isGood = isImprovement ? value < 0 : value >= 0;
  const displayValue = Math.abs(value);
  return (
    <span
      className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded"
      style={{
        backgroundColor: isGood ? '#E8F5E9' : '#FFEBEE',
        color: isGood ? '#2E7D32' : '#C62828',
      }}
    >
      {isGood ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {isImprovement && value < 0 ? '' : value > 0 ? '+' : ''}{value}{suffix}
    </span>
  );
};

const MiniLineChart = ({ data, color = '#FF5722' }) => {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 300;
  const h = 100;
  const pad = 8;
  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const polylinePoints = points.join(' ');
  const areaPoints = `${pad},${h - pad} ${polylinePoints} ${w - pad},${h - pad}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={polylinePoints} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x={pad} y={h - 1} fontSize="9" fill="#9E9E9E">{min.toLocaleString()}</text>
      <text x={w - pad} y={14} fontSize="9" fill="#9E9E9E" textAnchor="end">{max.toLocaleString()}</text>
    </svg>
  );
};

const MetricRow = ({ label, value, trend, isImprovement = false, prefix = '', suffix = '' }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
    <span className="text-xs text-gray-500">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-gray-800">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</span>
      {trend !== undefined && <TrendBadge value={trend} isImprovement={isImprovement} />}
    </div>
  </div>
);

const CompanyCard = ({ company, onExport }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: company.companyColor }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 text-sm">{company.company}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: company.companyColor + '22', color: company.companyColor }}
              >
                {company.city}, {company.state}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-lg font-bold text-gray-900">{company.totalOrders.toLocaleString()}</span>
              <TrendBadge value={company.ordersTrend} />
            </div>
            <span className="text-xs text-gray-400">Total Orders</span>
          </div>
          <div className="text-right hidden md:block">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-base font-semibold text-gray-900">{company.successRate}%</span>
              <TrendBadge value={company.successRateTrend} />
            </div>
            <span className="text-xs text-gray-400">Success Rate</span>
          </div>
          <button
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
            style={{ borderColor: '#FF5722', color: '#FF5722' }}
            onClick={e => { e.stopPropagation(); onExport(company); }}
          >
            <Download size={12} />
            Export
          </button>
          <div className="text-gray-400">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Col 1 - Order Metrics */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Order Metrics</h4>
              <MetricRow label="Total Orders" value={company.totalOrders} trend={company.ordersTrend} />
              <MetricRow label="Delivered" value={company.delivered} />
              <MetricRow label="Success Rate" value={company.successRate} trend={company.successRateTrend} suffix="%" />
              <MetricRow label="Active Riders" value={company.activeRiders} />
            </div>

            {/* Col 2 - Savings Metrics */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Efficiency Metrics</h4>
              <MetricRow label="Fuel Saved" value={company.fuelSaved} trend={company.fuelSavedTrend} prefix="₹" />
              <MetricRow label="Time Saved" value={company.timeSavedHours} trend={company.timeSavedTrend} suffix=" hrs" />
              <MetricRow label="Avg Delivery Time" value={company.avgDeliveryTime} trend={company.avgDeliveryTimeTrend} isImprovement suffix=" min" />
              <MetricRow label="Cost Per Delivery" value={company.costPerDelivery} trend={company.costPerDeliveryTrend} isImprovement prefix="₹" />
            </div>

            {/* Col 3 - Chart */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Order Volume Trend</h4>
              <MiniLineChart data={company.dailyOrders} color={company.companyColor} />
            </div>
          </div>

          {/* Revenue row */}
          <div
            className="mt-4 flex items-center gap-6 px-4 py-3 rounded-lg"
            style={{ backgroundColor: '#1A1A2E08' }}
          >
            <div>
              <span className="text-xs text-gray-500">Revenue</span>
              <span className="ml-2 font-bold text-gray-900">₹{company.revenue.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Revenue Trend</span>
              <TrendBadge value={company.revenueTrend} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CompanyReports({ companies, onExport }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Company Performance Reports</h2>
          <p className="text-sm text-gray-500 mt-0.5">Expand any company to view detailed metrics and order trends</p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
          {companies.length} Companies
        </span>
      </div>
      <div className="space-y-3">
        {companies.map(c => (
          <CompanyCard key={c.company} company={c} onExport={onExport} />
        ))}
      </div>
    </section>
  );
}