// import React, { useState } from 'react';
// import { Search, Filter } from 'lucide-react';

// const KPIData = [
//   { title: "Active Companies", value: "12", sub: "On platform", trend: "+2 this month", trendColor: "success", icon: "🏢" },
//   { title: "Live Riders", value: "248", sub: "Right now", trend: "↑14 vs 1hr ago", trendColor: "warning", icon: "🏍️" },
//   { title: "Orders Today", value: "1,847", sub: "All companies", trend: "↑12% vs yesterday", trendColor: "success", icon: "📦" },
//   { title: "Delivered", value: "1,203", sub: "65.1% success", trend: "SLA risk: 44", trendColor: "warning", icon: "✅" },
//   { title: "In Transit", value: "412", sub: "Active now", trend: "Avg ETA: 18 min", trendColor: "info", icon: "🚚" },
//   { title: "Failed / RTO", value: "232", sub: "11.2% failure", trend: "↑3% vs yesterday", trendColor: "danger", icon: "❌" },
//   { title: "Avg Delivery Time", value: "42 min", sub: "Across all zones", trend: "↓8 min vs yesterday", trendColor: "success", icon: "⏱️" },
//   { title: "Revenue Today", value: "₹2,84,500", sub: "Gross GMV", trend: "↑₹18K vs yesterday", trendColor: "success", icon: "💰" }
// ];

// const CompanyData = [
//   { name: "Amazon Flex", riders: 68, orders: 487, delivered: 321, failed: 38, rate: 65.9, time: 38, cod: 62, fuel: "₹4,200", status: "Active" },
//   { name: "Flipkart", riders: 52, orders: 423, delivered: 289, failed: 41, rate: 68.3, time: 44, cod: 71, fuel: "₹3,800", status: "Active" },
//   { name: "Meesho", riders: 44, orders: 312, delivered: 198, failed: 52, rate: 63.4, time: 51, cod: 84, fuel: "₹2,600", status: "Warning" },
//   { name: "Zomato", riders: 38, orders: 289, delivered: 201, failed: 23, rate: 69.6, time: 29, cod: 9, fuel: "₹2,100", status: "Active" },
//   { name: "Blinkit", riders: 31, orders: 198, delivered: 152, failed: 19, rate: 76.7, time: 18, cod: 5, fuel: "₹1,900", status: "Active" },
//   { name: "AJIO", riders: 12, orders: 87, delivered: 54, failed: 18, rate: 62.0, time: 58, cod: 55, fuel: "₹800", status: "Warning" },
//   { name: "Nykaa", riders: 8, orders: 36, delivered: 27, failed: 4, rate: 75.0, time: 41, cod: 42, fuel: "₹420", status: "Active" },
//  { name: "BigBasket", riders: 6, orders: 15, delivered: 11, failed: 2, rate: 73.3, time: 22, cod: 31, fuel: "₹180", status: "Active" },
// { name: "Swiggy", riders: 29, orders: 176, delivered: 134, failed: 21, rate: 76.1, time: 24, cod: 12, fuel: "₹1,650", status: "Active" },
// { name: "Delhivery", riders: 18, orders: 134, delivered: 89, failed: 31, rate: 66.4, time: 47, cod: 38, fuel: "₹1,100", status: "Warning" },
// { name: "Shadowfax", riders: 14, orders: 98, delivered: 71, failed: 14, rate: 72.4, time: 33, cod: 22, fuel: "₹890", status: "Active" },
// { name: "Dunzo", riders: 9, orders: 54, delivered: 38, failed: 9, rate: 70.4, time: 36, cod: 44, fuel: "₹510", status: "Active" }
// ];

// const RiderData = [
//   { rank: 1, name: "Arjun Sharma", city: "Delhi", icon: "🛵", done: 34, total: 38, rating: 4.9, earnings: "₹1,240" },
//   { rank: 2, name: "Priya Mehta", city: "Mumbai", icon: "🚗", done: 31, total: 34, rating: 4.8, earnings: "₹1,100" },
//   { rank: 3, name: "Ravi Kumar", city: "Bangalore", icon: "🛵", done: 28, total: 31, rating: 4.7, earnings: "₹980" },
//   { rank: 4, name: "Neha Singh", city: "Hyderabad", icon: "🚲", done: 27, total: 30, rating: 4.9, earnings: "₹950" },
//   { rank: 5, name: "Amit Yadav", city: "Chennai", icon: "🛵", done: 25, total: 29, rating: 4.6, earnings: "₹870" },
//   { rank: 6, name: "Sunita Patel", city: "Pune", icon: "🛵", done: 23, total: 27, rating: 4.7, earnings: "₹810" }
// ];

// const StateData = [
//   { name: "Delhi", val: 487, pct: 26.4, width: "100%" },
//   { name: "Maharashtra", val: 423, pct: 22.9, width: "86.8%" },
//   { name: "Karnataka", val: 312, pct: 16.9, width: "64.0%" },
//   { name: "Tamil Nadu", val: 289, pct: 15.7, width: "59.3%" },
//   { name: "Punjab", val: 198, pct: 10.7, width: "40.6%" },
//   { name: "Telangana", val: 84, pct: 4.6, width: "17.2%" },
//   { name: "Gujarat", val: 31, pct: 1.7, width: "6.3%" },
//   { name: "Others", val: 23, pct: 1.2, width: "4.7%" }
// ];

// const FunnelData = [
//   { label: "Placed", count: "1,847", pct: "100%", bg: "#1A1A2E", w: "100%" },
//   { label: "Picked Up", count: "1,615", pct: "87.4%", bg: "#E65100", w: "87.4%" },
//   { label: "In Transit", count: "412", pct: "22.3%", bg: "#FF5722", w: "62%" },
//   { label: "Delivered", count: "1,203", pct: "65.1%", bg: "#2E7D32", w: "65.1%" },
//   { label: "Failed/RTO", count: "232", pct: "12.6%", bg: "#C62828", w: "12.6%" }
// ];

// const AlertData = [
//   { color: "danger", title: "Route deviation", meta: "DL-7823 (Amazon)", time: "3m" },
//   { color: "danger", title: "SLA breached", meta: "Order #4421 (Flipkart)", time: "5m" },
//   { color: "warning", title: "Geofence warning", meta: "MH-1134 (Meesho)", time: "8m" },
//   { color: "warning", title: "Low battery alert", meta: "Rider R-2291 (Zomato)", time: "10m" },
//   { color: "success", title: "Bulk delivery confirmed", meta: "TN-5532 (Blinkit)", time: "12m" },
//   { color: "danger", title: "COD collection failed", meta: "UP-9923 (AJIO)", time: "15m" },
//   { color: "warning", title: "High RTO cluster", meta: "Zone DL-North", time: "22m" }
// ];

