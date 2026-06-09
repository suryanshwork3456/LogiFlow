// filepath: src/pages/SmartAlertsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';
import { MapPin, Navigation, AlertTriangle, Clock } from 'lucide-react';

export default function SmartAlertsPage() {
  return (
  

      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 w-full space-y-12">
        {/* SECTION A — Alert Type Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#E0E0E0] relative overflow-hidden group hover:border-[#FF5722] transition-colors">
            <div className="mb-6 bg-[#FF5722]/10 w-16 h-16 rounded-xl flex items-center justify-center">
              <MapPin size={32} className="text-[#FF5722]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Geofence Alerts</h3>
            <p className="text-[#555F6D] font-medium leading-relaxed mb-6">Instant notification when vehicle enters or exits defined zones.</p>
            <div className="bg-[#F5F5F5] rounded-lg p-4 border border-[#E0E0E0]">
              <p className="text-sm font-bold text-[#1A1A2E]">🔴 DL-7823 exited Zone B — NH-8</p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#E0E0E0] relative overflow-hidden group hover:border-[#FF5722] transition-colors">
            <div className="mb-6 bg-[#1A1A2E]/10 w-16 h-16 rounded-xl flex items-center justify-center">
              <Navigation size={32} className="text-[#1A1A2E]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Route Deviation</h3>
            <p className="text-[#555F6D] font-medium leading-relaxed mb-6">Triggered when driver deviates more than 500m from planned route.</p>
            <div className="bg-[#F5F5F5] rounded-lg p-4 border border-[#E0E0E0]">
              <p className="text-sm font-bold text-[#1A1A2E]">⚠ MH-1134 — 2.3km off route</p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#E0E0E0] relative overflow-hidden group hover:border-[#FF5722] transition-colors">
            <div className="mb-6 bg-[#FF9800]/10 w-16 h-16 rounded-xl flex items-center justify-center">
              <AlertTriangle size={32} className="text-[#FF9800]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Delay Cascade Warning</h3>
            <p className="text-[#555F6D] font-medium leading-relaxed mb-6">When one delay will impact downstream deliveries automatically.</p>
            <div className="bg-[#F5F5F5] rounded-lg p-4 border border-[#E0E0E0]">
              <p className="text-sm font-bold text-[#1A1A2E]">📢 3 deliveries at risk</p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm border border-[#E0E0E0] relative overflow-hidden group hover:border-[#FF5722] transition-colors">
            <div className="mb-6 bg-[#4CAF50]/10 w-16 h-16 rounded-xl flex items-center justify-center">
              <Clock size={32} className="text-[#4CAF50]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">SLA Breach Prevention</h3>
            <p className="text-[#555F6D] font-medium leading-relaxed mb-6">Proactive alert before SLA deadline is breached.</p>
            <div className="bg-[#F5F5F5] rounded-lg p-4 border border-[#E0E0E0]">
              <p className="text-sm font-bold text-[#1A1A2E]">🟡 Order #4421 — SLA in 18 min</p>
            </div>
          </div>
        </section>

        {/* SECTION B — Live Alert Feed */}
        <section className="bg-[#1A1A2E] rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-[#FFFFFF]">Live Alert Feed</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FF5722]/20 text-[#FF5722] rounded-full border border-[#FF5722]/30 animate-pulse">
              <span className="w-2 h-2 bg-[#FF5722] rounded-full mt-px"></span>
              <span className="text-xs font-bold uppercase">LIVE</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] gap-4">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🔴</span>
                <div>
                  <p className="text-[#FFFFFF] font-bold text-sm">Truck DL-7823 — route deviation 2.3km</p>
                  <p className="text-[#FFFFFF]/50 text-xs font-medium uppercase tracking-wider mt-1">3m ago</p>
                </div>
              </div>
              <button className="bg-[#FF5722] text-[#FFFFFF] font-bold text-xs px-5 py-2 rounded-lg hover:bg-[#FF7043] transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">Resolve</button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] gap-4">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🟡</span>
                <div>
                  <p className="text-[#FFFFFF] font-bold text-sm">Order #4421 — SLA breach in 18 min</p>
                  <p className="text-[#FFFFFF]/50 text-xs font-medium uppercase tracking-wider mt-1">5m ago</p>
                </div>
              </div>
              <button className="bg-[#FF9800] text-[#FFFFFF] font-bold text-xs px-5 py-2 rounded-lg hover:bg-[#F57C00] transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">Reroute</button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] gap-4">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🔴</span>
                <div>
                  <p className="text-[#FFFFFF] font-bold text-sm">Geofence breach — MH-1134 Zone NH-8</p>
                  <p className="text-[#FFFFFF]/50 text-xs font-medium uppercase tracking-wider mt-1">8m ago</p>
                </div>
              </div>
              <button className="border border-[rgba(255,255,255,0.2)] text-[#FFFFFF] font-bold text-xs px-5 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">View</button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.02)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)] gap-4 opacity-75">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🟢</span>
                <div>
                  <p className="text-[#FFFFFF]/80 font-bold text-sm">Truck TN-5532 — entered delivery zone</p>
                  <p className="text-[#FFFFFF]/40 text-xs font-medium uppercase tracking-wider mt-1">12m ago</p>
                </div>
              </div>
              <button className="text-[rgba(255,255,255,0.4)] font-bold text-xs px-5 py-2 rounded-lg hover:text-[#FFFFFF] transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">Dismiss</button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] gap-4">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🟡</span>
                <div>
                  <p className="text-[#FFFFFF] font-bold text-sm">DL-4521 — speed 72km/h in 50km/h zone</p>
                  <p className="text-[#FFFFFF]/50 text-xs font-medium uppercase tracking-wider mt-1">15m ago</p>
                </div>
              </div>
              <button className="border border-[#FF9800]/50 text-[#FF9800] font-bold text-xs px-5 py-2 rounded-lg hover:bg-[#FF9800]/10 transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">Warn</button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] gap-4">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🔴</span>
                <div>
                  <p className="text-[#FFFFFF] font-bold text-sm">KA-9921 — vehicle idle &gt;30 min unplanned</p>
                  <p className="text-[#FFFFFF]/50 text-xs font-medium uppercase tracking-wider mt-1">18m ago</p>
                </div>
              </div>
              <button className="border border-[rgba(255,255,255,0.2)] text-[#FFFFFF] font-bold text-xs px-5 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">Check</button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.02)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)] gap-4 opacity-75">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🟢</span>
                <div>
                  <p className="text-[#FFFFFF]/80 font-bold text-sm">MH-1134 — delivery confirmed #4418</p>
                  <p className="text-[#FFFFFF]/40 text-xs font-medium uppercase tracking-wider mt-1">22m ago</p>
                </div>
              </div>
              <button className="text-[rgba(255,255,255,0.4)] font-bold text-xs px-5 py-2 rounded-lg hover:text-[#FFFFFF] transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">View</button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[rgba(255,255,255,0.1)] gap-4">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">🟡</span>
                <div>
                  <p className="text-[#FFFFFF] font-bold text-sm">Cascade risk — 2 orders after DL-7823</p>
                  <p className="text-[#FFFFFF]/50 text-xs font-medium uppercase tracking-wider mt-1">25m ago</p>
                </div>
              </div>
              <button className="bg-[#1A1A2E] border border-[rgba(255,255,255,0.2)] text-[#FFFFFF] font-bold text-xs px-5 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors shrink-0 whitespace-nowrap self-start sm:self-center">Manage</button>
            </div>
          </div>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
          `}</style>
        </section>

        {/* SECTION C — Alert Channels */}
        <section className="bg-[#FFFFFF] rounded-2xl p-8 shadow-sm border border-[#E0E0E0]">
          <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8 text-center md:text-left">How Alerts Reach You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F5F5F5] rounded-xl p-5 border border-[#E0E0E0]">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-bold text-[#1A1A2E] mb-2">SMS</h3>
              <p className="text-[#555F6D] text-sm font-medium leading-relaxed">Instant text to driver + dispatcher</p>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-5 border border-[#E0E0E0]">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-[#1A1A2E] mb-2">WhatsApp</h3>
              <p className="text-[#555F6D] text-sm font-medium leading-relaxed">Rich message with route link</p>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-5 border border-[#E0E0E0]">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-bold text-[#1A1A2E] mb-2">Email</h3>
              <p className="text-[#555F6D] text-sm font-medium leading-relaxed">Detailed report with map snapshot</p>
            </div>
            <div className="bg-[#F5F5F5] rounded-xl p-5 border border-[#E0E0E0]">
              <div className="text-3xl mb-3">🔔</div>
              <h3 className="font-bold text-[#1A1A2E] mb-2">In-App</h3>
              <p className="text-[#555F6D] text-sm font-medium leading-relaxed">Dashboard notification + sound</p>
            </div>
          </div>
        </section>
    </div>
  );
}
