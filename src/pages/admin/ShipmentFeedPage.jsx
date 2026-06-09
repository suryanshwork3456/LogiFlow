// filepath: src/pages/ShipmentFeedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';
import { Search } from 'lucide-react';

export default function ShipmentFeedPage() {
  const shipments = [
    { id: '#SHP-4421', route: 'Delhi → Mumbai', driver: 'Rajan K.', status: 'In Transit', eta: '2h 14m', progress: 75, lastUpdate: '2m ago' },
    { id: '#SHP-4420', route: 'Noida → Gurgaon', driver: 'Priya S.', status: 'Delayed', eta: '38 min', progress: 30, lastUpdate: '1m ago' },
    { id: '#SHP-4419', route: 'Andheri → BKC', driver: 'Arjun T.', status: 'Delivered ✓', eta: 'Done', progress: 100, lastUpdate: '5m ago' },
    { id: '#SHP-4418', route: 'Whitefield → MG', driver: 'Meena P.', status: 'In Transit', eta: '45 min', progress: 60, lastUpdate: '3m ago' },
    { id: '#SHP-4417', route: 'T-Nagar → Adyar', driver: 'Karan S.', status: 'Delivered ✓', eta: 'Done', progress: 100, lastUpdate: '8m ago' },
    { id: '#SHP-4416', route: 'Pune → Nashik', driver: 'Dev R.', status: 'In Transit', eta: '1h 8m', progress: 40, lastUpdate: '4m ago' },
    { id: '#SHP-4415', route: 'Hyderabad → Sec', driver: 'Asha M.', status: 'Delayed', eta: '52 min', progress: 20, lastUpdate: '2m ago' },
    { id: '#SHP-4414', route: 'Kolkata → Dum Dum', driver: 'Raj P.', status: 'Delivered ✓', eta: 'Done', progress: 100, lastUpdate: '12m ago' },
    { id: '#SHP-4413', route: 'Jaipur → Ajmer', driver: 'Sunil V.', status: 'In Transit', eta: '1h 33m', progress: 55, lastUpdate: '6m ago' },
    { id: '#SHP-4412', route: 'Chandigarh → Amr', driver: 'Bindu K.', status: 'In Transit', eta: '2h 2m', progress: 50, lastUpdate: '7m ago' },
  ];

  const getStatusColor = (status) => {
    if(status.includes('Transit')) return { bg: 'bg-[#FF5722]/15', text: 'text-[#FF5722]', bar: 'bg-[#FF5722]' };
    if(status.includes('Delayed')) return { bg: 'bg-[#FF9800]/15', text: 'text-[#FF9800]', bar: 'bg-[#FF9800]' };
    if(status.includes('Delivered')) return { bg: 'bg-[#4CAF50]/15', text: 'text-[#4CAF50]', bar: 'bg-[#4CAF50]' };
    return { bg: 'bg-[#E0E0E0]', text: 'text-[#555F6D]', bar: 'bg-[#E0E0E0]' };
  };

  return (
 

      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 w-full space-y-8">
        
        {/* SECTION C — Summary Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm border border-[#E0E0E0] text-center">
            <div className="text-3xl font-extrabold text-[#1A1A2E] mb-1">10</div>
            <div className="text-xs font-bold text-[#555F6D] uppercase tracking-wider">Total Shipments</div>
          </div>
          <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm border border-[#E0E0E0] text-center">
            <div className="text-3xl font-extrabold text-[#FF5722] mb-1">6</div>
            <div className="text-xs font-bold text-[#555F6D] uppercase tracking-wider">In Transit</div>
          </div>
          <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm border border-[#E0E0E0] text-center">
            <div className="text-3xl font-extrabold text-[#4CAF50] mb-1">3</div>
            <div className="text-xs font-bold text-[#555F6D] uppercase tracking-wider">Delivered</div>
          </div>
          <div className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm border border-[#E0E0E0] text-center bg-gradient-to-br from-[#FFFFFF] to-[#FFF8E1]">
            <div className="text-3xl font-extrabold text-[#FF9800] mb-1">2 ⚠</div>
            <div className="text-xs font-bold text-[#FF9800] uppercase tracking-wider">Delayed</div>
          </div>
        </section>

        {/* SECTION A — Filter Bar */}
        <section className="bg-[#FFFFFF] p-4 rounded-xl shadow-sm border border-[#E0E0E0] flex flex-col md:flex-row justify-between items-center gap-4 sticky top-24 z-30">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555F6D]" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID or driver" 
                className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#FF5722] focus:bg-[#FFFFFF] transition-colors"
              />
            </div>
            
            <div className="flex bg-[#F5F5F5] p-1 rounded-lg border border-[#E0E0E0] overflow-x-auto w-full sm:w-auto hide-scrollbar">
              <button className="px-4 py-1.5 bg-[#FFFFFF] shadow-sm text-[#1A1A2E] text-xs font-bold rounded-md whitespace-nowrap">All</button>
              <button className="px-4 py-1.5 text-[#555F6D] text-xs font-bold rounded-md hover:text-[#1A1A2E] whitespace-nowrap">In Transit</button>
              <button className="px-4 py-1.5 text-[#555F6D] text-xs font-bold rounded-md hover:text-[#1A1A2E] whitespace-nowrap">Delivered</button>
              <button className="px-4 py-1.5 text-[#555F6D] text-xs font-bold rounded-md hover:text-[#1A1A2E] whitespace-nowrap">Delayed</button>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto justify-end">
             <button className="px-4 py-2 border border-[#FF5722] text-[#FF5722] bg-transparent font-bold text-xs rounded-lg hover:bg-[#FF5722]/5 transition-colors whitespace-nowrap">Export CSV</button>
             <button className="px-4 py-2 border border-[#1A1A2E] text-[#1A1A2E] bg-transparent font-bold text-xs rounded-lg hover:bg-[#1A1A2E]/5 transition-colors whitespace-nowrap">Export PDF</button>
          </div>
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </section>

        {/* SECTION B — Shipment Table */}
        <section className="bg-[#FFFFFF] rounded-2xl shadow-sm border border-[#E0E0E0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse bg-[#FFFFFF]">
              <thead>
                <tr className="bg-[#1A1A2E] text-[#FFFFFF] text-left">
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Shipment ID</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Origin → Dest</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Driver</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Status</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">ETA</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider w-[180px]">Progress</th>
                  <th className="py-4 px-6 font-semibold uppercase text-xs tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {shipments.map((s, idx) => {
                  const colors = getStatusColor(s.status);
                  return (
                    <tr key={s.id} className={`${idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F5F5F5]'} border-b border-[#E0E0E0] hover:bg-[#FFF5F2] transition-colors cursor-default`}>
                      <td className="py-4 px-6 font-bold text-[#1A1A2E] whitespace-nowrap">{s.id}</td>
                      <td className="py-4 px-6 text-[#555F6D] font-medium whitespace-nowrap">{s.route}</td>
                      <td className="py-4 px-6 text-[#555F6D] font-medium whitespace-nowrap">{s.driver}</td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text} min-w-[90px] text-center`}>
                          {s.status}
                        </span>
                      </td>
                      <td className={`py-4 px-6 font-bold whitespace-nowrap ${s.eta === 'Done' ? 'text-[#4CAF50]' : (s.status.includes('Delayed') ? 'text-[#FF9800]' : 'text-[#1A1A2E]')}`}>
                        {s.eta}
                      </td>
                      <td className="py-4 px-6 align-middle">
                        <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                          <div className={`h-full ${colors.bar} rounded-full`} style={{ width: `${s.progress}%` }}></div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#555F6D] text-xs font-semibold whitespace-nowrap">{s.lastUpdate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
    </div>
  );
}
