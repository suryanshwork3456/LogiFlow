export const S = {
  page: {
    minHeight: "100vh",
    background: "#F5F6FA",
    fontFamily: "'Inter', sans-serif",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #EAECEF",
    borderRadius: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  statusColors: {
    Delivered: {
      background: "#E8F8EE",
      color: "#22C55E",
      border: "1px solid #C6F0D5",
    },

    "In Transit": {
      background: "#EAF2FF",
      color: "#3B82F6",
      border: "1px solid #CFE0FF",
    },

    Pending: {
      background: "#FFF8E1",
      color: "#EAB308",
      border: "1px solid #FDE68A",
    },

    Delayed: {
      background: "#FEECEC",
      color: "#EF4444",
      border: "1px solid #FECACA",
    },
  },

  alertStyles: {
    warning: {
      bg: "#FFF8E1",
      border: "#FDE68A",
      dot: "#EAB308",
    },

    error: {
      bg: "#FEECEC",
      border: "#FECACA",
      dot: "#EF4444",
    },

    info: {
      bg: "#EAF2FF",
      border: "#BFDBFE",
      dot: "#3B82F6",
    },

    success: {
      bg: "#E8F8EE",
      border: "#BBF7D0",
      dot: "#22C55E",
    },
  },

  statColors: {
    orange: {
      grad: "#FFF3E8",
      border: "#FED7AA",
      text: "#F97316",
    },

    blue: {
      grad: "#EEF4FF",
      border: "#BFDBFE",
      text: "#3B82F6",
    },

    green: {
      grad: "#ECFDF3",
      border: "#BBF7D0",
      text: "#22C55E",
    },

    red: {
      grad: "#FEF2F2",
      border: "#FECACA",
      text: "#EF4444",
    },
  },
};