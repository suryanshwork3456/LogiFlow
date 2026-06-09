// filepath: src/pages/ControlTowerPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Truck, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ControlTowerPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-[#F5F5F5]">
      <Navbar />
      
      {/* Page Hero */}
      <div className="bg-[#1A1A2E] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-[#FF5722] font-bold mb-6 inline-block hover:underline">← Back to Home</Link>
          <div className="text-white/60 mb-2 font-medium tracking-wide">Home / Control Tower</div>
          <h1 className="text-white text-[40px] md:text-[56px] font-bold leading-tight mb-4">Logistics Control Tower</h1>
          <p className="text-white/80 text-xl font-medium mb-6">Full operational visibility — one screen, real-time</p>
          <div className="w-12 h-1 bg-[#FF5722]"></div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 w-full space-y-12">
        {/* SECTION A — Overview KPI Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 border-t-[4px] border-[#FF5722]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">24</div>
                <div className="text-[#555F6D] font-bold text-sm">Vehicles On Route</div>
              </div>
              <div className="w-10 h-10 bg-[#FF5722]/10 rounded-full flex items-center justify-center text-[#FF5722]">
                <Truck size={20} />
              </div>
            </div>
            <div className="text-xs font-bold text-[#4CAF50]">+3 since this morning</div>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 border-t-[4px] border-[#FF5722]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">7</div>
                <div className="text-[#555F6D] font-bold text-sm">Awaiting Assignment</div>
              </div>
              <div className="w-10 h-10 bg-[#FF9800]/10 rounded-full flex items-center justify-center text-[#FF9800]">
                <Clock size={20} />
              </div>
            </div>
            <div className="text-xs font-bold text-[#FF9800]">2 high priority</div>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 border-t-[4px] border-[#FF5722]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">3</div>
                <div className="text-[#555F6D] font-bold text-sm">Currently Delayed</div>
              </div>
              <div className="w-10 h-10 bg-[#FF9800]/10 rounded-full flex items-center justify-center text-[#FF9800]">
                <AlertTriangle size={20} />
              </div>
            </div>
            <div className="text-xs font-bold text-[#FF5722]">Avg delay: 22 min</div>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 border-t-[4px] border-[#FF5722]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">89</div>
                <div className="text-[#555F6D] font-bold text-sm">Deliveries Done</div>
              </div>
              <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center text-[#4CAF50]">
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="text-xs font-bold text-[#4CAF50]">↑ 12% vs yesterday</div>
          </div>
        </section>

        {/* SECTION B — Live Operations Table */}
        <section className="bg-[#1A1A2E] rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-[#FFFFFF]">Live Fleet Status</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#4CAF50]/20 text-[#4CAF50] rounded-full border border-[#4CAF50]/30 animate-pulse">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
              <span className="text-xs font-bold uppercase">LIVE</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse bg-[#FFFFFF] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#1A1A2E] text-[#FFFFFF] text-left">
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Vehicle ID</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Driver</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Route</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Status</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">ETA</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Last Update</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#E0E0E0] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">DL-4521</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Rajan Kumar</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Sector 14 → CP</td>
                  <td className="py-4 px-6"><span className="bg-[#4CAF50]/15 text-[#4CAF50] font-bold rounded-full px-3 py-1 text-xs">On Route 🟢</span></td>
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">14 min</td>
                  <td className="py-4 px-6 text-[#555F6D]">2 min ago</td>
                </tr>
                <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">DL-7823</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Priya Sharma</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Noida → Gurgaon</td>
                  <td className="py-4 px-6"><span className="bg-[#FF5722]/15 text-[#FF5722] font-bold rounded-full px-3 py-1 text-xs">Delayed 🔴</span></td>
                  <td className="py-4 px-6 font-bold text-[#FF5722]">38 min</td>
                  <td className="py-4 px-6 text-[#555F6D]">1 min ago</td>
                </tr>
                <tr className="border-b border-[#E0E0E0] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">MH-1134</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Arjun Tiwari</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Andheri → BKC</td>
                  <td className="py-4 px-6"><span className="bg-[#4CAF50]/15 text-[#4CAF50] font-bold rounded-full px-3 py-1 text-xs">On Route 🟢</span></td>
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">22 min</td>
                  <td className="py-4 px-6 text-[#555F6D]">3 min ago</td>
                </tr>
                <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">KA-9921</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Meena Patel</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Whitefield → MG</td>
                  <td className="py-4 px-6"><span className="bg-[#FF9800]/15 text-[#FF9800] font-bold rounded-full px-3 py-1 text-xs">Loading ⏳</span></td>
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">--</td>
                  <td className="py-4 px-6 text-[#555F6D]">5 min ago</td>
                </tr>
                <tr className="hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">TN-5532</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Karan Singh</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">T-Nagar → Adyar</td>
                  <td className="py-4 px-6"><span className="bg-[#4CAF50]/15 text-[#4CAF50] font-bold rounded-full px-3 py-1 text-xs">On Route 🟢</span></td>
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">9 min</td>
                  <td className="py-4 px-6 text-[#555F6D]">1 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION C — Alert Feed */}
        <section className="bg-[#FFFFFF] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Active Alerts</h2>
              <div className="space-y-4">
                <div className="flex items-start justify-between bg-[#F5F5F5] p-5 rounded-xl border border-[#E0E0E0]">
                  <div className="pr-4">
                    <p className="font-bold text-[#1A1A2E] text-sm mb-1">🔴 Truck DL-7823 — Route deviation detected (2.3km off planned route)</p>
                    <p className="text-xs font-semibold text-[#555F6D]">3 min ago</p>
                  </div>
                  <button className="px-4 py-2 bg-[#FF5722] text-[#FFFFFF] text-xs font-bold rounded-lg hover:bg-[#FF7043] shrink-0">Resolve</button>
                </div>
                <div className="flex items-start justify-between bg-[#F5F5F5] p-5 rounded-xl border border-[#E0E0E0]">
                  <div className="pr-4">
                    <p className="font-bold text-[#1A1A2E] text-sm mb-1">⚠️ SLA Risk — Order #4421 due in 18 min, Truck 12km away</p>
                    <p className="text-xs font-semibold text-[#555F6D]">5 min ago</p>
                  </div>
                  <button className="px-4 py-2 bg-[#FF5722] text-[#FFFFFF] text-xs font-bold rounded-lg hover:bg-[#FF7043] shrink-0">Reroute</button>
                </div>
                <div className="flex items-start justify-between bg-[#F5F5F5] p-5 rounded-xl border border-[#E0E0E0]">
                  <div className="pr-4">
                    <p className="font-bold text-[#1A1A2E] text-sm mb-1">🟡 Geofence breach — MH-1134 entered restricted zone NH-8</p>
                    <p className="text-xs font-semibold text-[#555F6D]">8 min ago</p>
                  </div>
                  <button className="px-4 py-2 border-2 border-[#1A1A2E] text-[#1A1A2E] text-xs font-bold rounded-lg hover:bg-[#1A1A2E] hover:text-[#FFFFFF] shrink-0">View</button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Fleet Utilization</h2>
              <div className="bg-[#F5F5F5] p-6 rounded-xl border border-[#E0E0E0] space-y-6">
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#1A1A2E]">Trucks On Route</span>
                    <span className="text-sm font-bold text-[#FF5722]">78%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF5722] rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#1A1A2E]">Trucks Loading</span>
                    <span className="text-sm font-bold text-[#FF9800]">12%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF9800] rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#1A1A2E]">Trucks Idle</span>
                    <span className="text-sm font-bold text-[#555F6D]">10%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#555F6D] rounded-full" style={{ width: '10%' }}></div>
                  </div>
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
