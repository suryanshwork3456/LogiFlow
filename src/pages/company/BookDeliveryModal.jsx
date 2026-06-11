function BookDeliveryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#ff5a1f",
        color: "#fff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "12px",
        fontWeight: "700",
        cursor: "pointer",
      }}
    >
      + Book Delivery
    </button>
  );
}

export default BookDeliveryButton;