// filepath: src/pages/admin/ControlTowerPage.jsx
import React, { useMemo } from 'react';
import { Truck, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAdminFilter } from '../../context/AdminFilterContext';

// ── Rich mock data with company/city/state fields ──
const ALL_FLEET = [
  { id: 'DL-4521', driver: 'Rajan Kumar',  route: 'Sector 14 → CP',       status: 'On Route', eta: '14 min', updated: '2 min ago', company: 'Amazon',   city: 'New Delhi',  state: 'Delhi' },
  { id: 'DL-7823', driver: 'Priya Sharma', route: 'Noida → Gurgaon',       status: 'Delayed',  eta: '38 min', updated: '1 min ago', company: 'Flipkart', city: 'New Delhi',  state: 'Delhi' },
  { id: 'MH-1134', driver: 'Arjun Tiwari', route: 'Andheri → BKC',         status: 'On Route', eta: '22 min', updated: '3 min ago', company: 'Meesho',   city: 'Mumbai',     state: 'Maharashtra' },
  { id: 'KA-9921', driver: 'Meena Patel',  route: 'Whitefield → MG',       status: 'Loading',  eta: '--',     updated: '5 min ago', company: 'Amazon',   city: 'Bengaluru',  state: 'Karnataka' },
  { id: 'TN-5532', driver: 'Karan Singh',  route: 'T-Nagar → Adyar',       status: 'On Route', eta: '9 min',  updated: '1 min ago', company: 'Zomato',   city: 'Chennai',    state: 'Tamil Nadu' },
  { id: 'DL-3310', driver: 'Amit Verma',   route: 'Dwarka → Janakpuri',    status: 'On Route', eta: '18 min', updated: '4 min ago', company: 'Blinkit',  city: 'New Delhi',  state: 'Delhi' },
  { id: 'PB-1122', driver: 'Sukhwinder S', route: 'Ludhiana → Chandigarh', status: 'Delayed',  eta: '52 min', updated: '2 min ago', company: 'Flipkart', city: 'Ludhiana',   state: 'Punjab' },
  { id: 'MH-4490', driver: 'Sneha Kulkarni',route: 'Pune → Hinjewadi',     status: 'On Route', eta: '11 min', updated: '1 min ago', company: 'Amazon',   city: 'Pune',       state: 'Maharashtra' },
  { id: 'KA-5571', driver: 'Ravi Naik',    route: 'Mysuru → Hunsur',       status: 'Loading',  eta: '--',     updated: '6 min ago', company: 'Meesho',   city: 'Mysuru',     state: 'Karnataka' },
  { id: 'PB-3344', driver: 'Gurpreet K',   route: 'Amritsar → Jalandhar',  status: 'On Route', eta: '25 min', updated: '3 min ago', company: 'Zomato',   city: 'Amritsar',   state: 'Punjab' },
];

const ALL_ALERTS = [
  { id: 1, type: 'red',    msg: 'Truck DL-7823 — Route deviation detected (2.3km off planned route)', time: '3 min ago', action: 'Resolve', company: 'Flipkart', state: 'Delhi' },
  { id: 2, type: 'yellow', msg: 'SLA Risk — Order #4421 due in 18 min, Truck 12km away',              time: '5 min ago', action: 'Reroute', company: 'Amazon',   state: 'Delhi' },
  { id: 3, type: 'yellow', msg: 'Geofence breach — MH-1134 entered restricted zone NH-8',            time: '8 min ago', action: 'View',    company: 'Meesho',   state: 'Maharashtra' },
  { id: 4, type: 'red',    msg: 'Truck PB-1122 — Speed violation 78km/h in 50km/h zone',             time: '11 min ago',action: 'Warn',    company: 'Flipkart', state: 'Punjab' },
  { id: 5, type: 'red',    msg: 'KA-5571 — Idle >30 min unplanned, Whitefield zone',                 time: '15 min ago',action: 'Check',   company: 'Meesho',   state: 'Karnataka' },
];

// ── Status style helper ──
function statusStyle(status) {
  if (status === 'On Route') return 'bg-[#4CAF50]/15 text-[#4CAF50]';
  if (status === 'Delayed')  return 'bg-[#FF5722]/15 text-[#FF5722]';
  return 'bg-[#FF9800]/15 text-[#FF9800]';
}
function statusEmoji(status) {
  if (status === 'On Route') return '🟢';
  if (status === 'Delayed')  return '🔴';
  return '⏳';
}
function alertDot(type) {
  return type === 'red' ? 'bg-[#FF5722]' : 'bg-[#FF9800]';
}
function actionStyle(action) {
  if (action === 'Resolve' || action === 'Reroute' || action === 'Warn')
    return 'bg-[#FF5722] text-white hover:bg-[#FF7043]';
  return 'border-2 border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white';
}

