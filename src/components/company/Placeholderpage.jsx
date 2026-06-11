function PlaceholderPage({ title, icon }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>{icon}</div>
      <h2 style={{ color:  "#111827", fontWeight: 900, fontSize: 24, margin: "0 0 10px" }}>{title}</h2>
      <p style={{ color: "#6B7280", fontSize: 14, maxWidth: 280, lineHeight: 1.6, margin: "0 0 24px" }}>
        This section is under development. Connect your live data source to activate it.
      </p>
      <div style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 12, padding: "10px 20px" }}>
        <span style={{ color: "#fb923c", fontSize: 12, fontWeight: 600 }}>Coming Soon · Connect Live Data</span>
      </div>
    </div>
  );
}
export default PlaceholderPage;