// const HourlyData = [
//   { h: "8AM", v: 42 }, { h: "9AM", v: 87 }, { h: "10AM", v: 143 },
//   { h: "11AM", v: 198 }, { h: "12PM", v: 234 }, { h: "1PM", v: 267 },
//   { h: "2PM", v: 312 }, { h: "3PM", v: 298 }, { h: "4PM", v: 276 },
//   { h: "5PM", v: 187 }, { h: "6PM", v: 124 }, { h: "7PM", v: 63 }, { h: "8PM", v: 31 }
// ];

// const TrendColors = {
//   success: "bg-[#E8F5E9] text-[#2E7D32]",
//   warning: "bg-[#FFF3E0] text-[#E65100]",
//   danger: "bg-[#FFEBEE] text-[#C62828]",
//   info: "bg-[#E3F2FD] text-[#1565C0]",
// };

// export default function DashboardPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Warning'
//   const [showFilterMenu, setShowFilterMenu] = useState(false);
//   const [alerts, setAlerts] = useState(AlertData);

//   const [showAllCompanies, setShowAllCompanies] = useState(false);
  
//   const dismissAlert = (index) => setAlerts(prev => prev.filter((_, i) => i !== index));
//   const visibleCompanies = showAllCompanies ? CompanyData : CompanyData.slice(0, 8);

// const filteredCompanies = visibleCompanies
//   .filter(co => co.name.toLowerCase().includes(searchQuery.toLowerCase()))
//   .filter(co => statusFilter === 'All' ? true : co.status === statusFilter);
//   return (
//     <div className="max-w-[1024px] mx-auto p-4 space-y-3 bg-[#F0F2F5] min-h-screen font-sans text-[#1A1A2E]">
      
//       {/* SECTION 0 - COMMAND HEADER */}
//       <div className="flex justify-between items-center bg-[#1A1A2E] rounded-xl px-6 py-3 text-white shrink-0">
//         <div className="flex items-center space-x-4">
//           <div className="w-8 h-8 rounded bg-[#FF5722] flex items-center justify-center text-xl font-black shadow-sm">
//             L
//           </div>
//           <div className="flex flex-col">
//             <div className="font-bold text-lg leading-tight">LogiFlow</div>
//             <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mt-0.5">Operations Command Center</div>
//           </div>
//         </div>
        
//         <div className="flex bg-white/10 rounded-lg p-1 space-x-1">
//           <button className="px-4 py-1.5 text-[11px] font-medium rounded-md bg-[#FF5722] text-white transition-colors">Today</button>
//           <button className="px-4 py-1.5 text-[11px] font-medium rounded-md text-white/70 hover:text-white transition-colors">Last 7 Days</button>
//           <button className="px-4 py-1.5 text-[11px] font-medium rounded-md text-white/70 hover:text-white transition-colors">Last 30 Days</button>
//         </div>

//         <div className="flex items-center gap-5">
//           <div className="flex items-center space-x-2 text-[11px] font-medium">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//             <span className="text-[#E8F5E9]">LIVE · Synced 12s ago</span>
//           </div>
//           <button className="px-3 py-1.5 text-[11px] font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
//             Export Report
//           </button>
//           <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[11px] font-bold border-2 border-[#FF5722] text-[#FF5722]">
//             AS
//           </div>
//         </div>
//       </div>

//       {/* SECTION 1 - PRIMARY KPI STRIP */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 shrink-0">
//         {KPIData.map((kpi, i) => (
//           <div key={i} className="bg-white rounded-xl shadow-sm p-2.5 border-t-4 border-[#FF5722] flex flex-col justify-between">
//             <div className="flex justify-between items-start mb-1 text-[10px] text-[#555F6D]">
//               <span className="font-semibold tracking-tight">{kpi.title}</span>
//               <span className="text-sm leading-none">{kpi.icon}</span>
//             </div>
//             <div className="mb-2">
//               <div className="text-lg font-bold text-[#1A1A2E] leading-tight flex items-baseline gap-1">
//                 {kpi.value}
//                 <span className="text-[9px] text-gray-500 font-normal">{kpi.sub}</span>
//               </div>
//             </div>
//             <div className="mt-auto flex">
//               <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${TrendColors[kpi.trendColor]}`}>
//                 {kpi.trend}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* SECTION 2 - COMPANY PERFORMANCE TABLE */}
//       <div className="bg-[#1A1A2E] rounded-xl shadow-sm p-4 text-white flex flex-col shrink-0">
//         <div className="flex justify-between items-center mb-3">
//           <div className="flex items-center space-x-3">
//             <h2 className="text-sm font-bold">Company Performance Overview</h2>
//             <span className="bg-[#FF5722] text-white px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tighter uppercase">● LIVE</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="relative">
//               <Search className="w-3 h-3 absolute left-2 top-1.5 text-white/50" />
//               <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                     className="bg-white/10 border border-white/5 rounded-md py-1 pl-7 pr-3 text-[11px] text-white outline-none w-40 placeholder-white/50 focus:ring-1 focus:ring-[#FF5722]"
//               />
//             </div>
//             <div className="relative">
//   <button
//     onClick={() => setShowFilterMenu(p => !p)}
//     className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded text-[11px] hover:bg-white/10 transition-colors"
//   >
//     <Filter className="w-3 h-3" />
//     <span>Filter</span>
//     {statusFilter !== 'All' && (
//       <span className="bg-[#FF5722] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold">!</span>
//     )}
//   </button>
//   {showFilterMenu && (
//     <div className="absolute right-0 mt-1 bg-[#242438] border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden text-[11px] w-28">
//       {['All', 'Active', 'Warning'].map(opt => (
//         <button
//           key={opt}
//           onClick={() => { setStatusFilter(opt); setShowFilterMenu(false); }}
//           className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors ${statusFilter === opt ? 'text-[#FF5722] font-bold' : 'text-white/70'}`}
//         >
//           {opt}
//         </button>
//       ))}
//     </div>
//   )}
// </div>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto -mx-4 px-4">
//           <table className="w-full text-left text-[11px] whitespace-nowrap border-collapse">
//             <thead className="bg-white/5 text-gray-400 border-b border-white/10">
//               <tr>
//                 <th className="py-1.5 px-3 font-semibold">#</th>
//                 <th className="py-1.5 px-3 font-semibold">Company</th>
//                 <th className="py-1.5 px-3 font-semibold">Active Riders</th>
//                 <th className="py-1.5 px-3 font-semibold">Orders</th>
//                 <th className="py-1.5 px-3 font-semibold">Delivered</th>
//                 <th className="py-1.5 px-3 font-semibold">Failed</th>
//                 <th className="py-1.5 px-3 font-semibold">Success Rate</th>
//                 <th className="py-1.5 px-3 font-semibold">Avg Time</th>
//                 <th className="py-1.5 px-3 font-semibold">COD Split</th>
//                 <th className="py-1.5 px-3 font-semibold">Fuel Saved</th>
//                 <th className="py-1.5 px-3 font-semibold">Status</th>
//                 <th className="py-1.5 px-3"></th>
//               </tr>
//             </thead>
//              <tbody className="divide-y divide-white/5">
//   {filteredCompanies.length > 0 ? filteredCompanies.map((co, i) => (
//     <tr key={co.name} className="hover:bg-white/10 transition-colors group cursor-pointer text-white/90">
//       <td className="py-1.5 px-3 text-white/50">{i + 1}</td>
//       <td className="py-1.5 px-3 font-semibold">{co.name}</td>
//       <td className="py-1.5 px-3">{co.riders}</td>
//       <td className="py-1.5 px-3">{co.orders}</td>
//       <td className="py-1.5 px-3">{co.delivered}</td>
//       <td className="py-1.5 px-3 text-red-400">{co.failed}</td>
//       <td className="py-1.5 px-3">
//         <div className="flex items-center space-x-2">
//           <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
//             <div className="h-full bg-[#FF5722]" style={{ width: `${co.rate}%` }}></div>
//           </div>
//           <span>{co.rate}%</span>
//         </div>
//       </td>
//       <td className="py-1.5 px-3">{co.time} m</td>
//       <td className="py-1.5 px-3">{co.cod}%</td>
//       <td className="py-1.5 px-3 text-green-400">{co.fuel}</td>
//       <td className="py-1.5 px-3">
//         <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${co.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
//           {co.status}
//         </span>
//       </td>
//       <td className="py-1.5 px-3 text-right opacity-30 group-hover:opacity-100 transition-opacity">
//         →
//       </td>
//     </tr>
//   )) : (
//     <tr>
//       <td colSpan={12} className="py-6 text-center text-white/30 text-[11px]">
//         No companies match your search.
//       </td>
//     </tr>
//   )}
// </tbody>
//           </table>
//         </div>
//         <div className="mt-2 pt-2 text-center text-[10px] text-gray-500 border-t border-white/5 hover:text-white cursor-pointer transition-colors">
//           Showing 8 of 12 companies · View All →
//         </div>
//       </div>