export default function ControlTowerPage() {
  const { filters } = useAdminFilter();

  // ── Apply filters ──
  const fleet = useMemo(() => ALL_FLEET.filter(v => {
    if (filters.company !== 'All Companies' && v.company !== filters.company) return false;
    if (filters.city    !== 'All Cities'    && v.city    !== filters.city)    return false;
    if (filters.state   !== 'All States'    && v.state   !== filters.state)   return false;
    return true;
  }), [filters]);

  const alerts = useMemo(() => ALL_ALERTS.filter(a => {
    if (filters.company !== 'All Companies' && a.company !== filters.company) return false;
    if (filters.state   !== 'All States'    && a.state   !== filters.state)   return false;
    return true;
  }), [filters]);

  // ── Derived KPIs from filtered data ──
  const onRoute  = fleet.filter(v => v.status === 'On Route').length;
  const delayed  = fleet.filter(v => v.status === 'Delayed').length;
  const loading  = fleet.filter(v => v.status === 'Loading').length;
  const delivered = Math.round(fleet.length * 8.2); // mock derived number

  // ── Fleet utilization percentages ──
  const total = fleet.length || 1;
  const onRoutePct  = Math.round((onRoute / total) * 100);
  const loadingPct  = Math.round((loading / total) * 100);
  const idlePct     = 100 - onRoutePct - loadingPct;

  // ── Active filter label ──
  const filterLabel = [
    filters.company !== 'All Companies' ? filters.company : null,
    filters.city    !== 'All Cities'    ? filters.city    : null,
    filters.state   !== 'All States'    ? filters.state   : null,
  ].filter(Boolean).join(' · ');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 w-full space-y-10">

      {/* Active filter banner */}
      {filterLabel && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FF5722]/8 border border-[#FF5722]/20 rounded-xl text-sm font-bold text-[#FF5722]">
          <span>🔍</span>
          Showing data for: {filterLabel}
          <span className="ml-auto text-xs font-semibold text-[#FF5722]/60">
            {fleet.length} vehicle{fleet.length !== 1 ? 's' : ''} matched
          </span>
        </div>
      )}

      {/* SECTION A — KPI Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border-t-4 border-[#FF5722]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">{onRoute}</div>
              <div className="text-[#555F6D] font-bold text-sm">Vehicles On Route</div>
            </div>
            <div className="w-10 h-10 bg-[#FF5722]/10 rounded-full flex items-center justify-center text-[#FF5722]">
              <Truck size={20} />
            </div>
          </div>
          <div className="text-xs font-bold text-[#4CAF50]">+3 since this morning</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border-t-4 border-[#FF5722]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">{loading}</div>
              <div className="text-[#555F6D] font-bold text-sm">Awaiting Assignment</div>
            </div>
            <div className="w-10 h-10 bg-[#FF9800]/10 rounded-full flex items-center justify-center text-[#FF9800]">
              <Clock size={20} />
            </div>
          </div>
          <div className="text-xs font-bold text-[#FF9800]">
            {loading > 0 ? `${loading} high priority` : 'All assigned'}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border-t-4 border-[#FF5722]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">{delayed}</div>
              <div className="text-[#555F6D] font-bold text-sm">Currently Delayed</div>
            </div>
            <div className="w-10 h-10 bg-[#FF9800]/10 rounded-full flex items-center justify-center text-[#FF9800]">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="text-xs font-bold text-[#FF5722]">
            {delayed > 0 ? 'Avg delay: 22 min' : 'No delays ✓'}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border-t-4 border-[#FF5722]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-4xl font-extrabold text-[#1A1A2E] mb-1">{delivered}</div>
              <div className="text-[#555F6D] font-bold text-sm">Deliveries Done</div>
            </div>
            <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center text-[#4CAF50]">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="text-xs font-bold text-[#4CAF50]">↑ 12% vs yesterday</div>
        </div>
      </section>

      {/* SECTION B — Live Fleet Table */}
      <section className="bg-[#1A1A2E] rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">Live Fleet Status</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#4CAF50]/20 text-[#4CAF50] rounded-full border border-[#4CAF50]/30 animate-pulse">
            <span className="w-2 h-2 bg-[#4CAF50] rounded-full" />
            <span className="text-xs font-bold uppercase">LIVE</span>
          </div>
          <span className="ml-auto text-white/40 text-sm font-medium">
            {fleet.length} vehicle{fleet.length !== 1 ? 's' : ''}
          </span>
        </div>

        {fleet.length === 0 ? (
          <div className="text-center py-16 text-white/40 font-semibold">
            No vehicles found for selected filters
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse bg-white rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#1A1A2E] text-white text-left">
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Vehicle ID</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Driver</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Company</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Route</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Status</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">ETA</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Last Update</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {fleet.map((v, i) => (
                  <tr key={v.id} className={`border-b border-[#E0E0E0] hover:bg-[#FFF5F2] transition-colors ${i % 2 === 1 ? 'bg-[#F9F9F9]' : ''}`}>
                    <td className="py-4 px-6 font-bold text-[#1A1A2E]">{v.id}</td>
                    <td className="py-4 px-6 text-[#555F6D] font-medium">{v.driver}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-[#1A1A2E]/8 text-[#1A1A2E] text-xs font-bold rounded-lg">
                        {v.company}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#555F6D] font-medium">{v.route}</td>
                    <td className="py-4 px-6">
                      <span className={`${statusStyle(v.status)} font-bold rounded-full px-3 py-1 text-xs`}>
                        {v.status} {statusEmoji(v.status)}
                      </span>
                    </td>
                    <td className={`py-4 px-6 font-bold ${v.status === 'Delayed' ? 'text-[#FF5722]' : 'text-[#1A1A2E]'}`}>
                      {v.eta}
                    </td>
                    <td className="py-4 px-6 text-[#555F6D]">{v.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* SECTION C — Alerts + Fleet Utilization */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Active Alerts */}
          <div>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">
              Active Alerts
              {alerts.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-[#FF5722] text-white text-xs rounded-full font-bold">
                  {alerts.length}
                </span>
              )}
            </h2>
            {alerts.length === 0 ? (
              <div className="text-center py-10 text-[#555F6D] font-semibold">
                ✅ No active alerts for selected filters
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex items-start justify-between bg-[#F5F5F5] p-5 rounded-xl border border-[#E0E0E0]">
                    <div className="flex items-start gap-3 pr-4">
                      <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${alertDot(alert.type)}`} />
                      <div>
                        <p className="font-bold text-[#1A1A2E] text-sm mb-1">{alert.msg}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-[#555F6D]">{alert.time}</p>
                          <span className="text-xs font-bold text-[#1A1A2E]/40">·</span>
                          <p className="text-xs font-bold text-[#FF5722]">{alert.company}</p>
                        </div>
                      </div>
                    </div>
                    <button className={`px-4 py-2 text-xs font-bold rounded-lg shrink-0 transition-all ${actionStyle(alert.action)}`}>
                      {alert.action}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fleet Utilization */}
          <div>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Fleet Utilization</h2>
            <div className="bg-[#F5F5F5] p-6 rounded-xl border border-[#E0E0E0] space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-[#1A1A2E]">Trucks On Route</span>
                  <span className="text-sm font-bold text-[#FF5722]">{onRoutePct}%</span>
                </div>
                <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF5722] rounded-full transition-all duration-500" style={{ width: `${onRoutePct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-[#1A1A2E]">Trucks Loading</span>
                  <span className="text-sm font-bold text-[#FF9800]">{loadingPct}%</span>
                </div>
                <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9800] rounded-full transition-all duration-500" style={{ width: `${loadingPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-[#1A1A2E]">Trucks Idle</span>
                  <span className="text-sm font-bold text-[#555F6D]">{idlePct}%</span>
                </div>
                <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#555F6D] rounded-full transition-all duration-500" style={{ width: `${idlePct}%` }} />
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#E0E0E0]">
                <div className="text-center">
                  <div className="text-lg font-extrabold text-[#1A1A2E]">{fleet.length}</div>
                  <div className="text-xs text-[#555F6D] font-semibold">Total Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-extrabold text-[#4CAF50]">{onRoute}</div>
                  <div className="text-xs text-[#555F6D] font-semibold">Active Now</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-extrabold text-[#FF5722]">{delayed}</div>
                  <div className="text-xs text-[#555F6D] font-semibold">Delayed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}