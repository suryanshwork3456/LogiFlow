// filepath: src/components/StatsBar.jsx
import React from 'react';

export default function StatsBar() {
  return (
    <section className="bg-[#FFFFFF] py-10 relative group z-10 w-full overflow-visible">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-[#1A1A2E] rounded-[2rem] p-8 lg:p-12 shadow-2xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center justify-around gap-12 md:gap-4 relative z-10">
            <div className="text-center md:border-r-0 md:after:content-[''] md:after:block md:after:w-[1px] md:after:h-16 md:after:bg-white/10 md:after:absolute md:after:-right-[2px] md:relative px-4" data-reveal="true">
              <div className="mb-3">
                <span data-counter data-target="12000" data-suffix="+" style={{ color: '#FF5722', fontSize: '2rem', fontWeight: 800 }}>0+</span>
              </div>
              <div className="text-sm font-semibold text-[rgba(255,255,255,0.6)] tracking-wider">Shipments Tracked</div>
            </div>
            
            <div className="text-center md:border-r-0 md:after:content-[''] md:after:block md:after:w-[1px] md:after:h-16 md:after:bg-white/10 md:after:absolute md:after:-right-[2px] md:relative px-4" data-reveal="true" data-delay="100">
              <div className="mb-3">
                <span data-counter data-target="340" data-suffix="+" style={{ color: '#FF5722', fontSize: '2rem', fontWeight: 800 }}>0+</span>
              </div>
              <div className="text-sm font-semibold text-[rgba(255,255,255,0.6)] tracking-wider">Fleet Vehicles</div>
            </div>
            
            <div className="text-center md:border-r-0 md:after:content-[''] md:after:block md:after:w-[1px] md:after:h-16 md:after:bg-white/10 md:after:absolute md:after:-right-[2px] md:relative px-4" data-reveal="true" data-delay="200">
              <div className="mb-3">
                <span data-counter data-target="94" data-suffix="%" style={{ color: '#FF5722', fontSize: '2rem', fontWeight: 800 }}>0%</span>
              </div>
              <div className="text-sm font-semibold text-[rgba(255,255,255,0.6)] tracking-wider">On-Time Rate</div>
            </div>
            
            <div className="text-center px-4" data-reveal="true" data-delay="300">
              <div className="mb-3">
                <span data-counter data-target="38" data-suffix="%" style={{ color: '#FF5722', fontSize: '2rem', fontWeight: 800 }}>0%</span>
              </div>
              <div className="text-sm font-semibold text-[rgba(255,255,255,0.6)] tracking-wider">Cost Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