//       {/* SECTION 3 - THREE COLUMN ROW */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 shrink-0">
        
//         {/* LEADERBOARD (40%) */}
//         <div className="col-span-1 lg:col-span-4 bg-white rounded-xl shadow-sm p-3">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-[13px] font-bold text-[#1A1A2E]">Top Riders Today</h3>
//             <a href="#" className="text-[10px] text-[#FF5722] hover:underline font-bold">See All 248 →</a>
//           </div>
//           <div className="space-y-1.5 overflow-hidden">
//             {RiderData.map((rider, i) => {
//               const pct = (rider.done / rider.total) * 100;
//               let barColor = pct > 85 ? 'bg-[#FF5722]' : pct > 70 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]';
//               return (
//                 <div key={i} className="flex flex-col gap-1">
//                   <div className="flex items-center gap-2 text-[10px]">
//                     <span className={`w-4 font-black ${rider.rank === 1 ? 'text-[#FF5722]' : rider.rank === 2 ? 'text-gray-500' : rider.rank === 3 ? 'text-gray-400' : 'text-gray-300'}`}>
//                       #{rider.rank}
//                     </span>
//                     <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${rider.rank === 1 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
//                       {rider.name.split(' ').map(n => n[0]).join('')}
//                     </div>
//                     <div className="flex-grow">
//                       <div className="font-bold truncate leading-tight text-[#1A1A2E]">{rider.name}</div>
//                       <div className="text-[8px] text-gray-500">{rider.city} {rider.icon}</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-bold text-[#1A1A2E]">{rider.done}/{rider.total}</div>
//                       <div className="text-[8px] text-yellow-600">⭐{rider.rating}</div>
//                     </div>
//                   </div>
//                   <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
//                     <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }}></div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* HEATMAP (60%) */}
//         <div className="col-span-1 lg:col-span-8 bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-[13px] font-bold text-[#1A1A2E]">Order Distribution by State</h3>
//               <span className="bg-[#F0F2F5] text-gray-500 px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">Zone View</span>
//             </div>
//             <div className="space-y-1 mt-1 text-[10px]">
//               {StateData.map((st, i) => (
//                 <div key={i} className="flex items-center">
//                   <span className="w-20 truncate">{st.name}</span>
//                   <div className="flex-grow h-2 bg-gray-50 rounded-full overflow-hidden mr-2 relative">
//                      <div className="absolute top-0 left-0 h-full bg-[#FF5722] rounded-full transition-all" style={{ width: st.width }}></div>
//                   </div>
//                   <div className="w-8 text-right font-bold shrink-0 text-[#1A1A2E]">{st.val}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="grid grid-cols-4 gap-1 mt-2">
//              <div className="bg-gray-50 p-1.5 rounded-lg text-center">
//                <div className="text-[8px] text-gray-500 uppercase">North</div>
//                <div className="text-[10px] font-bold">685</div>
//              </div>
//              <div className="bg-gray-50 p-1.5 rounded-lg text-center">
//                <div className="text-[8px] text-gray-500 uppercase">West</div>
//                <div className="text-[10px] font-bold">454</div>
//              </div>
//              <div className="bg-gray-50 p-1.5 rounded-lg text-center">
//                <div className="text-[8px] text-gray-500 uppercase">South</div>
//                <div className="text-[10px] font-bold">373</div>
//              </div>
//              <div className="bg-gray-50 p-1.5 rounded-lg text-center">
//                <div className="text-[8px] text-gray-500 uppercase">East</div>
//                <div className="text-[10px] font-bold">335</div>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* SECTION 4 - FOUR COLUMN ROW */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        
//         {/* FUNNEL */}
//         <div className="bg-white rounded-xl shadow-sm p-3">
//           <h4 className="text-[10px] font-bold text-gray-500 uppercase">Order Funnel</h4>
//           <div className="space-y-1 flex flex-col justify-center w-full mt-2">
//             {FunnelData.map((fd, i) => (
//                <div key={i} className="text-white py-1 rounded text-[9px] flex items-center px-2 transition-all shadow-sm" style={{ backgroundColor: fd.bg, width: fd.w }}>
//                   {fd.label}: {fd.count}
//                </div>
//             ))}
//           </div>
//         </div>

