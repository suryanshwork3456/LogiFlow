import { useMemo, useState } from "react";
import CompanyLayout from "./CompanyLayout";

export default function CompanyDeliveries() {
  const deliveries = [
    {
      order: "ORD-7821",
      rider: "Rahul Singh",
      zone: "North",
      status: "On Time",
      eta: "12 min",
    },
    {
      order: "ORD-7834",
      rider: "Aman Kumar",
      zone: "East",
      status: "Delayed",
      eta: "28 min",
    },
    {
      order: "ORD-7855",
      rider: "Deepak Sharma",
      zone: "West",
      status: "On Time",
      eta: "8 min",
    },
    {
      order: "ORD-7862",
      rider: "Vikas Yadav",
      zone: "South",
      status: "At Risk",
      eta: "18 min",
    },
    {
      order: "ORD-7868",
      rider: "Arjun Mehta",
      zone: "Central",
      status: "Delayed",
      eta: "35 min",
    },
    {
      order: "ORD-7872",
      rider: "Rohit Verma",
      zone: "North",
      status: "On Time",
      eta: "10 min",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      const matchesSearch =
        delivery.order
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        delivery.rider
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        delivery.zone
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        delivery.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <CompanyLayout title="Deliveries Center">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <DeliveryStat
          title="Total Deliveries"
          value={deliveries.length}
        />

        <DeliveryStat
          title="On Time"
          value={
            deliveries.filter(
              (d) => d.status === "On Time"
            ).length
          }
          valueClass="text-green-600"
        />

        <DeliveryStat
          title="At Risk"
          value={
            deliveries.filter(
              (d) => d.status === "At Risk"
            ).length
          }
          valueClass="text-yellow-600"
        />

        <DeliveryStat
          title="Delayed"
          value={
            deliveries.filter(
              (d) => d.status === "Delayed"
            ).length
          }
          valueClass="text-red-600"
        />

      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

        <div className="flex flex-col md:flex-row gap-4 justify-between">

          <input
            type="text"
            placeholder="Search order, rider, or zone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              border
              rounded-xl
              px-4
              py-3
              flex-1
              outline-none
              focus:ring-2
              focus:ring-[#FF5A1F]
            "
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
              border
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="All">
              All Status
            </option>

            <option value="On Time">
              On Time
            </option>

            <option value="At Risk">
              At Risk
            </option>

            <option value="Delayed">
              Delayed
            </option>

          </select>

        </div>

      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Deliveries Overview
          </h2>

          <p className="text-gray-500">
            Manage and monitor active deliveries.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4">
                  Order ID
                </th>

                <th className="text-left px-6 py-4">
                  Rider
                </th>

                <th className="text-left px-6 py-4">
                  Zone
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  ETA
                </th>

                <th className="text-left px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDeliveries.map(
                (delivery, index) => (
                  <tr
                    key={index}
                    className="
                      border-t
                      hover:bg-gray-50
                      transition
                    "
                  >

                    <td className="px-6 py-4 font-semibold">
                      {delivery.order}
                    </td>

                    <td className="px-6 py-4">
                      {delivery.rider}
                    </td>

                    <td className="px-6 py-4">
                      {delivery.zone}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          ${
                            delivery.status === "On Time"
                              ? "bg-green-100 text-green-700"
                              : delivery.status ===
                                "At Risk"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {delivery.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">
                      {delivery.eta}
                    </td>

                    <td className="px-6 py-4">

                      <button
                        className="
                          bg-[#FF5A1F]
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          hover:opacity-90
                          transition
                        "
                      >
                        Track
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-6 border-t">

          <p className="text-gray-500">
            Showing {filteredDeliveries.length} deliveries
          </p>

          <div className="flex gap-3">

            <button
              className="
                px-4
                py-2
                rounded-xl
                border
                hover:bg-gray-100
              "
            >
              Previous
            </button>

            <button
              className="
                px-4
                py-2
                rounded-xl
                border
                hover:bg-gray-100
              "
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </CompanyLayout>
  );
}

function DeliveryStat({
  title,
  value,
  valueClass = "",
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        p-6
      "
    >

      <p className="text-gray-500">
        {title}
      </p>

      <h2
        className={`text-3xl font-bold mt-2 ${valueClass}`}
      >
        {value}
      </h2>

    </div>
  );
}