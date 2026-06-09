
// filepath: src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, MapPin, TrendingUp, Truck,
  Bell, Package, Menu, X, LogOut, ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Control Tower',      to: '/admin/control-tower' },
  { icon: <MapPin size={20} />,         label: 'Live Tracking',       to: '/admin/live-tracking' },
  { icon: <TrendingUp size={20} />,     label: 'AI Prediction',       to: '/admin/ai-prediction' },
  { icon: <Truck size={20} />,          label: 'Route Optimization',  to: '/admin/route-optimization' },
  { icon: <Bell size={20} />,           label: 'Smart Alerts',        to: '/admin/smart-alerts' },
  { icon: <Package size={20} />,        label: 'Shipment Feed',       to: '/admin/shipment-feed' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#1A1A2E] z-40 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
            Logi<span className="text-[#FF5722]">Flow</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FF5722]/20 flex items-center justify-center text-[#FF5722] font-bold text-sm">
              A
            </div>
            <div>
              <div className="text-white font-bold text-sm">Admin Panel</div>
              <div className="text-white/40 text-xs">LogiFlow Operations</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-3 mb-4">
            Operations
          </div>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold
                transition-all duration-200 group
                ${isActive(item.to)
                  ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span className={isActive(item.to) ? 'text-white' : 'text-white/40 group-hover:text-white'}>
                {item.icon}
              </span>
              {item.label}
              {isActive(item.to) && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut size={20} className="text-white/40" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#E0E0E0] px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#1A1A2E] hover:text-[#FF5722] transition-colors"
            >
              <Menu size={24} />
            </button>
            {/* Page title derived from nav */}
            <div>
              <h1 className="text-lg font-bold text-[#1A1A2E]">
                {navItems.find(n => n.to === location.pathname)?.label ?? 'Dashboard'}
              </h1>
              <p className="text-xs text-[#555F6D] font-medium">
                LogiFlow Admin · {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live indicator */}
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

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}