//         {/* REVENUE */}
//         <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
//           <div>
//             <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">Revenue Split</h4>
//             <div className="space-y-2">
//               <div className="flex flex-col gap-0.5">
//                 <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]"></span>Delivery</span><span className="font-bold text-[#1A1A2E]">₹1,84,200</span></div>
//                 <div className="flex justify-between text-[8px] text-gray-400"><span>64.8%</span><div className="w-[64%] h-0.5 bg-[#FF5722] rounded-full mt-1"></div></div>
//               </div>
//               <div className="flex flex-col gap-0.5">
//                 <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>COD Fees</span><span className="font-bold text-[#1A1A2E]">₹52,300</span></div>
//                 <div className="flex justify-between text-[8px] text-gray-400"><span>18.4%</span><div className="w-[18%] h-0.5 bg-[#F59E0B] rounded-full mt-1"></div></div>
//               </div>
//               <div className="flex flex-col gap-0.5">
//                 <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span>Surcharge</span><span className="font-bold text-[#287D32]">₹28,700</span></div>
//                 <div className="flex justify-between text-[8px] text-gray-400"><span>10.1%</span><div className="w-[10%] h-0.5 bg-[#0D9488] rounded-full mt-1"></div></div>
//               </div>
//             </div>
//           </div>
//           <div className="pt-2 mt-1 border-t border-gray-50 flex justify-between items-end">
//             <div className="text-[10px] font-bold text-gray-500">Total</div>
//             <div className="text-right leading-none">
//               <div className="text-sm font-bold text-[#1A1A2E]">₹2,84,500</div>
//             </div>
//           </div>
//         </div>

//         {/* SLA DONUT */}
//         <div className="bg-white rounded-xl shadow-sm p-3 flex gap-3 items-center">
//           <div className="flex-1">
//             <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">SLA Performance</h4>
//             <div className="flex items-center gap-3">
//               <div className="relative w-14 h-14 rounded-full flex-shrink-0" style={{ background: 'conic-gradient(#FF5722 0% 87.3%, #E65100 87.3% 89.7%, #C62828 89.7% 100%)' }}>
//                 <div className="absolute inset-[6px] bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
//                   <span className="text-[11px] font-bold text-[#1A1A2E] leading-tight">87%</span>
//                 </div>
//               </div>
//               <div className="flex-1 space-y-1 text-[8px] text-gray-600">
//                 <div className="flex justify-between"><span>✅ On Time</span><span>1,612</span></div>
//                 <div className="flex justify-between text-orange-600 font-bold"><span>⚠️ At Risk</span><span>44</span></div>
//                 <div className="flex justify-between text-red-600 font-bold"><span>❌ Breached</span><span>191</span></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CORE ALERTS */}
//         <div className="bg-[#1A1A2E] rounded-xl shadow-sm p-3 text-white flex flex-col md:col-span-2 lg:col-span-1 h-[140px] overflow-hidden">
//           <div className="flex justify-between items-center mb-2 shrink-0">
//             <h4 className="text-[11px] font-bold">Critical Alerts</h4>
//             <span className="bg-[#C62828] px-1.5 rounded text-[9px] font-bold">{alerts.length}</span>
//           </div>
//           <div className="space-y-1.5 overflow-y-auto pr-1">
//          {alerts.map((alt, i) => (
//   <div key={i} className={`border-l-2 pl-2 py-0.5 text-[9px] ${alt.color === 'danger' ? 'border-[#C62828]' : alt.color === 'warning' ? 'border-yellow-500' : 'border-green-500'}`}>
//     <div className="flex justify-between items-start">
//       <strong>{alt.title}</strong>
//       <div className="flex items-center gap-1.5 shrink-0 ml-2">
//         <span className="text-gray-500">{alt.time}</span>
//         <button
//           onClick={() => dismissAlert(i)}
//           className="text-white/20 hover:text-white/70 transition-colors leading-none"
//         >×</button>
//       </div>
//     </div>
//     <div className="text-gray-400">{alt.meta}</div>
//   </div>
// ))}
//           </div>
//         </div>

//       </div>

//       {/* SECTION 5 - FLEET + OPERATIONS ROW */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-4">
        
//         {/* FLEET UTILIZATION */}
//         <div className="md:col-span-12 lg:col-span-6 bg-white rounded-xl shadow-sm p-3">
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="text-[10px] font-bold text-gray-500 uppercase">Fleet Utilization</h4>
//             <span className="bg-[#E3F2FD] text-[#1565C0] px-1.5 py-0.5 rounded-full text-[8px] font-bold">248 vehicles</span>
//           </div>
          
//           <div className="space-y-1 mt-1">
//             {[
//               { l: "On Route", n: 183, p: 73.8, c: "bg-[#FF5722]" },
//               { l: "Loading/Pickup", n: 29, p: 11.7, c: "bg-[#E65100]" },
//               { l: "Idle/Waiting", n: 24, p: 9.7, c: "bg-gray-500" }
//             ].map((st, i) => (
//               <div key={i} className="flex justify-between text-[9px] items-center">
//                 <span>{st.l}</span>
//                 <div className="flex-1 mx-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div className={`h-full ${st.c}`} style={{ width: `${st.p}%` }}></div>
//                 </div>
//                 <span className="font-bold w-6 text-right">{st.n}</span>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-3 gap-1 mt-3">
//             <div className="bg-gray-50 p-1 text-center font-bold text-[8px] rounded">🛵 189 (76%)</div>
//             <div className="bg-gray-50 p-1 text-center font-bold text-[8px] rounded">🚗 43 (17%)</div>
//             <div className="bg-gray-50 p-1 text-center font-bold text-[8px] rounded">🚲 16 (6%)</div>
//           </div>
//         </div>

//         {/* HOURLY ORDER VOLUME */}
//         <div className="md:col-span-12 lg:col-span-6 bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="text-[10px] font-bold text-gray-500 uppercase">Hourly Volume</h4>
//             <span className="bg-[#FFF0EB] text-[#FF5722] px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wide">Peak: 2–4 PM</span>
//           </div>

//           <div className="h-16 flex items-end justify-between px-1 gap-0.5 mt-1 border-b border-gray-100 pb-1">
//              {HourlyData.map((d, i) => {
//                const isCurrent = d.h === "2PM";
//                return (
//                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
//                    <div 
//                      className={`w-full rounded-t-sm transition-all duration-300 ${isCurrent ? 'bg-[#FF5722] ring-1 ring-orange-400' : 'bg-[#FF5722]/60'}`} 
//                      style={{ height: `${(d.v / 312) * 100}%`, minHeight: '2px' }}
//                    ></div>
//                  </div>
//                )
//              })}
//           </div>

//           <div className="flex justify-between text-[7px] text-gray-400 mt-1">
//               <span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }



import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

// ─── STATIC DATA ────────────────────────────────────────────────────────────

