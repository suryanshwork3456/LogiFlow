export default function RiderDeliveryRequest() {
  return (
    <div
      style={{
        background: "#fff",
        padding: 24,
        borderRadius: 20,
      }}
    >
      <h2>📦 Delivery Request</h2>

      <p style={{ color: "#6b7280", marginBottom: 20 }}>
        Submit a delivery request for company approval.
      </p>

      <form
        style={{
          display: "grid",
          gap: 16,
          maxWidth: 600,
        }}
      >
        <input
          placeholder="Pickup Address"
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        />

        <input
          placeholder="Drop Address"
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        />

        <input
          placeholder="Package Weight"
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        />

        <button
          type="button"
          style={{
            background: "#f97316",
            color: "#fff",
            border: "none",
            padding: 14,
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}