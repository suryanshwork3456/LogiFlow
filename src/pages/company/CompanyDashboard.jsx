import { useNavigate } from "react-router-dom";
import CompanyLayout from "./CompanyLayout";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";



export default function CompanyDashboard() {
  const navigate = useNavigate();

  const activities = [
    "18:42 Rahul completed ORD-102",
    "18:39 Vehicle LF008 delayed",
    "18:35 Customer rated 5★",
    "18:28 New order assigned",
    "18:20 Revenue target achieved for Zone A",
  ];

  const revenueData = [
    { day: "Mon", revenue: 180000 },
    { day: "Tue", revenue: 210000 },
    { day: "Wed", revenue: 195000 },
    { day: "Thu", revenue: 240000 },
    { day: "Fri", revenue: 260000 },
    { day: "Sat", revenue: 280000 },
  ];

  const deliveryData = [
    { day: "Mon", deliveries: 210 },
    { day: "Tue", deliveries: 240 },
    { day: "Wed", deliveries: 225 },
    { day: "Thu", deliveries: 270 },
    { day: "Fri", deliveries: 300 },
    { day: "Sat", deliveries: 312 },
  ];

  const delayData = [
    { name: "Traffic", value: 45 },
    { name: "Weather", value: 25 },
    { name: "Vehicle", value: 20 },
    { name: "Other", value: 10 },
  ];

  const topRiders = [
    {
      name: "Rahul Singh",
      deliveries: 58,
      rating: 4.9,
    },
    {
      name: "Aman Kumar",
      deliveries: 53,
      rating: 4.8,
    },
    {
      name: "Deepak Sharma",
      deliveries: 49,
      rating: 4.7,
    },
  ];

  const COLORS = [
    "#FF5A1F",
    "#22C55E",
    "#3B82F6",
    "#F59E0B",
  ];

  return (
    <CompanyLayout title="Company Dashboard">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <KpiCard
          title="Orders Today"
          value="312"
        />

        <KpiCard
          title="In Transit"
          value="126"
        />

        <KpiCard
          title="Completed"
          value="178"
        />

        <KpiCard
          title="Delayed"
          value="8"
          valueClass="text-red-500"
        />

        <KpiCard
          title="Revenue"
          value="₹2.4L"
          valueClass="text-green-600"
        />

        <KpiCard
          title="CSAT"
          value="96%"
        />

      </div>

      {/* Operations */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Fleet */}
        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

          <div className="text-5xl mb-4">
            🚚
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Fleet Operations
          </h2>

          <p className="text-gray-600 mb-6">
            Track riders, deliveries and optimize routes in real time.
          </p>

          <button
            onClick={() => navigate("/company/map")}
            className="bg-[#FF5A1F] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            Open Fleet Center
          </button>

        </div>

        {/* Performance */}
        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

          <div className="text-5xl mb-4">
            ⭐
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Rider Performance
          </h2>

          <p className="text-gray-600 mb-6">
            Monitor ratings, reviews and productivity insights.
          </p>

          <button
            onClick={() => navigate("/company/feedback")}
            className="border-2 border-[#FF5A1F] text-[#FF5A1F] px-6 py-3 rounded-xl hover:bg-[#FF5A1F] hover:text-white transition"
          >
            View Performance
          </button>

        </div>

      </div>

      {/* Live Activity Feed */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Live Activity Feed
          </h2>

          <span className="text-green-600 font-semibold">
            ● Updating
          </span>

        </div>

        <div className="space-y-4">

          {activities.map((item, index) => (
            <div
              key={index}
              className="
                flex items-center
                gap-4
                border-l-4
                border-[#FF5A1F]
                bg-orange-50
                rounded-r-2xl
                px-5
                py-4
              "
            >

              <div className="w-3 h-3 rounded-full bg-[#FF5A1F]" />

              <p className="text-gray-700 font-medium">
                {item}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Analytics */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Revenue */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Revenue Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={revenueData}>

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF5A1F"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Deliveries */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Deliveries Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={deliveryData}>

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="deliveries"
                fill="#FF5A1F"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Insights */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Delay Breakdown */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Delay Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={delayData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {delayData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Top Riders Leaderboard
          </h2>

          <div className="space-y-4">

            {topRiders.map((rider, index) => (

              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >

                <div>

                  <p className="font-semibold">
                    {rider.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {rider.deliveries} Deliveries
                  </p>

                </div>

                <span className="font-bold text-[#FF5A1F]">
                  ⭐ {rider.rating}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </CompanyLayout>
  );
}

function KpiCard({
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
        hover:shadow-xl
        transition
      "
    >
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${valueClass}`}>
        {value}
      </h2>
    </div>
  );
}
