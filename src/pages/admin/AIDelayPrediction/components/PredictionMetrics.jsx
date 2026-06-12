// src/pages/admin/AIDelayPrediction/components/PredictionMetrics.jsx
import React from 'react';
import { TrendingUp, Clock, Route } from 'lucide-react';

export default function PredictionMetrics({ metrics, routesCount }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (metrics.accuracy / 100) * circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 – Prediction Accuracy */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#F5F5F5"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#FF5722"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              className="transition-all duration-700"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-[#1A1A2E]">
            {metrics.accuracy}%
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Prediction Accuracy</h3>
        <p className="text-sm text-[#555F6D] mb-2">Across 14 input variables</p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-0.5 rounded-full">
          <TrendingUp size={12} />
          {metrics.accuracyTrend}
        </span>
      </div>

      {/* Card 2 – Average ETA Deviation */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col justify-center text-center">
        <div className="text-5xl font-extrabold text-[#1A1A2E] mb-4">±{metrics.avgDeviation} min</div>
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Average ETA Deviation</h3>
        <p className="text-sm text-[#4CAF50] font-medium">{metrics.deviationTrend}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 bg-[#F5F5F5] rounded-full px-3 py-1 text-xs text-[#555F6D]">
          <Clock size={12} /> Model {metrics.modelVersion}
        </div>
      </div>

      {/* Card 3 – Routes Analyzed */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col justify-center text-center">
        <div className="text-5xl font-extrabold text-[#1A1A2E] mb-4">{routesCount}</div>
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Routes Analyzed Today</h3>
        <p className="text-sm text-[#555F6D] mb-3">Last run: {metrics.lastRun}</p>
        <div className="flex items-center justify-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF50] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4CAF50]"></span>
          </span>
          <span className="text-xs font-medium text-[#4CAF50]">Live</span>
        </div>
      </div>
    </div>
  );
}