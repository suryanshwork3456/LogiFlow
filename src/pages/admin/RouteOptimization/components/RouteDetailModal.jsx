import { useState } from 'react';
import { X, MapPin, Navigation, Clock, Fuel, Zap, BarChart2, CheckCircle, Send, FileText, Map } from 'lucide-react';

const STATUS_STYLES = {
  Active: 'bg-[#4CAF50]/15 text-[#2E7D32]',
  Completed: 'bg-gray-100 text-[#555F6D]',
  Pending: 'bg-[#FF9800]/15 text-[#E65100]',
};

const COMPANY_COLORS = {
  Amazon: 'bg-[#FF9800]/15 text-[#E65100]',
  Flipkart: 'bg-blue-100 text-blue-700',
  Meesho: 'bg-pink-100 text-pink-700',
  Zomato: 'bg-red-100 text-red-700',
  Blinkit: 'bg-yellow-100 text-yellow-700',
};

function StopList({ stops, theme }) {
  const isOrange = theme === 'orange';
  const dotColor = isOrange ? 'bg-[#FF5722]' : 'bg-[#4CAF50]';
  const lineColor = isOrange ? 'bg-[#FF5722]/20' : 'bg-[#4CAF50]/20';
  const numColor = isOrange ? 'bg-[#FF5722] text-white' : 'bg-[#4CAF50] text-white';
  const typeColors = { origin: isOrange ? 'text-[#FF5722]' : 'text-[#4CAF50]', destination: isOrange ? 'text-[#FF5722]' : 'text-[#4CAF50]', stop: 'text-[#555F6D]' };

  return (
    <div className="space-y-0">
      {stops.map((stop, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full ${numColor} flex items-center justify-center text-[10px] font-bold flex-shrink-0`}>
              {stop.sequence}
            </div>
            {i < stops.length - 1 && <div className={`w-0.5 h-5 ${lineColor}`} />}
          </div>
          <div className="pb-2 min-w-0">
            <div className="text-xs font-semibold text-[#1A1A2E] truncate">{stop.name}</div>
            {stop.type && (
              <div className={`text-[10px] font-bold uppercase tracking-wide ${typeColors[stop.type]}`}>
                {stop.type}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniBar({ value, max, color }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function RouteDetailModal({ route, onClose }) {
  const [dispatched, setDispatched] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!route) return null;

  const co2Saved = Math.round(route.fuelSaved * 0.0023 * 10) / 10;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E0E0E0] flex flex-wrap items-start gap-3 bg-[#FAFAFA] rounded-t-2xl sticky top-0 z-10">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-lg font-extrabold text-[#FF5722]">{route.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${COMPANY_COLORS[route.company] || 'bg-gray-100 text-gray-700'}`}>
                {route.company}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_STYLES[route.status]}`}>
                {route.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#555F6D]">
              <span className="font-semibold text-[#1A1A2E]">{route.driver}</span>
              <span>·</span>
              <span>{route.vehicleId}</span>
              <span>·</span>
              <span>Optimized at {route.optimizedAt}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F5F5F5] hover:bg-[#E0E0E0] transition-colors text-[#555F6D]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Section A — Route Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manual */}
            <div className="border border-[#FF5722]/30 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-[#FF5722]/8 border-b border-[#FF5722]/20 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF5722] rounded-full" />
                <span className="font-bold text-[#FF5722] text-sm">Manual Route</span>
              </div>
              <div className="p-4">
                <StopList stops={route.manualStops} theme="orange" />
                <div className="mt-3 pt-3 border-t border-[#E0E0E0] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs font-bold text-[#1A1A2E]">{route.manualDistance} km</div>
                    <div className="text-[10px] text-[#555F6D]">Distance</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1A2E]">₹{route.manualFuelCost}</div>
                    <div className="text-[10px] text-[#555F6D]">Fuel</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1A2E]">{route.manualTime}</div>
                    <div className="text-[10px] text-[#555F6D]">Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimized */}
            <div className="border border-[#4CAF50]/30 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-[#4CAF50]/8 border-b border-[#4CAF50]/20 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full" />
                <span className="font-bold text-[#4CAF50] text-sm">Optimized Route</span>
              </div>
              <div className="p-4">
                <StopList stops={route.routeStops} theme="green" />
                <div className="mt-3 pt-3 border-t border-[#E0E0E0] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs font-bold text-[#4CAF50]">{route.optimizedDistance} km</div>
                    <div className="text-[10px] text-[#555F6D]">Distance</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#4CAF50]">₹{route.optimizedFuelCost}</div>
                    <div className="text-[10px] text-[#555F6D]">Fuel</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#4CAF50]">{route.optimizedTime}</div>
                    <div className="text-[10px] text-[#555F6D]">Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings highlight bar */}
          <div className="bg-[#1A1A2E] rounded-xl px-5 py-4 flex flex-wrap items-center justify-center gap-4 text-center">
            <div>
              <span className="text-[#FF5722] font-extrabold text-lg">{route.distanceSaved} km</span>
              <span className="text-white/60 text-xs ml-1">saved</span>
            </div>
            <div className="w-px h-6 bg-white/20 hidden sm:block" />
            <div>
              <span className="text-[#4CAF50] font-extrabold text-lg">₹{route.fuelSaved}</span>
              <span className="text-white/60 text-xs ml-1">fuel saved</span>
            </div>
            <div className="w-px h-6 bg-white/20 hidden sm:block" />
            <div>
              <span className="text-[#FF9800] font-extrabold text-lg">{route.timeSaved} min</span>
              <span className="text-white/60 text-xs ml-1">time saved</span>
            </div>
          </div>

          {/* Section B — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 — Optimization Details */}
            <div className="bg-[#F5F5F5] rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-[#1A1A2E] text-sm flex items-center gap-2">
                <Zap size={14} className="text-[#FF5722]" /> Optimization Details
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#555F6D]">Algorithm</span>
                  <span className="font-semibold text-[#1A1A2E]">{route.algorithm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555F6D]">Variables analyzed</span>
                  <span className="font-semibold text-[#1A1A2E]">{route.variablesUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555F6D]">Optimization time</span>
                  <span className="font-semibold text-[#1A1A2E]">8 sec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555F6D]">Model version</span>
                  <span className="font-semibold text-[#1A1A2E]">v2.4</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#555F6D]">Confidence</span>
                    <span className="font-bold text-[#4CAF50]">{route.confidence}%</span>
                  </div>
                  <MiniBar value={route.confidence} max={100} color="bg-[#4CAF50]" />
                </div>
              </div>
            </div>

            {/* Column 2 — Savings Breakdown */}
            <div className="bg-[#F5F5F5] rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-[#1A1A2E] text-sm flex items-center gap-2">
                <BarChart2 size={14} className="text-[#FF5722]" /> Savings Breakdown
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#555F6D]">Distance</span>
                    <span className="font-bold text-[#1A1A2E]">{route.distanceSaved} km ({route.distanceReduction}%)</span>
                  </div>
                  <MiniBar value={route.distanceSaved} max={route.manualDistance} color="bg-[#FF5722]" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#555F6D]">Fuel</span>
                    <span className="font-bold text-[#1A1A2E]">₹{route.fuelSaved}</span>
                  </div>
                  <MiniBar value={route.fuelSaved} max={route.manualFuelCost} color="bg-[#FF9800]" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#555F6D]">Time</span>
                    <span className="font-bold text-[#1A1A2E]">{route.timeSaved} min</span>
                  </div>
                  <MiniBar value={route.timeSaved} max={route.manualTimeMinutes} color="bg-[#4CAF50]" />
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E0E0E0]">
                  <span className="text-[#555F6D]">CO₂ reduced</span>
                  <span className="font-bold text-[#4CAF50]">~{co2Saved} kg</span>
                </div>
              </div>
            </div>

            {/* Column 3 — Quick Actions */}
            <div className="bg-[#F5F5F5] rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-[#1A1A2E] text-sm">Quick Actions</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setApplied(true)}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-colors ${
                    applied
                      ? 'bg-[#4CAF50] text-white'
                      : 'bg-[#FF5722] text-white hover:bg-[#E64A19]'
                  }`}
                >
                  {applied ? '✓ Applied to Similar Routes' : 'Apply to Similar Routes'}
                </button>
                <button className="w-full py-2 rounded-lg text-xs font-bold bg-[#1A1A2E] text-white hover:bg-[#2d2d4e] transition-colors flex items-center justify-center gap-2">
                  <Send size={12} /> Assign to Driver
                </button>
                <button className="w-full py-2 rounded-lg text-xs font-bold border border-[#E0E0E0] text-[#555F6D] hover:border-[#1A1A2E] hover:text-[#1A1A2E] transition-colors flex items-center justify-center gap-2 bg-white">
                  <FileText size={12} /> Export Route PDF
                </button>
                <button className="w-full py-2 rounded-lg text-xs font-bold border border-[#E0E0E0] text-[#555F6D] hover:border-[#1A1A2E] hover:text-[#1A1A2E] transition-colors flex items-center justify-center gap-2 bg-white">
                  <Map size={12} /> View on Map
                </button>
                {route.status === 'Pending' && (
                  <button
                    onClick={() => setDispatched(true)}
                    className={`w-full py-3 rounded-lg text-sm font-extrabold transition-colors mt-1 ${
                      dispatched
                        ? 'bg-[#4CAF50] text-white'
                        : 'bg-[#FF5722] text-white hover:bg-[#E64A19] shadow-lg'
                    }`}
                  >
                    {dispatched ? '✓ Dispatched!' : '⚡ Dispatch Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#F5F5F5] rounded-b-2xl">
          <p className="text-[11px] text-[#555F6D] leading-relaxed">
            <span className="font-bold text-[#1A1A2E]">Algorithm:</span> Route optimized using DBSCAN clustering for stop batching and TSP solver for sequence optimization across {route.variablesUsed} variables including traffic patterns, delivery time windows, vehicle capacity, and road distance matrices.
          </p>
        </div>
      </div>
    </div>
  );
}