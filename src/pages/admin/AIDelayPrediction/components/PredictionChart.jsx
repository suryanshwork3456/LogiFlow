// src/pages/admin/AIDelayPrediction/components/PredictionChart.jsx
import React from 'react';

export default function PredictionChart({ hourlyData }) {
  const width = 700, height = 200, padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const xStart = padding.left, xEnd = width - padding.right;
  const yStart = padding.top, yEnd = height - padding.bottom;
  const minAcc = 60, maxAcc = 100;
  const currentHour = '2PM'; // static highlight for demo

  const xScale = (index) => xStart + (index / (hourlyData.length - 1)) * (xEnd - xStart);
  const yScale = (val) => yEnd - ((val - minAcc) / (maxAcc - minAcc)) * (yEnd - yStart);

  const points = hourlyData.map((d, i) => ({ x: xScale(i), y: yScale(d.accuracy), ...d }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `M${points[0].x},${yEnd} L${linePath.replace('M', 'L')} L${points[points.length-1].x},${yEnd} Z`;

  const peak = hourlyData.reduce((max, d) => d.accuracy > max.accuracy ? d : max, hourlyData[0]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">Prediction Accuracy by Hour</h3>
      <p className="text-sm text-[#555F6D] mb-4">Accuracy trend throughout the day</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5722" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF5722" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Y axis */}
        {[60, 70, 80, 90, 100].map(val => (
          <text key={val} x={padding.left - 5} y={yScale(val) + 4} textAnchor="end" className="text-[10px] fill-gray-400">{val}%</text>
        ))}
        {/* X axis */}
        {hourlyData.map((d, i) => (
          <text key={i} x={xScale(i)} y={yEnd + 20} textAnchor="middle" className="text-[10px] fill-gray-400">{d.hour}</text>
        ))}
        {/* Area */}
        <path d={areaPath} fill="url(#areaGrad)" />
        {/* Line */}
        <path d={linePath} fill="none" stroke="#FF5722" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.hour === currentHour ? 5 : 3.5} fill={p.hour === currentHour ? '#FF5722' : '#fff'} stroke="#FF5722" strokeWidth="2" />
            <title>{`${p.hour}: ${p.accuracy}% accuracy (${p.predictions} predictions)`}</title>
          </g>
        ))}
        {/* Peak annotation */}
        <circle cx={xScale(hourlyData.indexOf(peak))} cy={yScale(peak.accuracy)} r="6" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="3 2" />
        <text x={xScale(hourlyData.indexOf(peak)) + 10} y={yScale(peak.accuracy) - 10} className="text-[10px] fill-[#4CAF50] font-bold">Peak: {peak.accuracy}% at {peak.hour}</text>
      </svg>
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="text-sm font-bold text-[#1A1A2E]">{peak.accuracy}% at {peak.hour}</div>
          <div className="text-xs text-[#555F6D]">Peak Accuracy</div>
        </div>
        <div>
          <div className="text-sm font-bold text-[#1A1A2E]">74% at 8AM</div>
          <div className="text-xs text-[#555F6D]">Lowest</div>
        </div>
        <div>
          <div className="text-sm font-bold text-[#1A1A2E]">82%</div>
          <div className="text-xs text-[#555F6D]">Avg across all hours</div>
        </div>
      </div>
    </div>
  );
}