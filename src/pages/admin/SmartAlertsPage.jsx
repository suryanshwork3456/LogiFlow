// filepath: src/pages/SmartAlertsPage.jsx
import React, { useState, useMemo } from 'react';
import { MapPin, Navigation, AlertTriangle, Clock } from 'lucide-react';
import { useAdminFilter } from '../../context/AdminFilterContext';

// ─── Mock Alert Data ───────────────────────────────────────────────────────────
const ALL_ALERTS = [
  {
    id: 1, type: 'critical', emoji: '🔴',
    vehicle: 'DL-7823', driver: 'Priya Sharma',
    company: 'Flipkart', city: 'New Delhi', state: 'Delhi',
    message: 'Route deviation detected — 2.3km off NH-8',
    time: '3m ago', action: 'Resolve',
    route: { from: 'Noida', to: 'Gurgaon' }, severity: 'high',
    alertCategory: 'deviation',
  },
  {
    id: 2, type: 'sla', emoji: '🟡',
    vehicle: 'MH-1134', driver: 'Rahul Verma',
    company: 'Amazon', city: 'Mumbai', state: 'Maharashtra',
    message: 'Order #4421 — SLA breach in 18 min',
    time: '5m ago', action: 'Reroute',
    route: { from: 'Thane', to: 'Andheri' }, severity: 'high',
    alertCategory: 'sla',
  },
  {
    id: 3, type: 'critical', emoji: '🔴',
    vehicle: 'KA-9921', driver: 'Sneha Rao',
    company: 'Meesho', city: 'Bengaluru', state: 'Karnataka',
    message: 'Geofence breach — exited Zone B on ORR',
    time: '8m ago', action: 'View',
    route: { from: 'Whitefield', to: 'Koramangala' }, severity: 'high',
    alertCategory: 'geofence',
  },
  {
    id: 4, type: 'resolved', emoji: '🟢',
    vehicle: 'TN-5532', driver: 'Arjun Nair',
    company: 'Zomato', city: 'Chennai', state: 'Tamil Nadu',
    message: 'Delivery confirmed — Order #6612 completed',
    time: '12m ago', action: 'Dismiss',
    route: { from: 'Anna Nagar', to: 'T. Nagar' }, severity: 'low',
    alertCategory: 'geofence',
  },
  {
    id: 5, type: 'critical', emoji: '🔴',
    vehicle: 'DL-4521', driver: 'Mohan Das',
    company: 'Amazon', city: 'New Delhi', state: 'Delhi',
    message: 'Speed violation — 72km/h in 50km/h zone',
    time: '15m ago', action: 'Warn',
    route: { from: 'Dwarka', to: 'Connaught Place' }, severity: 'high',
    alertCategory: 'deviation',
  },
  {
    id: 6, type: 'sla', emoji: '🟡',
    vehicle: 'PB-1122', driver: 'Gurpreet Singh',
    company: 'Blinkit', city: 'Chandigarh', state: 'Punjab',
    message: 'SLA at risk — Order #9981 expires in 22 min',
    time: '17m ago', action: 'Reroute',
    route: { from: 'Sector 17', to: 'Sector 35' }, severity: 'medium',
    alertCategory: 'sla',
  },
  {
    id: 7, type: 'critical', emoji: '🔴',
    vehicle: 'KA-5571', driver: 'Deepa Iyer',
    company: 'Flipkart', city: 'Bengaluru', state: 'Karnataka',
    message: 'Vehicle idle >30 min — unplanned stop detected',
    time: '18m ago', action: 'Check',
    route: { from: 'Electronic City', to: 'HSR Layout' }, severity: 'medium',
    alertCategory: 'deviation',
  },
  {
    id: 8, type: 'resolved', emoji: '🟢',
    vehicle: 'MH-4490', driver: 'Vikram Patil',
    company: 'Meesho', city: 'Mumbai', state: 'Maharashtra',
    message: 'Delivery confirmed — Order #4418 on time',
    time: '22m ago', action: 'Dismiss',
    route: { from: 'Bandra', to: 'Powai' }, severity: 'low',
    alertCategory: 'geofence',
  },
  {
    id: 9, type: 'sla', emoji: '🟡',
    vehicle: 'DL-3310', driver: 'Neha Gupta',
    company: 'Zomato', city: 'New Delhi', state: 'Delhi',
    message: 'Cascade risk — 2 orders delayed after DL-7823',
    time: '25m ago', action: 'Manage',
    route: { from: 'Rohini', to: 'Saket' }, severity: 'medium',
    alertCategory: 'sla',
  },
  {
    id: 10, type: 'sla', emoji: '🟡',
    vehicle: 'PB-3344', driver: 'Harjeet Kaur',
    company: 'Amazon', city: 'Chandigarh', state: 'Punjab',
    message: 'Order #5502 — 3 downstream deliveries at risk',
    time: '28m ago', action: 'Manage',
    route: { from: 'Mohali', to: 'Panchkula' }, severity: 'medium',
    alertCategory: 'sla',
  },
  {
    id: 11, type: 'critical', emoji: '🔴',
    vehicle: 'TN-5532', driver: 'Arjun Nair',
    company: 'Blinkit', city: 'Chennai', state: 'Tamil Nadu',
    message: 'Geofence breach — TN-5532 entered restricted zone',
    time: '32m ago', action: 'View',
    route: { from: 'Velachery', to: 'Tambaram' }, severity: 'high',
    alertCategory: 'geofence',
  },
  {
    id: 12, type: 'sla', emoji: '🟡',
    vehicle: 'MH-1134', driver: 'Rahul Verma',
    company: 'Flipkart', city: 'Mumbai', state: 'Maharashtra',
    message: 'Speed alert — 68km/h in 40km/h zone near school',
    time: '38m ago', action: 'Warn',
    route: { from: 'Dadar', to: 'Worli' }, severity: 'medium',
    alertCategory: 'deviation',
  },
];

