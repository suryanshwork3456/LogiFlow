const navItems = [
  { icon: "⚡", label: "Dashboard", id: "dashboard" },
  { icon: "🏍️", label: "Rider Tracking", id: "riders" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "🗺️", label: "Demand Heatmap", id: "heatmap" },
  { icon: "🏭", label: "Warehouse", id: "warehouse" },
  { icon: "🔔", label: "Alerts", id: "alerts" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

function Sidebar2({ open, onClose, activeTab, onTabChange }) {
  return (
    <>
      {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} />}
      <aside style={{ position: "fixed", top: 0, left: 0, height: "100%", width: 240, zIndex: 45, background: "#080810", borderRight: "1px solid rgba(255,255,255,0.07)", transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 60, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #fb923c, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 900 }}>S</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "white", fontWeight: 700, fontSize: 13, margin: 0, lineHeight: 1.3 }}>SwiftHaul</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, margin: 0 }}>Logistics Portal</p>
          </div>
          <button onClick={onClose} style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 13 }}>✕</button>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 12px", marginBottom: 10 }}>Navigation</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onTabChange(item.id); onClose(); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left", marginBottom: 2, background: activeTab === item.id ? "rgba(249,115,22,0.12)" : "transparent", outline: activeTab === item.id ? "1px solid rgba(249,115,22,0.2)" : "none", color: activeTab === item.id ? "white" : "rgba(255,255,255,0.4)", transition: "all 0.15s" }}
            >
              <span style={{ fontSize: 17 }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: activeTab === item.id ? 600 : 400 }}>{item.label}</span>
              {activeTab === item.id && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#fb923c" }} />}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 12, padding: "10px 14px" }}>
            <p style={{ color: "#fb923c", fontSize: 12, fontWeight: 600, margin: "0 0 2px" }}>24/7 Support</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, margin: 0 }}>+91-800-SWIFT-00</p>
          </div>
        </div>
      </aside>
    </>
  );
}
export default Sidebar2;
