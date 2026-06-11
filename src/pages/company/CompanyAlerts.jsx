import { useState } from "react";
import CompanyLayout from "./CompanyLayout";

export default function CompanyAlerts() {
  const alerts = [
    {
      id: 1,
      type: "Critical",
      message: "Vehicle LF008 delayed by 32 minutes.",
      time: "18:42",
    },
    {
      id: 2,
      type: "Warning",
      message: "High traffic detected on Route A12.",
      time: "18:36",
    },
    {
      id: 3,
      type: "Info",
      message: "Customer rated delivery ORD-7821 with 5★.",
      time: "18:28",
    },
    {
      id: 4,
      type: "Critical",
      message: "Rider Rahul Singh missed ETA for ORD-7834.",
      time: "18:20",
    },
    {
      id: 5,
      type: "Warning",
      message: "Vehicle LF012 battery running low.",
      time: "18:12",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((alert) => alert.type === filter);

  const getAlertStyle = (type) => {
    switch (type) {
      case "Critical":
        return "bg-red-50 border-red-500 text-red-700";
      case "Warning":
        return "bg-yellow-50 border-yellow-500 text-yellow-700";
      default:
        return "bg-blue-50 border-blue-500 text-blue-700";
    }
  };

  return (
    <CompanyLayout title="Alerts Center">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <div className="flex flex-col md:flex-row justify-between gap-4">

          <div>
            <h2 className="text-2xl font-bold">
              Operational Alerts
            </h2>

            <p className="text-gray-500">
              Monitor incidents requiring attention.
            </p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="All">All Alerts</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
            <option value="Info">Info</option>
          </select>

        </div>

      </div>

      {/* Alerts List */}
      <div className="space-y-4">

        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 rounded-2xl p-5 shadow bg-white ${getAlertStyle(
              alert.type
            )}`}
          >

            <div className="flex justify-between items-start">

              <div>

                <span className="font-bold">
                  {alert.type}
                </span>

                <p className="mt-2">
                  {alert.message}
                </p>

              </div>

              <span className="font-semibold">
                {alert.time}
              </span>

            </div>

          </div>
        ))}

      </div>

    </CompanyLayout>
  );
}