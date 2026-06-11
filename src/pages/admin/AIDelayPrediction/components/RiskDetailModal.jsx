// src/pages/admin/AIDelayPrediction/components/RiskDetailModal.jsx
import React, { useState } from 'react';
import { X, MapPin, Clock, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

const impactColors = { HIGH: 'text-red-600 bg-red-50', MEDIUM: 'text-orange-600 bg-orange-50', LOW: 'text-green-600 bg-green-50' };

export default function RiskDetailModal({ route, onClose }) {
  const [applyAlternate, setApplyAlternate] = useState(false);
  const [autoAlert, setAutoAlert] = useState(true);
  const [notifyDriver, setNotifyDriver] = useState(true);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-start justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E]">{route.route}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  route.riskLevel === 'HIGH' ? 'bg-red-100 text-red-700' :
                  route.riskLevel === 'MEDIUM' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    route.riskLevel === 'HIGH' ? 'bg-red-500' : route.riskLevel === 'MEDIUM' ? 'bg-orange-500' : 'bg-green-500'
                  }`}></span>
                  {route.riskLevel}
                </span>
                <span className="bg-[#1A1A2E] text-white text-xs px-2.5 py-0.5 rounded-full">{route.company}</span>
                <span className="text-xs text-[#555F6D]">Last updated: {route.lastUpdated} · Model {route.modelVersion}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Risk Factor Analysis */}
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-[#FF5722]" /> AI Risk Factor Analysis
                </h3>
                <div className="space-y-4">
                  {route.causes.map((cause, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-[#1A1A2E]">{cause.factor}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${impactColors[cause.impact]}`}>
                          {cause.impact}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${
                          cause.impact === 'HIGH' ? 'bg-red-500' : cause.impact === 'MEDIUM' ? 'bg-orange-400' : 'bg-green-400'
                        }`} style={{ width: `${cause.weight}%` }}></div>
                      </div>
                      <p className="text-xs text-[#555F6D] mt-1">Weight: {cause.weight}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Route Details */}
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-[#1A1A2E]" /> Route Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#555F6D]">Origin → Destination</span>
                    <span className="text-sm font-medium text-[#1A1A2E]">{route.origin} → {route.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#555F6D]">Distance</span>
                    <span className="text-sm font-medium">{route.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#555F6D]">Current ETA</span>
                    <span className="text-sm font-medium">{route.eta}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#555F6D]">SLA Deadline</span>
                    <span className="text-sm font-medium">{route.slaDeadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#555F6D]">SLA Status</span>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      route.slaStatus === 'On Track' ? 'bg-green-100 text-green-700' :
                      route.slaStatus === 'At Risk' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>{route.slaStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#555F6D]">AI Confidence</span>
                    <span className="text-sm font-medium">{route.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Prediction Details */}
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-[#FF5722]" /> Prediction Details
                </h3>
                <div className="text-center mb-4">
                  <span className={`text-4xl font-extrabold ${
                    route.riskLevel === 'HIGH' ? 'text-red-600' : route.riskLevel === 'MEDIUM' ? 'text-orange-600' : 'text-green-600'
                  }`}>{route.predictedDelay}</span>
                </div>
                <p className="text-sm text-[#555F6D] mb-4">
                  Primary cause: <strong>{route.cause}</strong>. Our model predicts this delay based on {route.causes.length} contributing factors weighted by real-time data.
                </p>
                <div className="flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 40 40" className="-rotate-90">
                    <circle cx="20" cy="20" r="15.5" fill="none" stroke="#F5F5F5" strokeWidth="3" />
                    <circle
                      cx="20" cy="20" r="15.5" fill="none"
                      stroke="#FF5722" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 15.5}`}
                      strokeDashoffset={`${2 * Math.PI * 15.5 * (1 - route.confidence / 100)}`}
                    />
                  </svg>
                  <span className="absolute mt-6 text-xs font-bold text-[#1A1A2E]">{route.confidence}%</span>
                </div>
              </div>

              {/* Recommended Action */}
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#4CAF50]" /> Recommended Action
                </h3>
                {route.alternateRouteAvailable && route.action === 'Reroute' ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-[#1A1A2E] mb-2">Alternate Route Available</p>
                    <div className="flex items-center gap-2 text-sm text-green-700 mb-4">
                      <Clock size={14} />
                      <span>Saves {route.alternateTimeSaving}</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setApplyAlternate(true)}
                        className={`flex-1 text-sm font-bold py-2 rounded-lg transition-colors ${
                          applyAlternate
                            ? 'bg-green-500 text-white'
                            : 'bg-[#FF5722] text-white hover:bg-[#FF7043]'
                        }`}
                      >
                        {applyAlternate ? 'Applied ✓' : 'Apply Alternate Route'}
                      </button>
                      <button className="flex-1 border-2 border-gray-300 text-gray-600 text-sm font-bold py-2 rounded-lg hover:bg-gray-50">
                        Keep Current Route
                      </button>
                    </div>
                  </div>
                ) : route.action === 'Monitor' ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-medium text-[#1A1A2E]">Automated Monitoring Active</p>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-[#555F6D]">Auto-alert if delay exceeds 30 min</span>
                      <button
                        onClick={() => setAutoAlert(!autoAlert)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${autoAlert ? 'bg-[#FF5722]' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoAlert ? 'translate-x-5' : ''}`} />
                      </button>
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-[#555F6D]">Notify driver</span>
                      <button
                        onClick={() => setNotifyDriver(!notifyDriver)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${notifyDriver ? 'bg-[#FF5722]' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifyDriver ? 'translate-x-5' : ''}`} />
                      </button>
                    </label>
                  </div>
                ) : (
                  <p className="text-sm text-[#555F6D]">No immediate action required. Route is operating normally.</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 flex flex-wrap gap-3 justify-end">
            <button className="px-4 py-2 text-sm font-semibold bg-[#1A1A2E] text-white rounded-lg hover:bg-[#2A2A4E]">
              View in Live Tracking
            </button>
            <button className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50">
              Add to Watchlist
            </button>
            <button className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}