// SVG vehicle positions (static layout across grid)
const VEHICLE_POSITIONS = {
  'DL-7823': { x: 80,  y: 120, status: 'deviated' },
  'MH-1134': { x: 220, y: 80,  status: 'sla' },
  'KA-9921': { x: 310, y: 200, status: 'critical' },
  'TN-5532': { x: 150, y: 320, status: 'resolved' },
  'DL-4521': { x: 60,  y: 380, status: 'critical' },
  'PB-1122': { x: 340, y: 380, status: 'sla' },
  'KA-5571': { x: 260, y: 300, status: 'critical' },
  'MH-4490': { x: 120, y: 220, status: 'resolved' },
};

const STATUS_COLOR = {
  critical:  '#FF5722',
  deviated:  '#ef4444',
  sla:       '#FF9800',
  resolved:  '#4CAF50',
};

// ─── Action button style helper ────────────────────────────────────────────────
function actionStyle(action) {
  const base = 'font-bold text-xs px-4 py-1.5 rounded-lg transition-colors shrink-0 whitespace-nowrap';
  switch (action) {
    case 'Resolve': return `${base} bg-[#FF5722] text-white hover:bg-[#FF7043]`;
    case 'Reroute': return `${base} bg-[#FF9800] text-white hover:bg-[#F57C00]`;
    case 'Warn':    return `${base} border border-[#FF9800]/60 text-[#FF9800] hover:bg-[#FF9800]/10`;
    case 'Manage':  return `${base} border border-white/20 text-white hover:bg-white/10`;
    case 'Dismiss': return `${base} text-white/40 hover:text-white`;
    default:        return `${base} border border-white/20 text-white hover:bg-white/10`;
  }
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function SmartAlertsPage() {
  const { filters } = useAdminFilter();
  const [feedTab, setFeedTab] = useState('all');

  // ── Global filter applied to all data ──────────────────────────────────────
  const filteredAlerts = useMemo(() => {
    return ALL_ALERTS.filter(a => {
      if (filters.company !== 'All Companies' && a.company !== filters.company) return false;
      if (filters.state   !== 'All States'    && a.state   !== filters.state)   return false;
      if (filters.city    !== 'All Cities'    && a.city    !== filters.city)     return false;
      return true;
    });
  }, [filters]);

  const isFiltered =
    filters.company !== 'All Companies' ||
    filters.state   !== 'All States'    ||
    filters.city    !== 'All Cities';

  // ── KPI derivations ────────────────────────────────────────────────────────
  const criticalCount   = filteredAlerts.filter(a => a.type === 'critical').length;
  const slaRiskCount    = filteredAlerts.filter(a => a.type === 'sla').length;
  const deviationCount  = filteredAlerts.filter(a => a.alertCategory === 'deviation').length;
  const resolvedCount   = filteredAlerts.filter(a => a.type === 'resolved').length;

  // ── Category counts ────────────────────────────────────────────────────────
  const geofenceCount  = filteredAlerts.filter(a => a.alertCategory === 'geofence').length;
  const deviCountCat   = filteredAlerts.filter(a => a.alertCategory === 'deviation').length;
  const cascadeCount   = filteredAlerts.filter(a => a.type === 'sla').length;
  const slaCount       = filteredAlerts.filter(a => a.type === 'sla').length;

  // Most recent per category
  const recentGeofence  = filteredAlerts.find(a => a.alertCategory === 'geofence');
  const recentDeviation = filteredAlerts.find(a => a.alertCategory === 'deviation');

  // ── Feed tab filter ────────────────────────────────────────────────────────
  const feedAlerts = useMemo(() => {
    if (feedTab === 'all') return filteredAlerts;
    if (feedTab === 'critical') return filteredAlerts.filter(a => a.type === 'critical');
    if (feedTab === 'sla')      return filteredAlerts.filter(a => a.type === 'sla');
    if (feedTab === 'geofence') return filteredAlerts.filter(a => a.alertCategory === 'geofence');
    if (feedTab === 'deviation')return filteredAlerts.filter(a => a.alertCategory === 'deviation');
    return filteredAlerts;
  }, [filteredAlerts, feedTab]);

  // ── Map: vehicles from filtered data ──────────────────────────────────────
  const mapVehicles = useMemo(() => {
    const vehicles = [...new Set(filteredAlerts.map(a => a.vehicle))];
    return vehicles.map(v => ({
      id: v,
      pos: VEHICLE_POSITIONS[v] || { x: 200, y: 250, status: 'resolved' },
      alert: filteredAlerts.find(a => a.vehicle === v),
    }));
  }, [filteredAlerts]);

  // ── Active filter label ────────────────────────────────────────────────────
  const filterParts = [];
  if (filters.company !== 'All Companies') filterParts.push(filters.company);
  if (filters.state   !== 'All States')    filterParts.push(filters.state);
  if (filters.city    !== 'All Cities')    filterParts.push(filters.city);

  const FEED_TABS = ['all', 'critical', 'sla', 'geofence', 'deviation'];
  const TAB_LABELS = { all: 'All', critical: 'Critical', sla: 'SLA Risk', geofence: 'Geofence', deviation: 'Deviation' };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 w-full space-y-10">

      {/* ── Active Filter Banner ─────────────────────────────────────────── */}
      {isFiltered && (
        <div className="bg-[#1A1A2E] border border-[#FF5722]/30 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-base">🔍</span>
          <p className="text-white text-sm font-medium">
            Showing alerts for:{' '}
            <span className="text-[#FF9800] font-bold">{filterParts.join(' · ')}</span>
            {' '}—{' '}
            <span className="text-[#4CAF50] font-bold">{filteredAlerts.length} alerts matched</span>
          </p>
        </div>
      )}

      {/* ── SECTION 1: KPI Cards ─────────────────────────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Critical Alerts',
            value: criticalCount,
            sub: 'Requires immediate action',
            accent: '#FF5722',
            valueColor: 'text-[#FF5722]',
          },
          {
            label: 'SLA At Risk',
            value: slaRiskCount,
            sub: 'Breach in <30 min',
            accent: '#FF9800',
            valueColor: 'text-[#FF9800]',
          },
          {
            label: 'Route Deviations',
            value: deviationCount,
            sub: 'Avg 1.8km off route',
            accent: '#1A1A2E',
            valueColor: 'text-[#1A1A2E]',
          },
          {
            label: 'Resolved Today',
            value: resolvedCount,
            sub: '↑ 23% vs yesterday',
            subColor: 'text-[#4CAF50]',
            accent: '#4CAF50',
            valueColor: 'text-[#4CAF50]',
          },
        ].map(card => (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow-sm p-5 border-t-4"
            style={{ borderTopColor: card.accent }}
          >
            <p className="text-xs font-semibold text-[#555F6D] uppercase tracking-wider mb-2">{card.label}</p>
            <p className={`text-4xl font-black mb-1 ${card.valueColor}`}>{card.value}</p>
            <p className={`text-xs font-medium ${card.subColor || 'text-[#555F6D]'}`}>{card.sub}</p>
          </div>
        ))}
      </section>

      {/* ── SECTION 2: Alert Category Cards ─────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Geofence */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E0E0] hover:border-[#FF5722] transition-colors relative">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#FF5722]/10 w-12 h-12 rounded-xl flex items-center justify-center">
              <MapPin size={24} className="text-[#FF5722]" />
            </div>
            {geofenceCount > 0 && (
              <span className="bg-[#FF5722] text-white text-xs font-black px-2.5 py-1 rounded-full">
                {geofenceCount} active
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Geofence Alerts</h3>
          <p className="text-sm text-[#555F6D] leading-relaxed mb-4">
            Instant notification when vehicle enters or exits defined zones.
          </p>
          <div className="bg-[#1A1A2E] rounded-lg p-3 mb-3">
            <p className="text-white text-xs font-bold">
              {recentGeofence
                ? `🔴 ${recentGeofence.vehicle} — ${recentGeofence.message}`
                : '✅ No active geofence alerts'}
            </p>
            {recentGeofence && (
              <p className="text-white/40 text-xs mt-1">{recentGeofence.driver} · {recentGeofence.city} · {recentGeofence.time}</p>
            )}
          </div>
          <div className="flex gap-4 text-xs text-[#555F6D]">
            <span>Today: <strong className="text-[#1A1A2E]">{geofenceCount} triggers</strong></span>
            <span>Zones monitored: <strong className="text-[#1A1A2E]">24</strong></span>
          </div>
        </div>

        {/* Route Deviation */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E0E0] hover:border-[#1A1A2E] transition-colors relative">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#1A1A2E]/10 w-12 h-12 rounded-xl flex items-center justify-center">
              <Navigation size={24} className="text-[#1A1A2E]" />
            </div>
            {deviCountCat > 0 && (
              <span className="bg-[#1A1A2E] text-white text-xs font-black px-2.5 py-1 rounded-full">
                {deviCountCat} active
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Route Deviation</h3>
          <p className="text-sm text-[#555F6D] leading-relaxed mb-4">
            Triggered when driver deviates more than 500m from the planned route.
          </p>
          <div className="bg-[#1A1A2E] rounded-lg p-3 mb-3">
            <p className="text-white text-xs font-bold">
              {recentDeviation
                ? `⚠️ ${recentDeviation.vehicle} — ${recentDeviation.message}`
                : '✅ No active deviations'}
            </p>
            {recentDeviation && (
              <p className="text-white/40 text-xs mt-1">{recentDeviation.driver} · {recentDeviation.city} · {recentDeviation.time}</p>
            )}
          </div>
          <div className="flex gap-4 text-xs text-[#555F6D]">
            <span>Avg deviation: <strong className="text-[#1A1A2E]">1.8km</strong></span>
            <span>Auto-reroute: <strong className="text-[#4CAF50]">ON</strong></span>
          </div>
        </div>

        {/* Delay Cascade */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E0E0] hover:border-[#FF9800] transition-colors relative">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#FF9800]/10 w-12 h-12 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} className="text-[#FF9800]" />
            </div>
            {cascadeCount > 0 && (
              <span className="bg-[#FF9800] text-white text-xs font-black px-2.5 py-1 rounded-full">
                {cascadeCount} active
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Delay Cascade Warning</h3>
          <p className="text-sm text-[#555F6D] leading-relaxed mb-4">
            One delay ripples into downstream deliveries automatically.
          </p>
          <div className="bg-[#1A1A2E] rounded-lg p-3 mb-3">
            <p className="text-white text-xs font-bold">📢 3 deliveries at risk after DL-7823 delay</p>
            <p className="text-white/40 text-xs mt-1">Noida → Gurgaon corridor · 8m ago</p>
          </div>
          <div className="flex gap-4 text-xs text-[#555F6D]">
            <span>Cascade depth: <strong className="text-[#1A1A2E]">3 orders</strong></span>
            <span>Risk window: <strong className="text-[#FF9800]">45 min</strong></span>
          </div>
        </div>

        {/* SLA Breach Prevention */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E0E0] hover:border-[#4CAF50] transition-colors relative">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#4CAF50]/10 w-12 h-12 rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-[#4CAF50]" />
            </div>
            {slaCount > 0 && (
              <span className="bg-[#4CAF50] text-white text-xs font-black px-2.5 py-1 rounded-full">
                {slaCount} active
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">SLA Breach Prevention</h3>
          <p className="text-sm text-[#555F6D] leading-relaxed mb-4">
            Proactive alert 30 min before SLA deadline is breached.
          </p>
          <div className="bg-[#1A1A2E] rounded-lg p-3 mb-3">
            <p className="text-white text-xs font-bold">🟡 Order #4421 — SLA in 18 min</p>
            <p className="text-white/40 text-xs mt-1">MH-1134 · Mumbai · Rahul Verma</p>
          </div>
          <div className="flex gap-4 text-xs text-[#555F6D]">
            <span>SLA compliance: <strong className="text-[#4CAF50]">94.2%</strong></span>
            <span>Breaches prevented: <strong className="text-[#1A1A2E]">12 today</strong></span>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Live Feed + Route Map ─────────────────────────────── */}
      <section className="flex flex-col lg:flex-row gap-6">

        {/* LEFT: Live Alert Feed */}
        <div className="lg:w-[60%] bg-[#1A1A2E] rounded-2xl p-6 shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-white">Live Alert Feed</h2>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FF5722]/20 text-[#FF5722] rounded-full border border-[#FF5722]/30 animate-pulse">
              <span className="w-1.5 h-1.5 bg-[#FF5722] rounded-full"></span>
              <span className="text-xs font-black uppercase">LIVE</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-4 flex-wrap">
            {FEED_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setFeedTab(tab)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  feedTab === tab
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>

          {/* Feed list */}
          <div className="flex-1 overflow-y-auto max-h-[540px] space-y-2 pr-1 custom-scrollbar">
            {feedAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-4xl mb-3">✅</span>
                <p className="text-white/60 font-medium">No alerts for selected filters</p>
              </div>
            ) : (
              feedAlerts.map(alert => {
                const dotColor =
                  alert.severity === 'high' ? 'bg-[#FF5722]' :
                  alert.severity === 'medium' ? 'bg-[#FF9800]' : 'bg-[#4CAF50]';
                return (
                  <div
                    key={alert.id}
                    className="flex items-start justify-between bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor}`}></span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-sm">{alert.emoji}</span>
                          <p className="text-white font-bold text-sm leading-tight">{alert.message}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          <span className="bg-[#FF5722]/20 text-[#FF9800] text-xs font-bold px-2 py-0.5 rounded-full">
                            {alert.company}
                          </span>
                          <span className="text-white/50 text-xs">{alert.city}</span>
                          <span className="text-white/40 text-xs">·</span>
                          <span className="text-white/50 text-xs">{alert.driver} · {alert.vehicle}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-white/40 text-xs whitespace-nowrap">{alert.time}</span>
                      <button className={actionStyle(alert.action)}>{alert.action}</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
          `}</style>
        </div>

        {/* RIGHT: Route Map */}
        <div className="lg:w-[40%] bg-[#1A1A2E] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Route Overview</h2>
            <span className="text-xs text-white/40">{mapVehicles.length} vehicles</span>
          </div>

          {mapVehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="text-4xl mb-3">✅</span>
              <p className="text-white/60 font-medium">No vehicles for selected filters</p>
            </div>
          ) : (
            <svg viewBox="0 0 400 480" className="w-full rounded-xl bg-[#0F0F1A]" xmlns="http://www.w3.org/2000/svg">
              {/* Street grid */}
              {[0,60,120,180,240,300,360,420].map(y => (
                <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#ffffff0d" strokeWidth="1"/>
              ))}
              {[0,60,120,180,240,300,360,400].map(x => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="480" stroke="#ffffff0d" strokeWidth="1"/>
              ))}

              {/* Safe zone (orange, semi-transparent) */}
              <circle cx="190" cy="190" r="70" fill="#FF572218" stroke="#FF572240" strokeWidth="1.5" strokeDasharray="6 3"/>
              <text x="190" y="132" fill="#FF572280" fontSize="9" textAnchor="middle" fontFamily="monospace">SAFE ZONE A</text>

              {/* Restricted zone (red) */}
              <circle cx="310" cy="120" r="35" fill="#ef444415" stroke="#ef444440" strokeWidth="1.5" strokeDasharray="4 2"/>
              <text x="310" y="79" fill="#ef444480" fontSize="9" textAnchor="middle" fontFamily="monospace">RESTRICTED</text>

              {/* Planned routes (gray dashed) */}
              <line x1="80" y1="120" x2="220" y2="80" stroke="#ffffff20" strokeWidth="1.5" strokeDasharray="6 4"/>
              <line x1="150" y1="320" x2="60" y2="380" stroke="#ffffff20" strokeWidth="1.5" strokeDasharray="6 4"/>
              <line x1="220" y1="80" x2="310" y2="200" stroke="#ffffff20" strokeWidth="1.5" strokeDasharray="6 4"/>

              {/* Deviated route (red) */}
              <polyline points="80,120 110,155 145,130 220,80" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" opacity="0.8"/>

              {/* SLA risk route (orange) */}
              <line x1="220" y1="80" x2="340" y2="380" stroke="#FF9800" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6"/>

              {/* Vehicle markers */}
              {mapVehicles.map(({ id, pos, alert }) => {
                const color = STATUS_COLOR[pos.status] || '#4CAF50';
                return (
                  <g key={id}>
                    {/* Pulse ring */}
                    <circle cx={pos.x} cy={pos.y} r="14" fill={`${color}20`} stroke={`${color}50`} strokeWidth="1">
                      <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    {/* Core dot */}
                    <circle cx={pos.x} cy={pos.y} r="6" fill={color} stroke="#1A1A2E" strokeWidth="1.5"/>
                    {/* Label */}
                    <rect x={pos.x - 22} y={pos.y - 26} width="44" height="14" rx="3" fill="#1A1A2E" opacity="0.85"/>
                    <text x={pos.x} y={pos.y - 16} fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      {id}
                    </text>
                  </g>
                );
              })}

              {/* Legend */}
              <rect x="0" y="430" width="400" height="50" fill="#0F0F1A"/>
              <circle cx="20" cy="450" r="5" fill="#FF5722"/>
              <text x="30" y="454" fill="#ffffff80" fontSize="9" fontFamily="sans-serif">On Route</text>
              <circle cx="90" cy="450" r="5" fill="#ef4444"/>
              <text x="100" y="454" fill="#ffffff80" fontSize="9" fontFamily="sans-serif">Delayed</text>
              <circle cx="155" cy="450" r="5" fill="#FF9800"/>
              <text x="165" y="454" fill="#ffffff80" fontSize="9" fontFamily="sans-serif">SLA Risk</text>
              <circle cx="225" cy="450" r="5" fill="#4CAF50"/>
              <text x="235" y="454" fill="#ffffff80" fontSize="9" fontFamily="sans-serif">Resolved</text>

              <line x1="10" y1="466" x2="30" y2="466" stroke="#ffffff40" strokeWidth="1.5"/>
              <text x="35" y="469" fill="#ffffff50" fontSize="8" fontFamily="sans-serif">Planned</text>
              <line x1="90" y1="466" x2="110" y2="466" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2"/>
              <text x="115" y="469" fill="#ffffff50" fontSize="8" fontFamily="sans-serif">Actual Path</text>
            </svg>
          )}
        </div>
      </section>

      {/* ── SECTION 4: Alert Channels ────────────────────────────────────── */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#E0E0E0]">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">How Alerts Reach You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: '📱',
              title: 'SMS',
              desc: 'Instant text to driver + dispatcher within 8 seconds.',
              stat: 'Avg delivery: 8 sec',
            },
            {
              icon: '💬',
              title: 'WhatsApp',
              desc: 'Rich message with route link + ETA update for context.',
              stat: 'Open rate: 94%',
            },
            {
              icon: '📧',
              title: 'Email',
              desc: 'Detailed PDF report with map snapshot + full timeline.',
              stat: 'Avg read: 3 min',
            },
            {
              icon: '🔔',
              title: 'In-App',
              desc: 'Dashboard notification with sound alert + badge count.',
              stat: 'Response: <2 min',
            },
          ].map(ch => (
            <div key={ch.title} className="bg-[#F5F5F5] rounded-xl p-5 border border-[#E0E0E0]">
              <div className="text-3xl mb-3">{ch.icon}</div>
              <h3 className="font-bold text-[#1A1A2E] mb-1.5">{ch.title}</h3>
              <p className="text-[#555F6D] text-sm leading-relaxed mb-3">{ch.desc}</p>
              <span className="text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 px-2 py-1 rounded-md">
                {ch.stat}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}