const KPIsets = {
  Today: [
    { title: "Active Companies", value: "12",        sub: "On platform",      trend: "+2 this month",       trendColor: "success", icon: "🏢" },
    { title: "Live Riders",       value: "248",       sub: "Right now",        trend: "↑14 vs 1hr ago",      trendColor: "warning", icon: "🏍️" },
    { title: "Orders Today",      value: "1,847",     sub: "All companies",    trend: "↑12% vs yesterday",   trendColor: "success", icon: "📦" },
    { title: "Delivered",         value: "1,203",     sub: "65.1% success",    trend: "SLA risk: 44",        trendColor: "warning", icon: "✅" },
    { title: "In Transit",        value: "412",       sub: "Active now",       trend: "Avg ETA: 18 min",     trendColor: "info",    icon: "🚚" },
    { title: "Failed / RTO",      value: "232",       sub: "11.2% failure",    trend: "↑3% vs yesterday",    trendColor: "danger",  icon: "❌" },
    { title: "Avg Delivery Time", value: "42 min",    sub: "Across all zones", trend: "↓8 min vs yesterday", trendColor: "success", icon: "⏱️" },
    { title: "Revenue Today",     value: "₹2,84,500", sub: "Gross GMV",        trend: "↑₹18K vs yesterday",  trendColor: "success", icon: "💰" },
  ],
  "Last 7 Days": [
    { title: "Active Companies", value: "12",          sub: "On platform",      trend: "Stable",               trendColor: "success", icon: "🏢" },
    { title: "Live Riders",       value: "261",         sub: "Avg daily",        trend: "↑6 vs prev week",      trendColor: "success", icon: "🏍️" },
    { title: "Orders Today",      value: "11,240",      sub: "All companies",    trend: "↑8% vs last week",     trendColor: "success", icon: "📦" },
    { title: "Delivered",         value: "7,892",       sub: "70.2% success",    trend: "SLA risk: 210",        trendColor: "warning", icon: "✅" },
    { title: "In Transit",        value: "318",         sub: "Active now",       trend: "Avg ETA: 21 min",      trendColor: "info",    icon: "🚚" },
    { title: "Failed / RTO",      value: "1,104",       sub: "9.8% failure",     trend: "↓1.4% vs last week",   trendColor: "success", icon: "❌" },
    { title: "Avg Delivery Time", value: "46 min",      sub: "Across all zones", trend: "↓4 min vs last week",  trendColor: "success", icon: "⏱️" },
    { title: "Revenue Today",     value: "₹18,24,300",  sub: "Gross GMV",        trend: "↑₹92K vs last week",   trendColor: "success", icon: "💰" },
  ],
  "Last 30 Days": [
    { title: "Active Companies", value: "12",           sub: "On platform",      trend: "+1 this month",        trendColor: "success", icon: "🏢" },
    { title: "Live Riders",       value: "254",          sub: "Avg daily",        trend: "↑18 vs prev month",    trendColor: "success", icon: "🏍️" },
    { title: "Orders Today",      value: "46,820",       sub: "All companies",    trend: "↑15% vs last month",   trendColor: "success", icon: "📦" },
    { title: "Delivered",         value: "32,110",       sub: "68.6% success",    trend: "SLA risk: 980",        trendColor: "warning", icon: "✅" },
    { title: "In Transit",        value: "284",          sub: "Active now",       trend: "Avg ETA: 23 min",      trendColor: "info",    icon: "🚚" },
    { title: "Failed / RTO",      value: "4,920",        sub: "10.5% failure",    trend: "↑0.7% vs last month",  trendColor: "danger",  icon: "❌" },
    { title: "Avg Delivery Time", value: "48 min",       sub: "Across all zones", trend: "↑2 min vs last month", trendColor: "danger",  icon: "⏱️" },
    { title: "Revenue Today",     value: "₹74,80,200",   sub: "Gross GMV",        trend: "↑₹6.2L vs last month", trendColor: "success", icon: "💰" },
  ],
};

const CompanyData = [
  { name: "Amazon Flex", riders: 68, orders: 487, delivered: 321, failed: 38, rate: 65.9, time: 38, cod: 62, fuel: "₹4,200", status: "Active"  },
  { name: "Flipkart",    riders: 52, orders: 423, delivered: 289, failed: 41, rate: 68.3, time: 44, cod: 71, fuel: "₹3,800", status: "Active"  },
  { name: "Meesho",      riders: 44, orders: 312, delivered: 198, failed: 52, rate: 63.4, time: 51, cod: 84, fuel: "₹2,600", status: "Warning" },
  { name: "Zomato",      riders: 38, orders: 289, delivered: 201, failed: 23, rate: 69.6, time: 29, cod:  9, fuel: "₹2,100", status: "Active"  },
  { name: "Blinkit",     riders: 31, orders: 198, delivered: 152, failed: 19, rate: 76.7, time: 18, cod:  5, fuel: "₹1,900", status: "Active"  },
  { name: "AJIO",        riders: 12, orders:  87, delivered:  54, failed: 18, rate: 62.0, time: 58, cod: 55, fuel: "₹800",   status: "Warning" },
  { name: "Nykaa",       riders:  8, orders:  36, delivered:  27, failed:  4, rate: 75.0, time: 41, cod: 42, fuel: "₹420",   status: "Active"  },
  { name: "BigBasket",   riders:  6, orders:  15, delivered:  11, failed:  2, rate: 73.3, time: 22, cod: 31, fuel: "₹180",   status: "Active"  },
  { name: "Swiggy",      riders: 29, orders: 176, delivered: 134, failed: 21, rate: 76.1, time: 24, cod: 12, fuel: "₹1,650", status: "Active"  },
  { name: "Delhivery",   riders: 18, orders: 134, delivered:  89, failed: 31, rate: 66.4, time: 47, cod: 38, fuel: "₹1,100", status: "Warning" },
  { name: "Shadowfax",   riders: 14, orders:  98, delivered:  71, failed: 14, rate: 72.4, time: 33, cod: 22, fuel: "₹890",   status: "Active"  },
  { name: "Dunzo",       riders:  9, orders:  54, delivered:  38, failed:  9, rate: 70.4, time: 36, cod: 44, fuel: "₹510",   status: "Active"  },
];

const RiderData = [
  { rank: 1,  name: "Arjun Sharma",  city: "Delhi",     icon: "🛵", done: 34, total: 38, rating: 4.9, earnings: "₹1,240" },
  { rank: 2,  name: "Priya Mehta",   city: "Mumbai",    icon: "🚗", done: 31, total: 34, rating: 4.8, earnings: "₹1,100" },
  { rank: 3,  name: "Ravi Kumar",    city: "Bangalore", icon: "🛵", done: 28, total: 31, rating: 4.7, earnings: "₹980"   },
  { rank: 4,  name: "Neha Singh",    city: "Hyderabad", icon: "🚲", done: 27, total: 30, rating: 4.9, earnings: "₹950"   },
  { rank: 5,  name: "Amit Yadav",    city: "Chennai",   icon: "🛵", done: 25, total: 29, rating: 4.6, earnings: "₹870"   },
  { rank: 6,  name: "Sunita Patel",  city: "Pune",      icon: "🛵", done: 23, total: 27, rating: 4.7, earnings: "₹810"   },
  { rank: 7,  name: "Vikram Rao",    city: "Delhi",     icon: "🛵", done: 22, total: 26, rating: 4.5, earnings: "₹770"   },
  { rank: 8,  name: "Deepa Nair",    city: "Kochi",     icon: "🚗", done: 21, total: 25, rating: 4.6, earnings: "₹740"   },
  { rank: 9,  name: "Suresh Babu",   city: "Chennai",   icon: "🛵", done: 20, total: 24, rating: 4.4, earnings: "₹700"   },
  { rank: 10, name: "Asha Kumari",   city: "Patna",     icon: "🚲", done: 19, total: 23, rating: 4.3, earnings: "₹660"   },
  { rank: 11, name: "Mahesh Gupta",  city: "Jaipur",    icon: "🛵", done: 18, total: 22, rating: 4.5, earnings: "₹630"   },
  { rank: 12, name: "Pooja Sharma",  city: "Noida",     icon: "🚗", done: 17, total: 21, rating: 4.4, earnings: "₹590"   },
];

