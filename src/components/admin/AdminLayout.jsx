// filepath: src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, TrendingUp, Truck,
  Bell, Package, Menu, X, LogOut, ChevronRight,
  BarChart3, Radio
} from 'lucide-react';
import { AdminFilterProvider } from '../../context/AdminFilterContext.jsx';
import AdminFilterBar from './AdminFilterBar.jsx';

const navSections = [
  {
    label: 'Overview',
    items: [
      { icon: <LayoutDashboard size={18} />, label: 'Dashboard',         to: '/admin' },
    ]
  },
  {
    label: 'Operations',
    items: [
      { icon: <Radio size={18} />,       label: 'Control Tower',     to: '/admin/control-tower' },
      { icon: <MapPin size={18} />,      label: 'Live Tracking',     to: '/admin/live-tracking' },
      { icon: <Bell size={18} />,        label: 'Smart Alerts',      to: '/admin/smart-alerts' },
      { icon: <Package size={18} />,     label: 'Shipment Feed',     to: '/admin/shipment-feed' },
    ]
  },
  {
    label: 'Intelligence',
    items: [
      { icon: <TrendingUp size={18} />,  label: 'AI Prediction',      to: '/admin/ai-prediction' },
      { icon: <Truck size={18} />,       label: 'Route Optimization', to: '/admin/route-optimization' },
    ]
  },
  {
    label: 'Reports',
    items: [
      { icon: <BarChart3 size={18} />,   label: 'Analytics',          to: '/admin/analytics' },
    ]
  },
];

const allNavItems = navSections.flatMap(s => s.items);

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`
      fixed top-0 left-0 h-full w-64 bg-[#1A1A2E] z-40 flex flex-col
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:z-auto
    `}>

      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          Logi<span className="text-[#FF5722]">Flow</span>
        </Link>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Role badge */}
      <div className="px-6 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FF5722]/20 flex items-center justify-center text-[#FF5722] font-bold text-sm shrink-0">
            A
          </div>
          <div>
            <div className="text-white font-bold text-sm">Admin Panel</div>
            <div className="text-white/40 text-xs">LogiFlow Operations</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                    transition-all duration-200 group
                    ${isActive(item.to)
                      ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/20'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className={`shrink-0 ${isActive(item.to) ? 'text-white' : 'text-white/35 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                  {isActive(item.to) && <ChevronRight size={14} className="ml-auto shrink-0" />}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-white/10 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={18} className="text-white/35 shrink-0" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AdminFilterProvider>
      <div className="min-h-screen flex bg-[#F5F5F5]">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top bar */}
          <header className="sticky top-0 z-20 bg-white border-b border-[#E0E0E0] px-6 py-4 flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#1A1A2E] hover:text-[#FF5722] transition-colors">
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-[#1A1A2E]">
                  {allNavItems.find(n => n.to === location.pathname)?.label ?? 'Dashboard'}
                </h1>
                <p className="text-xs text-[#555F6D] font-medium">
                  LogiFlow Admin · {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full border border-[#4CAF50]/20 text-xs font-bold">
                <span className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full animate-pulse" />
                LIVE
              </div>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-bold text-[#555F6D] border border-[#E0E0E0] rounded-lg hover:border-[#FF5722] hover:text-[#FF5722] transition-all"
              >
                Logout
              </button>
            </div>
          </header>

          {/* Global Filter Bar — shows on every admin page */}
          <AdminFilterBar />

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminFilterProvider>
  );
}