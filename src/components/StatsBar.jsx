// filepath: src/components/StatsBar.jsx

import React from "react";

export default function StatsBar() {
  return (
    <section className="bg-[#FFFFFF] py-10 relative group z-10 w-full overflow-visible">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-[#1A1A2E] rounded-[2rem] p-8 lg:p-12 shadow-2xl overflow-hidden relative">

          {/* Section Header */}
          <div
            className="text-center mb-12"
            data-reveal="true"
          >
            <span className="text-[#FF5722] uppercase tracking-[0.3em] font-semibold text-sm">
              Solutions
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              Smart Solutions for Modern Logistics
            </h2>

            <p className="mt-4 text-[rgba(255,255,255,0.65)] max-w-2xl mx-auto">
              Everything you need to streamline operations,
              minimize disruptions, and accelerate business growth.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">

            <div
              className="text-center bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              data-reveal="true"
            >
              <div className="text-4xl mb-4">⚡</div>

              <h3 className="text-white font-bold text-xl mb-3">
                Faster Decision Making
              </h3>

              <p className="text-[rgba(255,255,255,0.65)] text-sm leading-relaxed">
                Gain actionable insights instantly with centralized logistics intelligence.
              </p>
            </div>

            <div
              className="text-center bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              data-reveal="true"
              data-delay="100"
            >
              <div className="text-4xl mb-4">💰</div>

              <h3 className="text-white font-bold text-xl mb-3">
                Lower Operational Costs
              </h3>

              <p className="text-[rgba(255,255,255,0.65)] text-sm leading-relaxed">
                Reduce waste, optimize resources, and improve profitability.
              </p>
            </div>

            <div
              className="text-center bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              data-reveal="true"
              data-delay="200"
            >
              <div className="text-4xl mb-4">🛡</div>

              <h3 className="text-white font-bold text-xl mb-3">
                Proactive Risk Management
              </h3>

              <p className="text-[rgba(255,255,255,0.65)] text-sm leading-relaxed">
                Identify disruptions early and respond before they impact deliveries.
              </p>
            </div>

            <div
              className="text-center bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              data-reveal="true"
              data-delay="300"
            >
              <div className="text-4xl mb-4">🌍</div>

              <h3 className="text-white font-bold text-xl mb-3">
                Scalable Growth
              </h3>

              <p className="text-[rgba(255,255,255,0.65)] text-sm leading-relaxed">
                Expand operations confidently with infrastructure built to grow with your business.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}