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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function CompanyAnalytics() {
  const revenueData = [
    { day: "Mon", revenue: 180000 },
    { day: "Tue", revenue: 210000 },
    { day: "Wed", revenue: 195000 },
    { day: "Thu", revenue: 240000 },
    { day: "Fri", revenue: 260000 },
    { day: "Sat", revenue: 280000 },
    { day: "Sun", revenue: 250000 },
  ];

  const deliveriesData = [
    { day: "Mon", deliveries: 210 },
    { day: "Tue", deliveries: 240 },
    { day: "Wed", deliveries: 225 },
    { day: "Thu", deliveries: 270 },
    { day: "Fri", deliveries: 300 },
    { day: "Sat", deliveries: 312 },
    { day: "Sun", deliveries: 280 },
  ];

  const delayData = [
    { name: "Traffic", value: 45 },
    { name: "Weather", value: 25 },
    { name: "Vehicle", value: 20 },
    { name: "Other", value: 10 },
  ];

  const zoneData = [
    { zone: "North", performance: 95 },
    { zone: "South", performance: 91 },
    { zone: "East", performance: 88 },
    { zone: "West", performance: 93 },
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
    <CompanyLayout title="Analytics Dashboard">

      {/* Executive KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <SummaryCard title="Weekly Revenue" value="₹16.1L" />

        <SummaryCard title="Deliveries" value="1,837" />

        <SummaryCard title="Success Rate" value="96%" />

        <SummaryCard title="Avg ETA" value="18 min" />

      </div>

      {/* Revenue + Deliveries */}
      <div className="grid lg:grid-cols-2 gap-8">

        <ChartCard title="Revenue Trend">

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

        </ChartCard>

        <ChartCard title="Deliveries Per Day">

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveriesData}>
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

        </ChartCard>

      </div>

      {/* Delay + Riders */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <ChartCard title="Delay Reasons">

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

        </ChartCard>

        <ChartCard title="Top Riders">

          <div className="space-y-5">

            {topRiders.map((rider, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-4"
              >

                <div>

                  <p className="font-semibold">
                    #{index + 1} {rider.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {rider.deliveries} Deliveries
                  </p>

                </div>

                <div className="font-bold text-[#FF5A1F]">
                  ⭐ {rider.rating}
                </div>

              </div>
            ))}

          </div>

        </ChartCard>

      </div>

      {/* Zone + Operations */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <ChartCard title="Zone Performance">

          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={zoneData}>

              <PolarGrid />

              <PolarAngleAxis dataKey="zone" />

              <PolarRadiusAxis />

              <Radar
                name="Performance"
                dataKey="performance"
                stroke="#FF5A1F"
                fill="#FF5A1F"
                fillOpacity={0.4}
              />

            </RadarChart>
          </ResponsiveContainer>

        </ChartCard>

        <ChartCard title="Operations Snapshot">

          <div className="space-y-5">

            <SnapshotItem
              label="Fleet Utilization"
              value="92%"
            />

            <SnapshotItem
              label="Orders Awaiting Dispatch"
              value="18"
            />

            <SnapshotItem
              label="SLA Compliance"
              value="97%"
            />

            <SnapshotItem
              label="Delayed Deliveries"
              value="12"
              danger
            />

          </div>

        </ChartCard>

      </div>

    </CompanyLayout>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      {children}

    </div>
  );
}

function SnapshotItem({
  label,
  value,
  danger = false,
}) {
  return (
    <div className="flex justify-between items-center border-b pb-4">

      <span className="text-gray-600">
        {label}
      </span>

      <span
        className={`font-bold text-xl ${
          danger ? "text-red-500" : "text-[#FF5A1F]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}