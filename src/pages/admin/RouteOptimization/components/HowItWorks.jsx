import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const STEPS = [
  {
    number: 1,
    color: 'bg-[#1A1A2E]',
    title: 'Upload Your Stops',
    description: 'Add 1–50 delivery stops via CSV or form input',
    detail: 'Supports bulk upload + manual entry',
    pulse: false,
  },
  {
    number: 2,
    color: 'bg-[#FF5722]',
    title: 'AI Calculates',
    description: '14 variables processed in 8 seconds',
    detail: 'DBSCAN clusters → TSP solver → optimal sequence',
    pulse: true,
  },
  {
    number: 3,
    color: 'bg-[#4CAF50]',
    title: 'Route Dispatched',
    description: 'Driver app notified instantly',
    detail: 'Route locked, ETA calculated, SLA checked',
    pulse: false,
  },
];

export default function HowItWorks() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E0E0E0]">
      <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-8 text-center">How Optimization Works</h2>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Connector line */}
        <div className="hidden md:block absolute top-7 left-[22%] right-[22%] h-0.5 bg-[#E0E0E0]" />

        {STEPS.map((step) => (
          <div key={step.number} className="flex flex-col items-center gap-3 relative">
            <div
              className={`w-14 h-14 ${step.color} text-white rounded-full flex items-center justify-center font-extrabold text-xl shadow-md border-4 border-white z-10 ${
                step.pulse ? 'animate-pulse' : ''
              }`}
            >
              {step.number}
            </div>
            <h3 className="font-extrabold text-[#1A1A2E] text-base">{step.title}</h3>
            <p className="text-[#555F6D] text-sm leading-relaxed max-w-[200px]">{step.description}</p>
            <p className="text-[#999] text-xs">{step.detail}</p>
          </div>
        ))}
      </div>

      {/* Expandable technical details */}
      <div className="mt-8 border-t border-[#E0E0E0] pt-5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-bold text-[#555F6D] hover:text-[#1A1A2E] transition-colors mx-auto"
        >
          Technical Details
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expanded && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F5F5F5] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-[#1A1A2E] rounded-full flex items-center justify-center text-[10px] text-white font-bold">D</div>
                <span className="font-bold text-[#1A1A2E] text-xs">DBSCAN Clustering</span>
              </div>
              <p className="text-[11px] text-[#555F6D] leading-relaxed">
                Density-Based Spatial Clustering groups geographically close delivery stops into logical clusters, reducing backtracking and minimizing total travel between unrelated zones.
              </p>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-[#FF5722] rounded-full flex items-center justify-center text-[10px] text-white font-bold">T</div>
                <span className="font-bold text-[#1A1A2E] text-xs">TSP Solver</span>
              </div>
              <p className="text-[11px] text-[#555F6D] leading-relaxed">
                The Travelling Salesman Problem solver finds the shortest path through all stops within each cluster, using nearest-neighbour heuristics with 2-opt local search for near-optimal sequences.
              </p>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-[#4CAF50] rounded-full flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                <span className="font-bold text-[#1A1A2E] text-xs">Why This Works</span>
              </div>
              <p className="text-[11px] text-[#555F6D] leading-relaxed">
                Pure TSP struggles at scale; DBSCAN pre-partitions the problem, letting the TSP solver work on smaller subsets. This hybrid achieves 29–38% distance reduction for typical last-mile delivery grids.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}