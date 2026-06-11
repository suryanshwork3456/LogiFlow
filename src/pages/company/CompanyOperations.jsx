import { useState } from "react";
import CompanyLayout from "./CompanyLayout";

const ENABLE_MANUAL_BOOKING = true;

export default function CompanyOperations() {
  const [queue, setQueue] = useState([
    "ORD-7902 awaiting dispatch",
    "ORD-7903 awaiting rider assignment",
    "ORD-7904 verification pending",
    "ORD-7905 packed and ready",
  ]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    pickup: "",
    destination: "",
    priority: "Normal",
  });

  const zones = [
    { zone: "North", health: "Healthy" },
    { zone: "South", health: "Attention" },
    { zone: "East", health: "Healthy" },
    { zone: "West", health: "Critical" },
  ];

  const createDelivery = () => {
    const orderId = `ORD-${Math.floor(
      8000 + Math.random() * 1000
    )}`;

    setQueue([
      `${orderId} awaiting dispatch`,
      ...queue,
    ]);

    setShowModal(false);

    setFormData({
      customer: "",
      pickup: "",
      destination: "",
      priority: "Normal",
    });
  };

  return (
    <CompanyLayout title="Operations Command Center">

      {/* Header Action */}
      <div className="flex justify-end mb-6">
        {ENABLE_MANUAL_BOOKING && (
          <button
            onClick={() => setShowModal(true)}
            className="
              bg-[#FF5A1F]
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              hover:opacity-90
              shadow-lg
            "
          >
            + Book Delivery
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-10">

        <Kpi title="Live Orders" value="148" />
        <Kpi title="Dispatching" value="32" />
        <Kpi title="Delayed" value="7" danger />
        <Kpi title="SLA" value="97%" />
        <Kpi title="Active Riders" value="54" />
        <Kpi title="Revenue" value="₹3.2L" />

      </div>

      {/* Queue + Zones */}
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            📦 Orders Queue
          </h2>

          <div className="space-y-4">

            {queue.map((item, index) => (
              <div
                key={index}
                className="
                  border-l-4
                  border-[#FF5A1F]
                  bg-orange-50
                  rounded-r-2xl
                  px-5
                  py-4
                "
              >
                {item}
              </div>
            ))}

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            🌍 Zone Health
          </h2>

          <div className="space-y-4">

            {zones.map((zone) => (
              <div
                key={zone.zone}
                className="flex justify-between border-b pb-4"
              >
                <span className="font-semibold">
                  {zone.zone}
                </span>

                <span
                  className={`font-bold ${
                    zone.health === "Healthy"
                      ? "text-green-600"
                      : zone.health === "Attention"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {zone.health}
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Rider Of Day */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          🏆 Rider of the Day
        </h2>

        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-3xl font-bold">
              Rahul Singh
            </h3>

            <p className="text-gray-500 mt-2">
              62 Deliveries Completed Today
            </p>

            <p className="text-gray-500">
              Customer Rating: ⭐ 4.9
            </p>
          </div>

          <div className="text-6xl">
            🏅
          </div>

        </div>

      </div>

      {/* BOOK DELIVERY MODAL */}
      {showModal && (
        <div className="
          fixed inset-0
          bg-black/50
          flex items-center justify-center
          z-50
        ">

          <div className="
            bg-white
            rounded-3xl
            p-8
            w-full
            max-w-xl
          ">

            <h2 className="text-2xl font-bold mb-6">
              Create Delivery
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Customer Name"
                value={formData.customer}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="text"
                placeholder="Pickup Address"
                value={formData.pickup}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pickup: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="text"
                placeholder="Delivery Address"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    destination: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              >
                <option>Normal</option>
                <option>Express</option>
              </select>

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={() => setShowModal(false)}
                className="
                  px-5 py-3
                  border
                  rounded-xl
                "
              >
                Cancel
              </button>

              <button
                onClick={createDelivery}
                className="
                  bg-[#FF5A1F]
                  text-white
                  px-5 py-3
                  rounded-xl
                "
              >
                Create Delivery
              </button>

            </div>

          </div>

        </div>
      )}

    </CompanyLayout>
  );
}

function Kpi({ title, value, danger = false }) {
  return (
    <div className="
      bg-white
      rounded-3xl
      shadow-lg
      p-6
    ">
      <p className="text-gray-500">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold mt-3 ${
          danger
            ? "text-red-500"
            : "text-[#1A1A2E]"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}