import { useMemo } from 'react';

export default function OptimizationComparison({ routes }) {
  const totals = useMemo(() => {
    return routes.reduce(
      (acc, r) => ({
        manualDistance: acc.manualDistance + r.manualDistance,
        optimizedDistance: acc.optimizedDistance + r.optimizedDistance,
        manualFuelCost: acc.manualFuelCost + r.manualFuelCost,
        optimizedFuelCost: acc.optimizedFuelCost + r.optimizedFuelCost,
        manualTimeMinutes: acc.manualTimeMinutes + r.manualTimeMinutes,
        optimizedTimeMinutes: acc.optimizedTimeMinutes + r.optimizedTimeMinutes,
        totalFuelSaved: acc.totalFuelSaved + r.fuelSaved,
        totalTimeSaved: acc.totalTimeSaved + r.timeSaved,
      }),
      {
        manualDistance: 0,
        optimizedDistance: 0,
        manualFuelCost: 0,
        optimizedFuelCost: 0,
        manualTimeMinutes: 0,
        optimizedTimeMinutes: 0,
        totalFuelSaved: 0,
        totalTimeSaved: 0,
      }
    );
  }, [routes]);

  const fmtTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch gap-0 relative">
        {/* LEFT — Before */}
        <div className="w-full lg:w-[45%] bg-white rounded-2xl lg:rounded-r-none shadow-lg border-t-4 border-[#FF5722] overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center bg-[#FAFAFA]">
            <h3 className="font-bold text-[#1A1A2E] text-base">Before Optimization</h3>
            <span className="px-3 py-1 bg-[#E0E0E0] text-[#555F6D] text-xs font-bold rounded-full tracking-wide">
              Manual Dispatch
            </span>
          </div>

          <div
            className="h-56 bg-[#0F1923] relative overflow-hidden flex-shrink-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,0.03) 19px,rgba(255,255,255,0.03) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,0.03) 19px,rgba(255,255,255,0.03) 20px)',
            }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 220" preserveAspectRatio="none">
              <line x1="60" y1="176" x2="150" y2="44" stroke="#FF5722" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
              <line x1="150" y1="44" x2="240" y2="154" stroke="#FF5722" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
              <line x1="240" y1="154" x2="90" y2="88" stroke="#FF9800" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.65" />
              <line x1="90" y1="88" x2="180" y2="198" stroke="#FF5722" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
              <line x1="180" y1="198" x2="60" y2="176" stroke="#FF9800" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" />
              <line x1="150" y1="44" x2="180" y2="198" stroke="#FF5722" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
              <line x1="60" y1="176" x2="240" y2="154" stroke="#FF9800" strokeWidth="1" strokeDasharray="3 5" opacity="0.35" />
            </svg>
            {[
              [60, 176], [150, 44], [240, 154], [90, 88], [180, 198], [210, 110],
            ].map(([x, y], i) => (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 bg-[#FF5722] rounded-full"
                style={{
                  left: `${(x / 300) * 100}%`,
                  top: `${(y / 220) * 100}%`,
                  transform: 'translate(-50%,-50%)',
                  boxShadow: '0 0 8px #FF5722',
                }}
              />
            ))}
            <div className="absolute top-3 left-3 text-[10px] font-bold text-[#FF5722]/60 tracking-widest uppercase">
              Inefficient
            </div>
          </div>

          <div className="px-5 py-4 grid grid-cols-3 divide-x divide-[#E0E0E0] text-center">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1 tracking-wide">Distance</div>
              <div className="font-extrabold text-[#1A1A2E] text-sm">{totals.manualDistance} km</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1 tracking-wide">Fuel Cost</div>
              <div className="font-extrabold text-[#1A1A2E] text-sm">₹{totals.manualFuelCost.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1 tracking-wide">Time</div>
              <div className="font-extrabold text-[#1A1A2E] text-sm">{fmtTime(totals.manualTimeMinutes)}</div>
            </div>
          </div>
        </div>

        {/* CENTER pill */}
        <div className="flex lg:flex-col items-center justify-center z-10 py-2 lg:py-0 lg:w-[10%]">
          <div className="bg-[#FF5722] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-xl tracking-wider whitespace-nowrap">
            ⚡ AI Optimized →
          </div>
        </div>

        {/* RIGHT — After */}
        <div className="w-full lg:w-[45%] bg-white rounded-2xl lg:rounded-l-none shadow-lg border-t-4 border-[#4CAF50] overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center bg-[#FAFAFA]">
            <h3 className="font-bold text-[#1A1A2E] text-base">After Optimization</h3>
            <span className="px-3 py-1 bg-[#4CAF50]/15 text-[#4CAF50] text-xs font-bold rounded-full tracking-wide">
              AI Optimized
            </span>
          </div>

          <div
            className="h-56 bg-[#0F1923] relative overflow-hidden flex-shrink-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,0.03) 19px,rgba(255,255,255,0.03) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,0.03) 19px,rgba(255,255,255,0.03) 20px)',
            }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 220" preserveAspectRatio="none">
              <path
                d="M 60 176 Q 72 140 90 88 Q 120 60 150 44 Q 195 66 210 110 Q 228 130 240 154 Q 210 178 180 198 Z"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <circle cx="60" cy="176" r="4" fill="#4CAF50" opacity="0.3" />
              <circle cx="180" cy="198" r="4" fill="#4CAF50" opacity="0.3" />
            </svg>
            {[
              [60, 176], [90, 88], [150, 44], [210, 110], [240, 154], [180, 198],
            ].map(([x, y], i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-[#4CAF50] rounded-full"
                style={{
                  left: `${(x / 300) * 100}%`,
                  top: `${(y / 220) * 100}%`,
                  transform: 'translate(-50%,-50%)',
                  boxShadow: '0 0 10px #4CAF50',
                }}
              />
            ))}
            <div className="absolute top-3 left-3 text-[10px] font-bold text-[#4CAF50]/60 tracking-widest uppercase">
              Optimized
            </div>
          </div>

          <div className="px-5 py-4 grid grid-cols-3 divide-x divide-[#E0E0E0] text-center">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1 tracking-wide">Distance</div>
              <div className="font-extrabold text-[#4CAF50] text-sm">{totals.optimizedDistance} km</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1 tracking-wide">Fuel Cost</div>
              <div className="font-extrabold text-[#4CAF50] text-sm">₹{totals.optimizedFuelCost.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1 tracking-wide">Time</div>
              <div className="font-extrabold text-[#4CAF50] text-sm">{fmtTime(totals.optimizedTimeMinutes)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings banner */}
      <div className="bg-[#FF5722] text-white rounded-xl px-6 py-5 text-center shadow-lg">
        <p className="font-bold text-base leading-relaxed">
          You save{' '}
          <span className="text-xl">₹{totals.totalFuelSaved.toLocaleString()}</span> in fuel
          {' '}+{' '}
          <span className="text-xl">{totals.totalTimeSaved.toLocaleString()} min</span> across{' '}
          <span className="text-xl">{routes.length}</span> routes with LogiFlow AI
        </p>
      </div>
    </div>
  );
}