const StateData = [
  { name: "Delhi",       val: 487, width: "100%"  },
  { name: "Maharashtra", val: 423, width: "86.8%" },
  { name: "Karnataka",   val: 312, width: "64.0%" },
  { name: "Tamil Nadu",  val: 289, width: "59.3%" },
  { name: "Punjab",      val: 198, width: "40.6%" },
  { name: "Telangana",   val: 84,  width: "17.2%" },
  { name: "Gujarat",     val: 31,  width: "6.3%"  },
  { name: "Others",      val: 23,  width: "4.7%"  },
];

const FunnelData = [
  { label: "Placed",     count: "1,847", bg: "#1A1A2E", w: "100%"  },
  { label: "Picked Up",  count: "1,615", bg: "#E65100", w: "87.4%" },
  { label: "In Transit", count: "412",   bg: "#FF5722", w: "62%"   },
  { label: "Delivered",  count: "1,203", bg: "#2E7D32", w: "65.1%" },
  { label: "Failed/RTO", count: "232",   bg: "#C62828", w: "12.6%" },
];

const AlertDataInitial = [
  { color: "danger",  title: "Route deviation",        meta: "DL-7823 (Amazon)",      time: "3m"  },
  { color: "danger",  title: "SLA breached",           meta: "Order #4421 (Flipkart)", time: "5m"  },
  { color: "warning", title: "Geofence warning",       meta: "MH-1134 (Meesho)",      time: "8m"  },
  { color: "warning", title: "Low battery alert",      meta: "Rider R-2291 (Zomato)", time: "10m" },
  { color: "success", title: "Bulk delivery confirmed",meta: "TN-5532 (Blinkit)",     time: "12m" },
  { color: "danger",  title: "COD collection failed",  meta: "UP-9923 (AJIO)",        time: "15m" },
  { color: "warning", title: "High RTO cluster",       meta: "Zone DL-North",         time: "22m" },
];

const HourlyData = [
  { h: "8AM",  v: 42  }, { h: "9AM",  v: 87  }, { h: "10AM", v: 143 },
  { h: "11AM", v: 198 }, { h: "12PM", v: 234 }, { h: "1PM",  v: 267 },
  { h: "2PM",  v: 312 }, { h: "3PM",  v: 298 }, { h: "4PM",  v: 276 },
  { h: "5PM",  v: 187 }, { h: "6PM",  v: 124 }, { h: "7PM",  v: 63  }, { h: "8PM", v: 31 },
];

