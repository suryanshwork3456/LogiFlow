// src/pages/admin/AIDelayPrediction/components/VariablesPanel.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

export default function VariablesPanel({ variables }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">Variables Analyzed Per Route</h3>
      <p className="text-sm text-[#555F6D] mb-6">14 real-time inputs processed every 90 seconds</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {variables.map((v, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center hover:border-[#FF5722] hover:shadow-md transition-all">
            <span className="text-2xl mb-2">{v.icon}</span>
            <h4 className="text-sm font-bold text-[#1A1A2E] text-center mb-1">{v.name}</h4>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-[#555F6D] mb-2">
              {v.category}
            </span>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF5722] rounded-full" style={{ width: `${v.weight}%` }}></div>
            </div>
            <span className="text-[10px] text-[#555F6D] mt-1">{v.weight}% weight</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm font-semibold text-[#1A1A2E] hover:text-[#FF5722] transition-colors"
      >
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        How the model works
      </button>

      {expanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 text-sm text-[#555F6D]">
          <div className="flex gap-3">
            <span className="font-bold text-[#1A1A2E]">Step 1:</span>
            Data collected every 90s from all sources (traffic, weather, driver, vehicle).
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#1A1A2E]">Step 2:</span>
            14 variables normalized and weighted based on historical impact.
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#1A1A2E]">Step 3:</span>
            GBDT model predicts delay probability for each active route.
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#1A1A2E]">Step 4:</span>
            If risk &gt; 70%, alert is triggered automatically and action recommended.
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#1A1A2E]">Step 5:</span>
            Feedback loop: actual vs predicted delay refines model accuracy over time.
          </div>
        </div>
      )}
    </div>
  );
}