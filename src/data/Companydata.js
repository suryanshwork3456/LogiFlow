export const companyProfile = {
  name: "SwiftHaul Logistics",
  logo: null,
  emergencyContact: "+91-9876543210",
  tagline: "Driven by Trust, Powered by Experience.",
  whyChooseUs:
    "We deliver end-to-end logistics solutions with real-time tracking, 24/7 support, and a fleet of 500+ verified riders across 120 cities.",
};

export const dashboardStats = [
  { label: "Active Riders", value: "1,284", change: "+12%", icon: "🏍️", color: "orange" },
  { label: "Deliveries Today", value: "3,847", change: "+8%", icon: "📦", color: "blue" },
  { label: "On-Time Rate", value: "96.4%", change: "+1.2%", icon: "⚡", color: "green" },
  { label: "Pending Alerts", value: "14", change: "-3", icon: "🔔", color: "red" },
];

export const recentDeliveries = [
  { id: "SH-1021", customer: "Arjun Mehta", location: "Connaught Place, Delhi", status: "Delivered", time: "10:22 AM" },
  { id: "SH-1022", customer: "Priya Sharma", location: "Bandra, Mumbai", status: "In Transit", time: "10:45 AM" },
  { id: "SH-1023", customer: "Ravi Kumar", location: "Koramangala, Bengaluru", status: "Pending", time: "11:00 AM" },
  { id: "SH-1024", customer: "Sneha Patel", location: "Salt Lake, Kolkata", status: "Delivered", time: "11:15 AM" },
  { id: "SH-1025", customer: "Vikram Singh", location: "Jubilee Hills, Hyderabad", status: "Delayed", time: "11:30 AM" },
];

export const weeklyDeliveries = [
  { day: "Mon", deliveries: 520, target: 500 },
  { day: "Tue", deliveries: 680, target: 600 },
  { day: "Wed", deliveries: 590, target: 600 },
  { day: "Thu", deliveries: 720, target: 650 },
  { day: "Fri", deliveries: 810, target: 700 },
  { day: "Sat", deliveries: 640, target: 600 },
  { day: "Sun", deliveries: 430, target: 400 },
];

export const topRiders = [
  { name: "Amit Verma", deliveries: 48, rating: 4.9, city: "Delhi" },
  { name: "Suresh Nair", deliveries: 45, rating: 4.8, city: "Mumbai" },
  { name: "Kiran Rao", deliveries: 43, rating: 4.9, city: "Bengaluru" },
  { name: "Deepak Joshi", deliveries: 41, rating: 4.7, city: "Pune" },
];

export const alerts = [
  { id: 1, type: "warning", message: "Rider SH-R042 has been idle for 45 minutes in Andheri West", time: "5m ago" },
  { id: 2, type: "error", message: "Package SH-1019 delivery failed – customer unreachable", time: "12m ago" },
  { id: 3, type: "info", message: "New zone added: Whitefield, Bengaluru – 12 riders assigned", time: "1h ago" },
  { id: 4, type: "success", message: "Daily delivery target achieved in Hyderabad cluster", time: "2h ago" },
];

export const heatmapData = [
  { zone: "Delhi NCR", intensity: 92 },
  { zone: "Mumbai", intensity: 85 },
  { zone: "Bengaluru", intensity: 78 },
  { zone: "Hyderabad", intensity: 65 },
  { zone: "Chennai", intensity: 54 },
  { zone: "Pune", intensity: 48 },
  { zone: "Kolkata", intensity: 42 },
  { zone: "Ahmedabad", intensity: 36 },
];
