import {
  dashboardStats,
  recentDeliveries,
  weeklyDeliveries,
  topRiders,
  alerts,
  heatmapData
} from "../../data/Companydata";
import { S } from "../../styles/companystyles";
function MiniBarChart() {
  const max = Math.max(...weeklyDeliveries.map((d) => d.deliveries));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70 }}>
      {weeklyDeliveries.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", height: Math.round((d.deliveries / max) * 54), background: "linear-gradient(to top, #f97316, #fb923c)", borderRadius: "4px 4px 2px 2px", opacity: 0.85 }} />
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
}
function DashboardView({ company }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero banner */}
    {/* Hero banner */}
<div
  style={{
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    padding: "28px 32px",
  }}
>
  {/* Light decorative glow */}
  <div
    style={{
      position: "absolute",
      top: -80,
      right: -80,
      width: 250,
      height: 250,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
      pointerEvents: "none",
    }}
  />

  <div
    style={{
      position: "relative",
      zIndex: 1,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
    }}
  >
    {/* Left */}
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#F97316",
          }}
        />
        <span
          style={{
            color: "#F97316",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Live Dashboard
        </span>
      </div>

      <h1
        style={{
          color: "#111827",
          fontSize: 32,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        Welcome back,{" "}
        <span
          style={{
            color: "#F97316",
          }}
        >
          {company?.name || "LogiFlow"}
        </span>
      </h1>

      <p
        style={{
          color: "#6B7280",
          fontSize: 14,
          marginTop: 8,
        }}
      >
        {new Date().toLocaleDateString()} · Operations running smoothly
      </p>
    </div>

    {/* Right Buttons */}
    <div
      style={{
        display: "flex",
        gap: 10,
      }}
    >
      <button
        style={{
          background: "#F97316",
          color: "#FFFFFF",
          border: "none",
          padding: "10px 18px",
          borderRadius: 10,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        + Add Rider
      </button>

      <button
        style={{
          background: "#111827",
          color: "#FFFFFF",
          border: "none",
          padding: "10px 18px",
          borderRadius: 10,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Export Report
      </button>
    </div>
  </div>
</div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
        {dashboardStats.map((stat, i) => {
          const c = S.statColors[stat.color];
          return (
            <div key={i} style={{ ...S.card, borderColor: c.border, background: `linear-gradient(135deg, ${c.grad}, rgba(255,255,255,0.02))`, padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{stat.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.text, background: "rgba(0,0,0,0.25)", borderRadius: 6, padding: "2px 8px" }}>{stat.change}</span>
              </div>
              <p style={{ color:  "#111827", fontSize: 26, fontWeight: 900, margin: 0 }}>{stat.value}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "4px 0 0" }}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Weekly */}
        <div style={{ ...S.card, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <p style={{ color:  "#111827", fontWeight: 700, fontSize: 14, margin: 0 }}>Weekly Deliveries</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "3px 0 0" }}>This week's performance</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: "#f97316" }} />
              <span style={{ color: "#6B7280", fontSize: 11 }}>Deliveries</span>
            </div>
          </div>
          <MiniBarChart />
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[["Total", "4,390"], ["Avg/day", "627"], ["Peak", "Fri"]].map(([l, v]) => (
              <div key={l}>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 2px" }}>{l}</p>
                <p style={{ color:  "#111827", fontWeight: 700, fontSize: 16, margin: 0 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div style={{ ...S.card, padding: "20px 22px" }}>
          <p style={{ color:  "#111827", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>Demand Heatmap</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "0 0 16px" }}>Top active delivery zones</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {heatmapData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, width: 80, flexShrink: 0 }}>{d.zone}</span>
                <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${d.intensity}%`, background: "linear-gradient(90deg, #c2410c, #fb923c)", borderRadius: 3 }} />
                </div>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, width: 30, textAlign: "right" }}>{d.intensity}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deliveries table + alerts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 14 }}>
        <div style={{ ...S.card, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ color:  "#111827", fontWeight: 700, fontSize: 14, margin: 0 }}>Recent Deliveries</p>
            <button style={{ color: "#fb923c", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                {["Order ID", "Customer", "Status", "Time"].map((h) => (
                  <th key={h} style={{ color: "rgba(255,255,255,0.25)", fontWeight: 600, fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", textAlign: "left", paddingBottom: 10 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentDeliveries.map((d) => (
                <tr key={d.id} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "9px 0", color: "#fb923c", fontFamily: "monospace", fontWeight: 600 }}>{d.id}</td>
                  <td style={{ padding: "9px 8px", color: "rgba(255,255,255,0.65)" }}>{d.customer}</td>
                  <td style={{ padding: "9px 0" }}>
                    <span style={{ ...S.statusColors[d.status], fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>{d.status}</span>
                  </td>
                  <td style={{ padding: "9px 0", color: "rgba(255,255,255,0.25)", textAlign: "right" }}>{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ ...S.card, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ color:  "#111827", fontWeight: 700, fontSize: 14, margin: 0 }}>Live Alerts</p>
            <span style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>{alerts.length} new</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alerts.map((a) => {
              const style = S.alertStyles[a.type];
              return (
                <div key={a.id} style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: style.dot, marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, lineHeight: 1.5, margin: 0 }}>{a.message}</p>
                      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, margin: "4px 0 0" }}>{a.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top riders */}
      <div style={{ ...S.card, padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ color:  "#111827", fontWeight: 700, fontSize: 14, margin: 0 }}>Top Performing Riders</p>
          <button style={{ color: "#fb923c", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {topRiders.map((r, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fb923c", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>
                #{i + 1}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ color:  "#111827", fontWeight: 600, fontSize: 13, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "2px 0 0" }}>{r.city}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <span style={{ color: "#fbbf24", fontSize: 10 }}>★ {r.rating}</span>
                  <span style={{ color: "#6B7280", fontSize: 10 }}>{r.deliveries} today</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {[
          { title: "Rider Allocation", desc: "AI-powered zone routing and load balancing across your fleet.", icon: "🗺️", tag: "Smart Routing" },
          { title: "Warehouse View", desc: "Real-time inventory, dock status, and outbound queue.", icon: "🏭", tag: "Live Sync" },
          { title: "Performance Intel", desc: "SLA compliance, customer ratings, and cost-per-delivery.", icon: "📈", tag: "Analytics" },
        ].map((f, i) => (
          <div key={i} style={{ ...S.card, padding: "20px 22px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{f.icon}</span>
                <span style={{ background: "rgba(249,115,22,0.1)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.15)", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 6 }}>{f.tag}</span>
              </div>
              <p style={{ color:  "#111827", fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>{f.title}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.55, margin: "0 0 14px" }}>{f.desc}</p>
              <span style={{ color: "#fb923c", fontSize: 12, fontWeight: 600 }}>Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardView;