// filepath: src/pages/AIDelayPredictionPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Changing These bcoz now AdminLayout will handle the Navbar and Footer for all admin pages, so we don't need to import them here anymore.
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';

export default function AIDelayPredictionPage() {
  const variables = [
    "🚦 Live Traffic", "🌧 Weather Forecast", "🚗 Driver History",
    "📦 Package Count", "🛣 Road Conditions", "⏰ Time of Day",
    "🏙 Area Congestion", "⛽ Fuel Level", "🔧 Vehicle Health",
    "📍 Current Speed", "📅 Day of Week", "🏭 Warehouse Load",
    "🔄 Reroute History", "⚡ SLA Deadline"
  ];

  return (

      

      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 w-full space-y-12">
        {/* SECTION A — Prediction Dashboard */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 border border-[#E0E0E0] flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-2 bg-[#FF5722]"></div>
            <div className="relative w-32 h-32 my-6 flex items-center justify-center">
              {/* CSS Donut Ring */}
              <div className="absolute inset-0 rounded-full border-[10px] border-[#F5F5F5]"></div>
              <div className="absolute inset-0 rounded-full border-[10px] border-[#FF5722] opacity-100" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%, 50% 0, 0 0)', transform: 'rotate(-45deg)' }}></div>
              <span className="text-3xl font-extrabold text-[#1A1A2E] absolute z-10">82%</span>
            </div>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Prediction Accuracy</h3>
            <p className="text-sm font-semibold text-[#555F6D]">Across 14 input variables</p>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 flex flex-col justify-center text-center border-t-[4px] border-[#FF5722]">
            <div className="text-5xl font-extrabold text-[#1A1A2E] mb-4 tracking-tight">±4 min</div>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Average ETA Deviation</h3>
            <p className="text-sm font-semibold text-[#4CAF50]">Improved 31% in last 30 days</p>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-6 flex flex-col justify-center text-center border-t-[4px] border-[#FF5722]">
            <div className="text-5xl font-extrabold text-[#1A1A2E] mb-4 tracking-tight">247</div>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Routes Analyzed Today</h3>
            <p className="text-sm font-semibold text-[#555F6D]">Last run: 90 sec ago</p>
          </div>
        </section>

        {/* SECTION B — Live Risk Table */}
        <section className="bg-[#1A1A2E] rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden">
          <h2 className="text-2xl font-bold text-[#FFFFFF] mb-8">Current Route Risk Scores</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse bg-[#FFFFFF] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#1A1A2E] text-[#FFFFFF] text-left">
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Route</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Driver</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Risk Score</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Predicted Delay</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Cause</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#E0E0E0] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">Sector14 → CP</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Rajan K.</td>
                  <td className="py-4 px-6"><span className="bg-[#FF5722]/20 text-[#FF5722] font-bold rounded-lg px-3 py-1.5 text-xs inline-block min-w-[80px] text-center">82% 🔴 HIGH</span></td>
                  <td className="py-4 px-6 font-bold text-[#FF5722]">+24 min</td>
                  <td className="py-4 px-6 text-[#555F6D]">Traffic jam</td>
                  <td className="py-4 px-6 text-right"><button className="bg-[#FF5722] text-[#FFFFFF] font-bold text-xs px-4 py-2 rounded shadow-sm hover:bg-[#FF7043] transition-colors">Reroute</button></td>
                </tr>
                <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">Noida → Gurgaon</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Priya S.</td>
                  <td className="py-4 px-6"><span className="bg-[#FF9800]/20 text-[#FF9800] font-bold rounded-lg px-3 py-1.5 text-xs inline-block min-w-[80px] text-center">61% 🟡 MED</span></td>
                  <td className="py-4 px-6 font-bold text-[#FF9800]">+14 min</td>
                  <td className="py-4 px-6 text-[#555F6D]">Weather</td>
                  <td className="py-4 px-6 text-right"><button className="border-2 border-[#1A1A2E] text-[#1A1A2E] font-bold text-xs px-4 py-1.5 rounded hover:bg-[#1A1A2E] hover:text-[#FFFFFF] transition-colors">Monitor</button></td>
                </tr>
                <tr className="border-b border-[#E0E0E0] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">Andheri → BKC</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Arjun T.</td>
                  <td className="py-4 px-6"><span className="bg-[#4CAF50]/20 text-[#4CAF50] font-bold rounded-lg px-3 py-1.5 text-xs inline-block min-w-[80px] text-center">23% 🟢 LOW</span></td>
                  <td className="py-4 px-6 font-bold text-[#4CAF50]">On Time</td>
                  <td className="py-4 px-6 text-[#555F6D]">Clear route</td>
                  <td className="py-4 px-6 text-right"><button className="border-2 border-[#E0E0E0] text-[#555F6D] font-bold text-xs px-4 py-1.5 rounded hover:bg-[#F5F5F5] transition-colors disabled:opacity-50">None</button></td>
                </tr>
                <tr className="border-b border-[#E0E0E0] bg-[#F5F5F5] hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">Whitefield → MG</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Meena P.</td>
                  <td className="py-4 px-6"><span className="bg-[#FF9800]/20 text-[#FF9800] font-bold rounded-lg px-3 py-1.5 text-xs inline-block min-w-[80px] text-center">71% 🟡 MED</span></td>
                  <td className="py-4 px-6 font-bold text-[#FF9800]">+18 min</td>
                  <td className="py-4 px-6 text-[#555F6D]">Road work</td>
                  <td className="py-4 px-6 text-right"><button className="border-2 border-[#1A1A2E] text-[#1A1A2E] font-bold text-xs px-4 py-1.5 rounded hover:bg-[#1A1A2E] hover:text-[#FFFFFF] transition-colors">Alert</button></td>
                </tr>
                <tr className="hover:bg-[#FFF5F2] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#1A1A2E]">T-Nagar → Adyar</td>
                  <td className="py-4 px-6 text-[#555F6D] font-medium">Karan S.</td>
                  <td className="py-4 px-6"><span className="bg-[#4CAF50]/20 text-[#4CAF50] font-bold rounded-lg px-3 py-1.5 text-xs inline-block min-w-[80px] text-center">15% 🟢 LOW</span></td>
                  <td className="py-4 px-6 font-bold text-[#4CAF50]">On Time</td>
                  <td className="py-4 px-6 text-[#555F6D]">Clear route</td>
                  <td className="py-4 px-6 text-right"><button className="border-2 border-[#E0E0E0] text-[#555F6D] font-bold text-xs px-4 py-1.5 rounded hover:bg-[#F5F5F5] transition-colors disabled:opacity-50">None</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION C — Variables Panel */}
        <section className="bg-[#FFFFFF] rounded-2xl p-8 shadow-sm border border-[#E0E0E0]">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8 text-center md:text-left">14 Variables Analyzed Per Route</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {variables.map((v, i) => (
              <div key={i} className="bg-[#FFFFFF] border border-[#E0E0E0] rounded-full px-4 py-2.5 shadow-sm text-center hover:border-[#FF5722] hover:shadow-md transition-all cursor-default">
                <span className="text-sm font-bold text-[#555F6D]">{v}</span>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}