const TrendColors = {
  success: "bg-[#E8F5E9] text-[#2E7D32]",
  warning: "bg-[#FFF3E0] text-[#E65100]",
  danger:  "bg-[#FFEBEE] text-[#C62828]",
  info:    "bg-[#E3F2FD] text-[#1565C0]",
};

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function DashboardPage() {

  // ── Step 1: Date filter ──────────────────────────────────
  const [activePeriod, setActivePeriod] = useState('Today');
  const KPIData = KPIsets[activePeriod];

  // ── Step 2: Company search + status filter ───────────────
  const [searchQuery,    setSearchQuery]    = useState('');
  const [statusFilter,   setStatusFilter]   = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const visibleCompanies  = showAllCompanies => showAllCompanies ? CompanyData : CompanyData.slice(0, 8);

  // ── Step 3: View all companies toggle ────────────────────
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const filteredCompanies = (showAllCompanies ? CompanyData : CompanyData.slice(0, 8))
    .filter(co => co.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(co => statusFilter === 'All' ? true : co.status === statusFilter);

  // ── Step 4: Dismiss alerts ───────────────────────────────
  const [alerts, setAlerts] = useState(AlertDataInitial);
  const dismissAlert = (index) => setAlerts(prev => prev.filter((_, i) => i !== index));

  // ── Step 5: Riders modal ─────────────────────────────────
  const [showRidersModal, setShowRidersModal] = useState(false);

  // ────────────────────────────────────────────────────────
  return (
    <div className="max-w-[1024px] mx-auto p-4 space-y-3 bg-[#F0F2F5] min-h-screen font-sans text-[#1A1A2E]">

      {/* ── SECTION 0: HEADER ── */}
      <div className="flex justify-between items-center bg-[#1A1A2E] rounded-xl px-6 py-3 text-white shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded bg-[#FF5722] flex items-center justify-center text-xl font-black shadow-sm">L</div>
          <div className="flex flex-col">
            <div className="font-bold text-lg leading-tight">LogiFlow</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mt-0.5">Operations Command Center</div>
          </div>
        </div>

        {/* ── STEP 1: date filter buttons ── */}
        <div className="flex bg-white/10 rounded-lg p-1 space-x-1">
          {['Today', 'Last 7 Days', 'Last 30 Days'].map(period => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-4 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
                activePeriod === period
                  ? 'bg-[#FF5722] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center space-x-2 text-[11px] font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[#E8F5E9]">LIVE · Synced 12s ago</span>
          </div>
          <button className="px-3 py-1.5 text-[11px] font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
            Export Report
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[11px] font-bold border-2 border-[#FF5722] text-[#FF5722]">
            AS
          </div>
        </div>
      </div>

      {/* ── SECTION 1: KPI STRIP (reacts to date filter) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 shrink-0">
        {KPIData.map((kpi, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-2.5 border-t-4 border-[#FF5722] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-1 text-[10px] text-[#555F6D]">
              <span className="font-semibold tracking-tight">{kpi.title}</span>
              <span className="text-sm leading-none">{kpi.icon}</span>
            </div>
            <div className="mb-2">
              <div className="text-lg font-bold text-[#1A1A2E] leading-tight flex items-baseline gap-1">
                {kpi.value}
                <span className="text-[9px] text-gray-500 font-normal">{kpi.sub}</span>
              </div>
            </div>
            <div className="mt-auto flex">
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${TrendColors[kpi.trendColor]}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── SECTION 2: COMPANY TABLE ── */}
      <div className="bg-[#1A1A2E] rounded-xl shadow-sm p-4 text-white flex flex-col shrink-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-bold">Company Performance Overview</h2>
            <span className="bg-[#FF5722] text-white px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tighter uppercase">● LIVE</span>
          </div>
          <div className="flex items-center space-x-2">

            {/* ── STEP 2: Search input ── */}
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-1.5 text-white/50" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-white/10 border border-white/5 rounded-md py-1 pl-7 pr-3 text-[11px] text-white outline-none w-40 placeholder-white/50 focus:ring-1 focus:ring-[#FF5722]"
              />
            </div>

            {/* ── STEP 2: Filter dropdown ── */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(p => !p)}
                className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded text-[11px] hover:bg-white/10 transition-colors"
              >
                <Filter className="w-3 h-3" />
                <span>Filter</span>
                {statusFilter !== 'All' && (
                  <span className="bg-[#FF5722] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold">!</span>
                )}
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 mt-1 bg-[#242438] border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden text-[11px] w-28">
                  {['All', 'Active', 'Warning'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setStatusFilter(opt); setShowFilterMenu(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors ${statusFilter === opt ? 'text-[#FF5722] font-bold' : 'text-white/70'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-left text-[11px] whitespace-nowrap border-collapse">
            <thead className="bg-white/5 text-gray-400 border-b border-white/10">
              <tr>
                <th className="py-1.5 px-3 font-semibold">#</th>
                <th className="py-1.5 px-3 font-semibold">Company</th>
                <th className="py-1.5 px-3 font-semibold">Active Riders</th>
                <th className="py-1.5 px-3 font-semibold">Orders</th>
                <th className="py-1.5 px-3 font-semibold">Delivered</th>
                <th className="py-1.5 px-3 font-semibold">Failed</th>
                <th className="py-1.5 px-3 font-semibold">Success Rate</th>
                <th className="py-1.5 px-3 font-semibold">Avg Time</th>
                <th className="py-1.5 px-3 font-semibold">COD Split</th>
                <th className="py-1.5 px-3 font-semibold">Fuel Saved</th>
                <th className="py-1.5 px-3 font-semibold">Status</th>
                <th className="py-1.5 px-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCompanies.length > 0 ? filteredCompanies.map((co, i) => (
                <tr key={co.name} className="hover:bg-white/10 transition-colors group cursor-pointer text-white/90">
                  <td className="py-1.5 px-3 text-white/50">{i + 1}</td>
                  <td className="py-1.5 px-3 font-semibold">{co.name}</td>
                  <td className="py-1.5 px-3">{co.riders}</td>
                  <td className="py-1.5 px-3">{co.orders}</td>
                  <td className="py-1.5 px-3">{co.delivered}</td>
                  <td className="py-1.5 px-3 text-red-400">{co.failed}</td>
                  <td className="py-1.5 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF5722]" style={{ width: `${co.rate}%` }}></div>
                      </div>
                      <span>{co.rate}%</span>
                    </div>
                  </td>
                  <td className="py-1.5 px-3">{co.time} m</td>
                  <td className="py-1.5 px-3">{co.cod}%</td>
                  <td className="py-1.5 px-3 text-green-400">{co.fuel}</td>
                  <td className="py-1.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${co.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {co.status}
                    </span>
                  </td>
                  <td className="py-1.5 px-3 text-right opacity-30 group-hover:opacity-100 transition-opacity">→</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={12} className="py-6 text-center text-white/30 text-[11px]">
                    No companies match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── STEP 3: View all toggle ── */}
        <div
          onClick={() => setShowAllCompanies(p => !p)}
          className="mt-2 pt-2 text-center text-[10px] text-gray-500 border-t border-white/5 hover:text-white cursor-pointer transition-colors"
        >
          {showAllCompanies
            ? 'Showing all 12 companies · Show Less ↑'
            : 'Showing 8 of 12 companies · View All →'}
        </div>
      </div>

      {/* ── SECTION 3: RIDERS + STATE ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 shrink-0">

        {/* LEADERBOARD */}
        <div className="col-span-1 lg:col-span-4 bg-white rounded-xl shadow-sm p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[13px] font-bold text-[#1A1A2E]">Top Riders Today</h3>
            {/* ── STEP 5: See all riders button ── */}
            <button
              onClick={() => setShowRidersModal(true)}
              className="text-[10px] text-[#FF5722] hover:underline font-bold"
            >
              See All 248 →
            </button>
          </div>
          <div className="space-y-1.5 overflow-hidden">
            {RiderData.slice(0, 6).map((rider, i) => {
              const pct = (rider.done / rider.total) * 100;
              const barColor = pct > 85 ? 'bg-[#FF5722]' : pct > 70 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]';
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className={`w-4 font-black ${rider.rank === 1 ? 'text-[#FF5722]' : rider.rank <= 3 ? 'text-gray-500' : 'text-gray-300'}`}>
                      #{rider.rank}
                    </span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${rider.rank === 1 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                      {rider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold truncate leading-tight text-[#1A1A2E]">{rider.name}</div>
                      <div className="text-[8px] text-gray-500">{rider.city} {rider.icon}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#1A1A2E]">{rider.done}/{rider.total}</div>
                      <div className="text-[8px] text-yellow-600">⭐{rider.rating}</div>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STATE DISTRIBUTION */}
        <div className="col-span-1 lg:col-span-8 bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[13px] font-bold text-[#1A1A2E]">Order Distribution by State</h3>
              <span className="bg-[#F0F2F5] text-gray-500 px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">Zone View</span>
            </div>
            <div className="space-y-1 mt-1 text-[10px]">
              {StateData.map((st, i) => (
                <div key={i} className="flex items-center">
                  <span className="w-20 truncate">{st.name}</span>
                  <div className="flex-grow h-2 bg-gray-50 rounded-full overflow-hidden mr-2 relative">
                    <div className="absolute top-0 left-0 h-full bg-[#FF5722] rounded-full transition-all" style={{ width: st.width }}></div>
                  </div>
                  <div className="w-8 text-right font-bold shrink-0 text-[#1A1A2E]">{st.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 mt-2">
            {[["North","685"],["West","454"],["South","373"],["East","335"]].map(([z,v]) => (
              <div key={z} className="bg-gray-50 p-1.5 rounded-lg text-center">
                <div className="text-[8px] text-gray-500 uppercase">{z}</div>
                <div className="text-[10px] font-bold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 4: FUNNEL + REVENUE + SLA + ALERTS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

        {/* FUNNEL */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase">Order Funnel</h4>
          <div className="space-y-1 flex flex-col justify-center w-full mt-2">
            {FunnelData.map((fd, i) => (
              <div key={i} className="text-white py-1 rounded text-[9px] flex items-center px-2 transition-all shadow-sm" style={{ backgroundColor: fd.bg, width: fd.w }}>
                {fd.label}: {fd.count}
              </div>
            ))}
          </div>
        </div>

        {/* REVENUE */}
        <div className="bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">Revenue Split</h4>
            <div className="space-y-2">
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]"></span>Delivery</span><span className="font-bold text-[#1A1A2E]">₹1,84,200</span></div>
                <div className="flex justify-between text-[8px] text-gray-400"><span>64.8%</span><div className="w-[64%] h-0.5 bg-[#FF5722] rounded-full mt-1"></div></div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>COD Fees</span><span className="font-bold text-[#1A1A2E]">₹52,300</span></div>
                <div className="flex justify-between text-[8px] text-gray-400"><span>18.4%</span><div className="w-[18%] h-0.5 bg-[#F59E0B] rounded-full mt-1"></div></div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px]"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span>Surcharge</span><span className="font-bold text-[#287D32]">₹28,700</span></div>
                <div className="flex justify-between text-[8px] text-gray-400"><span>10.1%</span><div className="w-[10%] h-0.5 bg-[#0D9488] rounded-full mt-1"></div></div>
              </div>
            </div>
          </div>
          <div className="pt-2 mt-1 border-t border-gray-50 flex justify-between items-end">
            <div className="text-[10px] font-bold text-gray-500">Total</div>
            <div className="text-sm font-bold text-[#1A1A2E]">₹2,84,500</div>
          </div>
        </div>

        {/* SLA DONUT */}
        <div className="bg-white rounded-xl shadow-sm p-3 flex gap-3 items-center">
          <div className="flex-1">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">SLA Performance</h4>
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full flex-shrink-0" style={{ background: 'conic-gradient(#FF5722 0% 87.3%, #E65100 87.3% 89.7%, #C62828 89.7% 100%)' }}>
                <div className="absolute inset-[6px] bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-[11px] font-bold text-[#1A1A2E] leading-tight">87%</span>
                </div>
              </div>
              <div className="flex-1 space-y-1 text-[8px] text-gray-600">
                <div className="flex justify-between"><span>✅ On Time</span><span>1,612</span></div>
                <div className="flex justify-between text-orange-600 font-bold"><span>⚠️ At Risk</span><span>44</span></div>
                <div className="flex justify-between text-red-600 font-bold"><span>❌ Breached</span><span>191</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STEP 4: ALERTS with dismiss ── */}
        <div className="bg-[#1A1A2E] rounded-xl shadow-sm p-3 text-white flex flex-col md:col-span-2 lg:col-span-1 h-[140px] overflow-hidden">
          <div className="flex justify-between items-center mb-2 shrink-0">
            <h4 className="text-[11px] font-bold">Critical Alerts</h4>
            <span className="bg-[#C62828] px-1.5 rounded text-[9px] font-bold">{alerts.length}</span>
          </div>
          <div className="space-y-1.5 overflow-y-auto pr-1">
            {alerts.length === 0 ? (
              <div className="text-[9px] text-white/30 text-center pt-3">All clear ✓</div>
            ) : alerts.map((alt, i) => (
              <div key={i} className={`border-l-2 pl-2 py-0.5 text-[9px] ${alt.color === 'danger' ? 'border-[#C62828]' : alt.color === 'warning' ? 'border-yellow-500' : 'border-green-500'}`}>
                <div className="flex justify-between items-start">
                  <strong>{alt.title}</strong>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-gray-500">{alt.time}</span>
                    <button
                      onClick={() => dismissAlert(i)}
                      className="text-white/20 hover:text-white/70 transition-colors leading-none"
                    >×</button>
                  </div>
                </div>
                <div className="text-gray-400">{alt.meta}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── SECTION 5: FLEET + HOURLY ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-4">

        <div className="md:col-span-12 lg:col-span-6 bg-white rounded-xl shadow-sm p-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase">Fleet Utilization</h4>
            <span className="bg-[#E3F2FD] text-[#1565C0] px-1.5 py-0.5 rounded-full text-[8px] font-bold">248 vehicles</span>
          </div>
          <div className="space-y-1 mt-1">
            {[
              { l: "On Route",       n: 183, p: 73.8, c: "bg-[#FF5722]" },
              { l: "Loading/Pickup", n: 29,  p: 11.7, c: "bg-[#E65100]" },
              { l: "Idle/Waiting",   n: 24,  p: 9.7,  c: "bg-gray-500"  },
            ].map((st, i) => (
              <div key={i} className="flex justify-between text-[9px] items-center">
                <span>{st.l}</span>
                <div className="flex-1 mx-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${st.c}`} style={{ width: `${st.p}%` }}></div>
                </div>
                <span className="font-bold w-6 text-right">{st.n}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 mt-3">
            <div className="bg-gray-50 p-1 text-center font-bold text-[8px] rounded">🛵 189 (76%)</div>
            <div className="bg-gray-50 p-1 text-center font-bold text-[8px] rounded">🚗 43 (17%)</div>
            <div className="bg-gray-50 p-1 text-center font-bold text-[8px] rounded">🚲 16 (6%)</div>
          </div>
        </div>

        <div className="md:col-span-12 lg:col-span-6 bg-white rounded-xl shadow-sm p-3 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase">Hourly Volume</h4>
            <span className="bg-[#FFF0EB] text-[#FF5722] px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wide">Peak: 2–4 PM</span>
          </div>
          <div className="h-16 flex items-end justify-between px-1 gap-0.5 mt-1 border-b border-gray-100 pb-1">
            {HourlyData.map((d, i) => {
              const isCurrent = d.h === "2PM";
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${isCurrent ? 'bg-[#FF5722] ring-1 ring-orange-400' : 'bg-[#FF5722]/60'}`}
                    style={{ height: `${(d.v / 312) * 100}%`, minHeight: '2px' }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[7px] text-gray-400 mt-1">
            <span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span>
          </div>
        </div>
      </div>

      {/* ── STEP 5: RIDERS MODAL ── */}
      {showRidersModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setShowRidersModal(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">

            {/* Modal header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A2E]">All Riders Today</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Showing top 12 of 248 active riders</p>
              </div>
              <button
                onClick={() => setShowRidersModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-600" />
              </button>
            </div>

            {/* Modal body — scrollable rider list */}
            <div className="overflow-y-auto p-4 space-y-2">
              {RiderData.map((rider, i) => {
                const pct = (rider.done / rider.total) * 100;
                const barColor = pct > 85 ? 'bg-[#FF5722]' : pct > 70 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]';
                return (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className={`text-[11px] font-black w-6 ${rider.rank === 1 ? 'text-[#FF5722]' : rider.rank <= 3 ? 'text-gray-500' : 'text-gray-300'}`}>
                      #{rider.rank}
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${rider.rank === 1 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                      {rider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-[#1A1A2E] truncate">{rider.name}</span>
                        <span className="text-[10px] font-bold text-[#1A1A2E] shrink-0 ml-2">{rider.done}/{rider.total}</span>
                      </div>
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-[9px] text-gray-400">{rider.city} {rider.icon}</span>
                        <span className="text-[9px] text-gray-500 shrink-0 ml-2">{rider.earnings} · ⭐{rider.rating}</span>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
                        <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="text-center text-[10px] text-gray-400 pt-2">
                + 236 more riders · Connect backend to load all
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}