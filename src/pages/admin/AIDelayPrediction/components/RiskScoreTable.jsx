// src/pages/admin/AIDelayPrediction/components/RiskScoreTable.jsx
import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

const riskColors = {
  HIGH: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', border: 'border-l-red-500' },
  MEDIUM: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500', border: 'border-l-orange-400' },
  LOW: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', border: 'border-l-green-400' },
};

const slaBadge = {
  'On Track': 'bg-green-100 text-green-700',
  'At Risk': 'bg-orange-100 text-orange-700',
  'Breached': 'bg-red-100 text-red-700',
};

export default function RiskScoreTable({ routes, onRouteSelect }) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [slaFilter, setSlaFilter] = useState('All SLA');
  const [sortKey, setSortKey] = useState('riskScore');
  const [sortDir, setSortDir] = useState('desc');

  const filtered = useMemo(() => {
    let data = [...routes];
    if (riskFilter !== 'All') data = data.filter(r => r.riskLevel === riskFilter);
    if (slaFilter !== 'All SLA') data = data.filter(r => r.slaStatus === slaFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        r.route.toLowerCase().includes(q) ||
        r.driver.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      let valA, valB;
      if (sortKey === 'riskScore') { valA = a.riskScore; valB = b.riskScore; }
      else if (sortKey === 'delayMinutes') { valA = a.delayMinutes; valB = b.delayMinutes; }
      else if (sortKey === 'company') { valA = a.company; valB = b.company; }
      if (typeof valA === 'string') return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });
    return data;
  }, [routes, riskFilter, slaFilter, search, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const actionButton = (action) => {
    switch (action) {
      case 'Reroute':
        return <button className="bg-[#FF5722] text-white font-bold text-xs px-4 py-2 rounded shadow-sm hover:bg-[#FF7043] transition-colors">Reroute</button>;
      case 'Monitor':
        return <button className="border-2 border-[#1A1A2E] text-[#1A1A2E] font-bold text-xs px-4 py-2 rounded hover:bg-[#1A1A2E] hover:text-white transition-colors">Monitor</button>;
      case 'Alert':
        return <button className="border-2 border-[#FF5722] text-[#FF5722] font-bold text-xs px-4 py-2 rounded hover:bg-[#FF5722] hover:text-white transition-colors">Alert</button>;
      default:
        return <button className="border border-gray-200 text-[#555F6D] font-bold text-xs px-4 py-2 rounded opacity-50 cursor-not-allowed" disabled>None</button>;
    }
  };

  return (
    <section className="bg-[#1A1A2E] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-white">Current Route Risk Scores</h2>
          <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            LIVE
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search route, driver, company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white rounded-lg text-sm text-[#1A1A2E] placeholder-gray-400 border-none outline-none w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-gray-300 self-center mr-2">Risk:</span>
        {['All', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
          <button
            key={level}
            onClick={() => setRiskFilter(level)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              riskFilter === level
                ? 'bg-white text-[#1A1A2E]'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {level === 'All' ? 'All' : level}
          </button>
        ))}
        <span className="text-sm text-gray-300 self-center ml-4 mr-2">SLA:</span>
        {['All SLA', 'At Risk', 'Breached'].map(sla => (
          <button
            key={sla}
            onClick={() => setSlaFilter(sla)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              slaFilter === sla
                ? 'bg-white text-[#1A1A2E]'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {sla}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-xs text-gray-300">
          <span>Sort by:</span>
          <button onClick={() => toggleSort('riskScore')} className="underline underline-offset-2">Risk Score {sortKey==='riskScore' && (sortDir==='desc'?'↓':'↑')}</button>
          <span>|</span>
          <button onClick={() => toggleSort('delayMinutes')} className="underline underline-offset-2">Delay {sortKey==='delayMinutes' && (sortDir==='desc'?'↓':'↑')}</button>
          <span>|</span>
          <button onClick={() => toggleSort('company')} className="underline underline-offset-2">Company {sortKey==='company' && (sortDir==='desc'?'↓':'↑')}</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse bg-white rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#1A1A2E] text-white text-left">
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Route</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Company</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Driver / Vehicle</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Risk Score</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Predicted Delay</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Primary Cause</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">SLA Status</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Confidence</th>
              <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-[#555F6D]">
                  No routes match your filters.
                </td>
              </tr>
            ) : (
              filtered.map(route => {
                const riskStyle = riskColors[route.riskLevel];
                return (
                  <tr
                    key={route.id}
                    onClick={() => onRouteSelect(route)}
                    className={`cursor-pointer border-b border-gray-100 transition-colors hover:bg-orange-50 ${
                      route.slaStatus === 'Breached' ? 'bg-red-50/40 border-l-4 border-l-red-500' : 
                      route.riskLevel === 'HIGH' ? 'border-l-4 border-l-red-500' : ''
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-[#1A1A2E]">{route.route}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-[#1A1A2E] text-white text-xs font-medium px-2.5 py-0.5 rounded-full">{route.company}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-[#1A1A2E]">{route.driver}</div>
                      <div className="text-xs text-[#555F6D]">{route.vehicleId}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold rounded-lg px-3 py-1.5 ${riskStyle.bg} ${riskStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${riskStyle.dot}`}></span>
                          {route.riskScore}% {route.riskLevel}
                        </span>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#FF5722]" style={{ width: `${route.riskScore}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className={`py-4 px-6 font-bold ${
                      route.riskLevel === 'HIGH' ? 'text-red-600' : 
                      route.riskLevel === 'MEDIUM' ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {route.predictedDelay}
                    </td>
                    <td className="py-4 px-6 text-[#555F6D]">{route.cause}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${slaBadge[route.slaStatus]}`}>
                        {route.slaStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-400">{route.confidence}%</td>
                    <td className="py-4 px-6 text-right" onClick={e => e.stopPropagation()}>
                      {actionButton(route.action)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}