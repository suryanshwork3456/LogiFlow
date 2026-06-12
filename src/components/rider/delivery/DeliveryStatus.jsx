import Statcard from "../dashboard/Statcard";
import StatusBadge from "../dashboard/StatusBadge";

import { Package,Truck, CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../api";
function DeliveryStatus() {
  const [orders, setOrders] = useState([]);

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to load orders", error);
      }
    };
    const pickedUpCount = orders.filter(
        o => o.status === "picked_up"
      ).length;

      const onTheWayCount = orders.filter(
        o =>
          o.status === "assigned" ||
          o.status === "in_transit"
      ).length;

      const deliveredCount = orders.filter(
        o => o.status === "delivered"
      ).length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Statcard icon={Package} label="Picked Up" value={pickedUpCount} sub="Ready to deliver" accent="#3b82f6" />
        <Statcard icon={Truck} label="On The Way" value={onTheWayCount} sub="En route" accent="#f97316" />
        <Statcard icon={CheckCircle2} label="Delivered" value={deliveredCount} sub="Completed today" accent="#22c55e" />
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
        <p style={{ margin: "0 0 16px", fontWeight: 700, fontSize: 15, color: "#111827" }}>Live Status Feed</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {orders.map((d, i) => (
            <div key={d.id} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              paddingBottom: i < orders.length - 1 ? 16 : 0,
              marginBottom: i < orders.length - 1 ? 16 : 0,
              borderBottom: i < orders.length - 1 ? "1px solid #f3f4f6" : "none"
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: d.status === "delivered" ? "#dcfce7" : d.status === "In Transit" ? "#ffedd5" : "#dbeafe",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                 {d.status === "delivered" ? <CheckCircle2 size={16} color="#22c55e" /> :
                    d.status === "In Transit" ? <Truck size={16} color="#f97316" /> :
                      <Package size={16} color="#3b82f6" />}
                </div>
                {i < orders.length - 1 && <div style={{ width: 1, height: 20, background: "#e5e7eb" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#111827" }}>Order #{d.id}</p>
                  <StatusBadge status={d.status === "delivered"? "Delivered": d.status === "assigned" || d.status === "in_transit"? "In Transit": d.status === "pending"? "Pending": "Picked Up"}/>
                </div>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#9ca3af" }}>{d.delivery_address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DeliveryStatus;