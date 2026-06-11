import { useState } from "react";

import Navbar from "../../components/company/Navbar2";
import Sidebar from "../../components/company/Sidebar2";
import DashboardView from "../../components/company/Dashboardview";
import PlaceholderPage from "../../components/company/Placeholderpage";
import { S } from "../../styles/companystyles";

function CompanyDashboard({ company }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabContent = {
    dashboard: <DashboardView company={company} />,
    riders: <PlaceholderPage title="Rider Tracking" icon="🏍️" />,
    analytics: <PlaceholderPage title="Analytics" icon="📊" />,
    heatmap: <PlaceholderPage title="Demand Heatmap" icon="🗺️" />,
    warehouse: <PlaceholderPage title="Warehouse Management" icon="🏭" />,
    alerts: <PlaceholderPage title="Alerts" icon="🔔" />,
    settings: <PlaceholderPage title="Settings" icon="⚙️" />,
  };

   return (
    <div style={S.page}>
      <Navbar company={company} onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ paddingTop: 60, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
          {tabContent[activeTab]}
        </div>
      </main>
    </div>
  );
}

export default CompanyDashboard;
