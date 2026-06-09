// filepath: src/pages/RouteOptimizationPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';

export default function RouteOptimizationPage() {
  return (


      <div className="flex-grow max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 w-full space-y-16">
        
        {/* SECTION A — Before vs After Comparison */}
        <section>
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 relative">
            
            {/* LEFT — Before Optimization */}
            <div className="w-full lg:w-[45%] bg-[#FFFFFF] rounded-2xl shadow-lg border-t-[4px] border-[#FF5722] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#E0E0E0] flex justify-between items-center bg-[#FAFAFA]">
                <h3 className="font-bold text-[#1A1A2E] text-lg">Before Optimization</h3>
                <span className="px-3 py-1 bg-[#E0E0E0] text-[#555F6D] text-xs font-bold rounded-full">Manual Dispatch</span>
              </div>
              <div className="h-64 bg-[#0F1923] relative overflow-hidden" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.03) 19px, rgba(255,255,255,0.03) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.03) 19px, rgba(255,255,255,0.03) 20px)' }}>
                {/* Messy Routes */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <polyline points="20%,80% 50%,20% 80%,70% 30%,40% 60%,90%" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                  <polyline points="30%,40% 80%,70% 20%,80%" fill="none" stroke="#FF9800" strokeWidth="1.5" opacity="0.6" />
                </svg>
                <div className="absolute top-[20%] left-[50%] w-2 h-2 bg-[#FF5722] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#FF5722]"></div>
                <div className="absolute top-[80%] left-[20%] w-2 h-2 bg-[#FF5722] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#FF5722]"></div>
                <div className="absolute top-[70%] left-[80%] w-2 h-2 bg-[#FF5722] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#FF5722]"></div>
                <div className="absolute top-[40%] left-[30%] w-2 h-2 bg-[#FF5722] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#FF5722]"></div>
                <div className="absolute top-[90%] left-[60%] w-2 h-2 bg-[#FF5722] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#FF5722]"></div>
              </div>
              <div className="p-4 grid grid-cols-3 divide-x divide-[#E0E0E0] text-center">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1">Distance</div>
                  <div className="font-extrabold text-[#1A1A2E]">48 km</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1">Fuel Cost</div>
                  <div className="font-extrabold text-[#1A1A2E]">₹820</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1">Time</div>
                  <div className="font-extrabold text-[#1A1A2E]">2h 40m</div>
                </div>
              </div>
            </div>

            {/* CENTER — Arrow badge */}
            <div className="w-full lg:w-[10%] flex justify-center z-10 lg:-mx-4 my-[-20px] lg:my-0">
              <div className="bg-[#FF5722] text-[#FFFFFF] font-bold text-sm px-6 py-3 rounded-full shadow-lg whitespace-nowrap lg:-rotate-90 lg:translate-x-0 tracking-wider">
                ⚡ AI Optimized →
              </div>
            </div>

            {/* RIGHT — After Optimization */}
            <div className="w-full lg:w-[45%] bg-[#FFFFFF] rounded-2xl shadow-lg border-t-[4px] border-[#4CAF50] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#E0E0E0] flex justify-between items-center bg-[#FAFAFA]">
                <h3 className="font-bold text-[#1A1A2E] text-lg">After Optimization</h3>
                <span className="px-3 py-1 bg-[#4CAF50]/15 text-[#4CAF50] text-xs font-bold rounded-full">AI Optimized</span>
              </div>
              <div className="h-64 bg-[#0F1923] relative overflow-hidden" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.03) 19px, rgba(255,255,255,0.03) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.03) 19px, rgba(255,255,255,0.03) 20px)' }}>
                {/* Clean Route */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <path d="M 20 80 Q 25 60 30 40 T 50 20 T 80 70 T 60 90 Z" fill="none" stroke="#4CAF50" strokeWidth="3" opacity="0.9" />
                </svg>
                <div className="absolute top-[20%] left-[50%] w-3 h-3 bg-[#4CAF50] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#4CAF50]"></div>
                <div className="absolute top-[80%] left-[20%] w-3 h-3 bg-[#4CAF50] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#4CAF50]"></div>
                <div className="absolute top-[70%] left-[80%] w-3 h-3 bg-[#4CAF50] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#4CAF50]"></div>
                <div className="absolute top-[40%] left-[30%] w-3 h-3 bg-[#4CAF50] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#4CAF50]"></div>
                <div className="absolute top-[90%] left-[60%] w-3 h-3 bg-[#4CAF50] rounded-full translate-x-[-50%] translate-y-[-50%] shadow-[0_0_8px_#4CAF50]"></div>
              </div>
              <div className="p-4 grid grid-cols-3 divide-x divide-[#E0E0E0] text-center">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1">Distance</div>
                  <div className="font-extrabold text-[#4CAF50]">31 km</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1">Fuel Cost</div>
                  <div className="font-extrabold text-[#4CAF50]">₹530</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#555F6D] mb-1">Time</div>
                  <div className="font-extrabold text-[#4CAF50]">1h 45m</div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-8 bg-[#FF5722] text-[#FFFFFF] rounded-xl p-6 text-center shadow-lg font-bold text-lg leading-relaxed">
            You save ₹290 in fuel + 55 minutes per trip with LogiFlow AI
          </div>
        </section>

        {/* SECTION B — How It Works */}
        <section className="bg-[#FFFFFF] rounded-2xl p-8 md:p-12 shadow-sm border border-[#E0E0E0]">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-10 text-center">How Optimization Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-[#E0E0E0] -z-10"></div>
            
            <div>
              <div className="w-14 h-14 bg-[#1A1A2E] text-[#FFFFFF] rounded-full flex items-center justify-center font-extrabold text-xl mx-auto mb-6 shadow-md border-4 border-[#FFFFFF]">1</div>
              <h3 className="font-extrabold text-[#1A1A2E] text-lg mb-2">Upload Your Stops</h3>
              <p className="text-[#555F6D] font-medium text-sm leading-relaxed px-4">Add 1–50 delivery stops via CSV or form input</p>
            </div>
            
            <div>
              <div className="w-14 h-14 bg-[#FF5722] text-[#FFFFFF] rounded-full flex items-center justify-center font-extrabold text-xl mx-auto mb-6 shadow-md border-4 border-[#FFFFFF] animate-pulse">2</div>
              <h3 className="font-extrabold text-[#1A1A2E] text-lg mb-2">AI Calculates</h3>
              <p className="text-[#555F6D] font-medium text-sm leading-relaxed px-4">14 variables processed. Optimal sequence found.</p>
            </div>
            
            <div>
              <div className="w-14 h-14 bg-[#4CAF50] text-[#FFFFFF] rounded-full flex items-center justify-center font-extrabold text-xl mx-auto mb-6 shadow-md border-4 border-[#FFFFFF]">3</div>
              <h3 className="font-extrabold text-[#1A1A2E] text-lg mb-2">Route Dispatched</h3>
              <p className="text-[#555F6D] font-medium text-sm leading-relaxed px-4">Driver app notified. Route locked in 8 seconds.</p>
            </div>
          </div>
        </section>

        {/* SECTION C — Optimization Stats */}
        <section className="bg-[#1A1A2E] rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(255,255,255,0.1)] text-center">
            <div className="pt-4 sm:pt-0">
              <div className="text-4xl font-extrabold text-[#FF5722] mb-2">35%</div>
              <div className="text-[#FFFFFF]/90 font-bold text-sm tracking-wide uppercase">Avg Distance Reduced</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-4xl font-extrabold text-[#FF5722] mb-2">₹290</div>
              <div className="text-[#FFFFFF]/90 font-bold text-sm tracking-wide uppercase">Avg Fuel Saved/Trip</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-4xl font-extrabold text-[#FF5722] mb-2">8 sec</div>
              <div className="text-[#FFFFFF]/90 font-bold text-sm tracking-wide uppercase">Optimization Time</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-4xl font-extrabold text-[#FF5722] mb-2">50</div>
              <div className="text-[#FFFFFF]/90 font-bold text-sm tracking-wide uppercase">Max Stops Supported</div>
            </div>
          </div>
        </section>
    </div>
  );
}
