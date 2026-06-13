import { useNavigate, useLocation } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import { useState } from "react";


export default function CompanyLayout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ yahan state
  const company = JSON.parse(
  localStorage.getItem("company")
  );
  const menuItems = [
    { name: "Dashboard", path: "/company/dashboard", icon: "🏢" },
    { name: "Operations", path: "/company/operations", icon: "🎯" },
    { name: "Fleet", path: "/company/map", icon: "🚚" },
    { name: "Performance", path: "/company/feedback", icon: "⭐" },
    { name: "Deliveries", path: "/company/deliveries", icon: "📦" },
    { name: "Analytics", path: "/company/analytics", icon: "📈" },
    { name: "Alerts", path: "/company/alerts", icon: "🚨" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      {/* Sidebar */}
      <aside
        className={`
          bg-[#15172D] text-white flex flex-col px-6 py-8 shadow-2xl
          transition-all duration-300
          ${sidebarOpen ? "w-72" : "w-0 overflow-hidden"}
        `}
      >
        {sidebarOpen && (
          <>
            <div>
              <h1 className="text-4xl font-bold tracking-wide">
                <span>Logi</span>
                <span className="text-[#FF5A1F]">Flow</span>
              </h1>

              <div className="mt-8">
                <h2 className="font-semibold text-xl">Company Panel</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Operations Control Center
                </p>
              </div>
            </div>

            <nav className="mt-12 space-y-3">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#FF5A1F] shadow-lg font-semibold"
                        : "hover:bg-[#22254A] text-gray-300 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto">
              <div className="bg-[#1E213F] rounded-2xl p-4 mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Current Company
                </p>
                <h3 className="font-semibold mt-2">{company?.company_name || "ABC Logistics"}</h3>
                <p className="text-sm text-green-400 mt-1">
                  ● System Operational
                </p>
              </div>

              <button
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-white transition"
              >
                ← Back to Website
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Main area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <CompanyHeader
          title={title}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)} // ✅ toggle pass
        />

        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}