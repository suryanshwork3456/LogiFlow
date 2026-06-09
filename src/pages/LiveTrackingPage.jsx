// filepath: src/pages/LiveTrackingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function LiveTrackingPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-[#F5F5F5]">
      <Navbar />
      
      {/* Page Hero */}
      <div className="bg-[#1A1A2E] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-[#FF5722] font-bold mb-6 inline-block hover:underline">← Back to Home</Link>
          <div className="text-white/60 mb-2 font-medium tracking-wide">Home / Live Tracking</div>
          <h1 className="text-white text-[40px] md:text-[56px] font-bold leading-tight mb-4">Live Fleet Tracking</h1>
          <p className="text-white/80 text-xl font-medium mb-6">Real-time GPS visibility for every vehicle</p>
          <div className="w-12 h-1 bg-[#FF5722]"></div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 w-full space-y-12">
        {/* SECTION A — Map + Selected Vehicle */}
        <section className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-[65%] min-h-[500px] bg-[#0F1923] rounded-2xl border border-[#E0E0E0] relative overflow-hidden flex shadow-md"
               style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.03) 19px, rgba(255,255,255,0.03) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.03) 19px, rgba(255,255,255,0.03) 20px)' }}>
            
            {/* Live Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-[#4CAF50]/20 text-[#4CAF50] rounded-full border border-[#4CAF50]/30 z-20">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider">LIVE</span>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
              <button className="w-10 h-10 bg-[#FFFFFF] rounded-lg shadow-sm border border-[#E0E0E0] flex items-center justify-center font-bold text-[#1A1A2E] hover:bg-[#F5F5F5]">+</button>
              <button className="w-10 h-10 bg-[#FFFFFF] rounded-lg shadow-sm border border-[#E0E0E0] flex items-center justify-center font-bold text-[#1A1A2E] hover:bg-[#F5F5F5]">-</button>
            </div>

            {/* SVG Route Line */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="none">
              <polyline points="25%,30% 45%,55% 65%,20%" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" className="animate-[dash_30s_linear_infinite]" />
              <style>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>
            </svg>

            {/* Marker 1 */}
            <div className="absolute left-[25%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 cursor-pointer group">
              <div className="mb-2 bg-[#FFFFFF] px-2 py-1 rounded text-[10px] font-bold text-[#1A1A2E] shadow-sm whitespace-nowrap opacity-100 group-hover:bg-[#FF5722] group-hover:text-[#FFFFFF] transition-colors">DL-4521</div>
              <div className="relative">
                <div className="w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_10px_#FF5722]"></div>
                <div className="absolute inset-0 border-2 border-[#FF5722] rounded-full animate-ping scale-[2.5]"></div>
              </div>
            </div>

            {/* Marker 2 */}
            <div className="absolute left-[45%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 cursor-pointer group">
              <div className="mb-2 bg-[#FFFFFF] px-2 py-1 rounded text-[10px] font-bold text-[#1A1A2E] shadow-sm whitespace-nowrap opacity-100 group-hover:bg-[#FF5722] group-hover:text-[#FFFFFF] transition-colors">DL-7823</div>
              <div className="relative">
                <div className="w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_10px_#FF5722]"></div>
                <div className="absolute inset-0 border-2 border-[#FF5722] rounded-full animate-ping scale-[2.5]" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>

            {/* Marker 3 */}
            <div className="absolute left-[65%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 cursor-pointer group">
              <div className="mb-2 bg-[#FFFFFF] px-2 py-1 rounded text-[10px] font-bold text-[#1A1A2E] shadow-sm whitespace-nowrap opacity-100 group-hover:bg-[#FF5722] group-hover:text-[#FFFFFF] transition-colors">MH-1134</div>
              <div className="relative">
                <div className="w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_10px_#FF5722]"></div>
                <div className="absolute inset-0 border-2 border-[#FF5722] rounded-full animate-ping scale-[2.5]" style={{animationDelay: '0.8s'}}></div>
              </div>
            </div>

            {/* Marker 4 */}
            <div className="absolute left-[70%] top-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 cursor-pointer group">
              <div className="mb-2 bg-[#FFFFFF] px-2 py-1 rounded text-[10px] font-bold text-[#1A1A2E] shadow-sm whitespace-nowrap opacity-100 group-hover:bg-[#FF5722] group-hover:text-[#FFFFFF] transition-colors">KA-9921</div>
              <div className="relative">
                <div className="w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_10px_#FF5722]"></div>
                <div className="absolute inset-0 border-2 border-[#FF5722] rounded-full animate-ping scale-[2.5]" style={{animationDelay: '1.2s'}}></div>
              </div>
            </div>

            {/* Marker 5 */}
            <div className="absolute left-[80%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 cursor-pointer group">
              <div className="mb-2 bg-[#FFFFFF] px-2 py-1 rounded text-[10px] font-bold text-[#1A1A2E] shadow-sm whitespace-nowrap opacity-100 group-hover:bg-[#FF5722] group-hover:text-[#FFFFFF] transition-colors">TN-5532</div>
              <div className="relative">
                <div className="w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_10px_#FF5722]"></div>
                <div className="absolute inset-0 border-2 border-[#FF5722] rounded-full animate-ping scale-[2.5]" style={{animationDelay: '1.6s'}}></div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%] bg-[#FFFFFF] rounded-2xl shadow-md border border-[#E0E0E0] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#E0E0E0] bg-[#FAFAFA]">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-1">Selected Vehicle</h2>
              <p className="text-sm font-bold text-[#FF5722]">DL-4521</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#555F6D] font-semibold text-xs mb-1">Driver</div>
                  <div className="font-bold text-[#1A1A2E]">Rajan Kumar</div>
                </div>
                <div>
                  <div className="text-[#555F6D] font-semibold text-xs mb-1">Status</div>
                  <div className="inline-block px-3 py-1 bg-[#4CAF50]/15 text-[#4CAF50] rounded-full text-xs font-bold">On Route</div>
                </div>
                <div>
                  <div className="text-[#555F6D] font-semibold text-xs mb-1">Speed</div>
                  <div className="font-bold text-[#1A1A2E]">48 km/h</div>
                </div>
                <div>
                  <div className="text-[#555F6D] font-semibold text-xs mb-1">ETA</div>
                  <div className="font-bold text-[#1A1A2E]">14 minutes</div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-[#555F6D] font-semibold text-xs mb-1">Route</div>
                <div className="font-bold text-[#1A1A2E] text-sm">Sector 14 → Connaught Place</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                <div>
                  <div className="text-[#555F6D] font-semibold text-xs mb-1">Distance left</div>
                  <div className="font-bold text-[#1A1A2E]">8.2 km</div>
                </div>
                <div>
                  <div className="text-[#555F6D] font-semibold text-xs mb-1">Last GPS ping</div>
                  <div className="font-bold text-[#1A1A2E]">30 sec ago</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E0E0E0]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-[#555F6D]">Fuel level</span>
                  <span className="text-xs font-bold text-[#1A1A2E]">72%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F5F5F5] overflow-hidden">
                  <div className="h-full bg-[#FF5722] rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-[#FAFAFA] flex flex-col">
              <div className="px-6 py-3 border-y border-[#E0E0E0] text-xs font-bold text-[#555F6D] uppercase tracking-wider">
                Fleet List
              </div>
              <div className="overflow-y-auto max-h-[220px]">
                <div className="bg-[#FFF5F2] border-l-4 border-[#FF5722] px-6 py-3 flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="font-bold text-[#1A1A2E] text-sm">DL-4521</div>
                    <div className="text-xs text-[#555F6D] font-medium">Rajan Kumar</div>
                  </div>
                  <div className="px-2 py-1 bg-[#4CAF50]/15 text-[#4CAF50] rounded-md text-[10px] font-bold">On Route</div>
                </div>
                <div className="px-6 py-3 border-b border-[#E0E0E0] flex items-center justify-between cursor-pointer hover:bg-[#F5F5F5]">
                  <div>
                    <div className="font-bold text-[#1A1A2E] text-sm">DL-7823</div>
                    <div className="text-xs text-[#555F6D] font-medium">Priya Sharma</div>
                  </div>
                  <div className="px-2 py-1 bg-[#FF5722]/15 text-[#FF5722] rounded-md text-[10px] font-bold">Delayed</div>
                </div>
                <div className="px-6 py-3 border-b border-[#E0E0E0] flex items-center justify-between cursor-pointer hover:bg-[#F5F5F5]">
                  <div>
                    <div className="font-bold text-[#1A1A2E] text-sm">MH-1134</div>
                    <div className="text-xs text-[#555F6D] font-medium">Arjun Tiwari</div>
                  </div>
                  <div className="px-2 py-1 bg-[#4CAF50]/15 text-[#4CAF50] rounded-md text-[10px] font-bold">On Route</div>
                </div>
                <div className="px-6 py-3 border-b border-[#E0E0E0] flex items-center justify-between cursor-pointer hover:bg-[#F5F5F5]">
                  <div>
                    <div className="font-bold text-[#1A1A2E] text-sm">KA-9921</div>
                    <div className="text-xs text-[#555F6D] font-medium">Meena Patel</div>
                  </div>
                  <div className="px-2 py-1 bg-[#FF9800]/15 text-[#FF9800] rounded-md text-[10px] font-bold">Loading</div>
                </div>
                <div className="px-6 py-3 border-b border-[#E0E0E0] flex items-center justify-between cursor-pointer hover:bg-[#F5F5F5]">
                  <div>
                    <div className="font-bold text-[#1A1A2E] text-sm">TN-5532</div>
                    <div className="text-xs text-[#555F6D] font-medium">Karan Singh</div>
                  </div>
                  <div className="px-2 py-1 bg-[#4CAF50]/15 text-[#4CAF50] rounded-md text-[10px] font-bold">On Route</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B — Tracking Stats Row */}
        <section className="bg-[#1A1A2E] rounded-2xl p-6 lg:p-10 flex flex-wrap lg:flex-nowrap justify-around gap-8 text-center shadow-xl">
          <div className="w-full sm:w-auto">
            <p className="text-3xl font-extrabold text-[#FFFFFF] mb-2">42 km/h</p>
            <p className="text-[#FF5722] text-sm font-bold tracking-wider uppercase">Avg Speed</p>
          </div>
          <div className="hidden lg:block w-px bg-white/10"></div>
          <div className="w-full sm:w-auto">
            <p className="text-3xl font-extrabold text-[#FFFFFF] mb-2">±3m</p>
            <p className="text-[#FF5722] text-sm font-bold tracking-wider uppercase">GPS Accuracy</p>
          </div>
          <div className="hidden lg:block w-px bg-white/10"></div>
          <div className="w-full sm:w-auto">
            <p className="text-3xl font-extrabold text-[#FFFFFF] mb-2">1,240 km</p>
            <p className="text-[#FF5722] text-sm font-bold tracking-wider uppercase">Total Distance Today</p>
          </div>
          <div className="hidden lg:block w-px bg-white/10"></div>
          <div className="w-full sm:w-auto">
            <p className="text-3xl font-extrabold text-[#FFFFFF] mb-2">₹4,200</p>
            <p className="text-[#FF5722] text-sm font-bold tracking-wider uppercase">Fuel Saved</p>
          </div>
        </section>

        {/* SECTION C — Driver Behavior */}
        <section className="bg-[#FFFFFF] rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8">Driver Performance Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="border border-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-shadow bg-[#F9F9F9]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center font-extrabold text-xl">RK</div>
                <div>
                  <div className="font-bold text-[#1A1A2E] text-lg">Rajan Kumar</div>
                  <div className="text-[#555F6D] text-xs font-semibold uppercase">DL-4521</div>
                </div>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#555F6D]">Deliveries</span>
                  <span className="font-bold text-[#1A1A2E]">8/10 completed</span>
                </div>
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#555F6D]">Rating</span>
                  <span className="font-bold text-[#FF9800]">⭐ 4.8</span>
                </div>
                <div className="border-b border-[#E0E0E0] pb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#555F6D]">Speed compliance</span>
                    <span className="font-bold text-[#4CAF50]">94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full">
                     <div className="h-full bg-[#4CAF50] rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#555F6D]">Harsh braking</span>
                  <span className="font-bold text-[#FF5722]">2 events</span>
                </div>
              </div>
            </div>

            <div className="border border-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-shadow bg-[#F9F9F9]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center font-extrabold text-xl">PS</div>
                <div>
                  <div className="font-bold text-[#1A1A2E] text-lg">Priya Sharma</div>
                  <div className="text-[#555F6D] text-xs font-semibold uppercase">DL-7823</div>
                </div>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#555F6D]">Deliveries</span>
                  <span className="font-bold text-[#1A1A2E]">5/8 completed</span>
                </div>
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#555F6D]">Rating</span>
                  <span className="font-bold text-[#FF9800]">⭐ 4.9</span>
                </div>
                <div className="border-b border-[#E0E0E0] pb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#555F6D]">Speed compliance</span>
                    <span className="font-bold text-[#4CAF50]">98%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full">
                     <div className="h-full bg-[#4CAF50] rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#555F6D]">Harsh braking</span>
                  <span className="font-bold text-[#1A1A2E]">0 events</span>
                </div>
              </div>
            </div>

            <div className="border border-[#E0E0E0] rounded-xl p-6 hover:shadow-md transition-shadow bg-[#F9F9F9]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center font-extrabold text-xl">AT</div>
                <div>
                  <div className="font-bold text-[#1A1A2E] text-lg">Arjun Tiwari</div>
                  <div className="text-[#555F6D] text-xs font-semibold uppercase">MH-1134</div>
                </div>
              </div>
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#555F6D]">Deliveries</span>
                  <span className="font-bold text-[#1A1A2E]">12/12 completed</span>
                </div>
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#555F6D]">Rating</span>
                  <span className="font-bold text-[#FF9800]">⭐ 4.7</span>
                </div>
                <div className="border-b border-[#E0E0E0] pb-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#555F6D]">Speed compliance</span>
                    <span className="font-bold text-[#FF9800]">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full">
                     <div className="h-full bg-[#FF9800] rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#555F6D]">Harsh braking</span>
                  <span className="font-bold text-[#FF5722]">4 events</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
