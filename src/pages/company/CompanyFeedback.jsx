import CompanyLayout from "./CompanyLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CompanyFeedback() {
  const riderData = [
    {
      name: "Rahul",
      rating: 4.9,
      deliveries: 62,
      csat: 98,
    },
    {
      name: "Aman",
      rating: 4.8,
      deliveries: 57,
      csat: 96,
    },
    {
      name: "Deepak",
      rating: 4.5,
      deliveries: 49,
      csat: 91,
    },
    {
      name: "Vikas",
      rating: 4.6,
      deliveries: 53,
      csat: 93,
    },
  ];

  const weeklyTrend = [
    { week: "W1", csat: 91 },
    { week: "W2", csat: 93 },
    { week: "W3", csat: 95 },
    { week: "W4", csat: 96 },
  ];

  const sentimentData = [
    { name: "Positive", value: 78 },
    { name: "Neutral", value: 15 },
    { name: "Negative", value: 7 },
  ];

  const COLORS = [
    "#22C55E",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <CompanyLayout title="Rider Performance Center">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Fleet Rating"
          value="⭐ 4.7"
          valueClass="text-[#FF5A1F]"
        />

        <StatCard
          title="Success Rate"
          value="95%"
          valueClass="text-green-600"
        />

        <StatCard
          title="Top Rider"
          value="Rahul Singh"
        />

        <StatCard
          title="Reviews"
          value="2,847"
        />

      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Ratings Chart */}
        <ChartCard title="Rider Ratings Comparison">

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riderData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis domain={[4, 5]} />

              <Tooltip />

              <Bar
                dataKey="rating"
                fill="#FF5A1F"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </ChartCard>

        {/* Weekly CSAT */}
        <ChartCard title="Weekly CSAT Trend">

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="week" />

              <YAxis domain={[85, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="csat"
                stroke="#22C55E"
                strokeWidth={4}
              />

            </LineChart>
          </ResponsiveContainer>

        </ChartCard>

      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Sentiment */}
        <ChartCard title="Customer Review Sentiment">

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={sentimentData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {sentimentData.map((entry, index) => (
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

        {/* Leaderboard */}
        <ChartCard title="Top Riders Leaderboard">

          <div className="space-y-5">

            {riderData.map((rider, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-4"
              >

                <div>

                  <p className="font-bold">
                    #{index + 1} {rider.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {rider.deliveries} Deliveries
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold text-[#FF5A1F]">
                    ⭐ {rider.rating}
                  </p>

                  <p className="text-sm text-green-600">
                    CSAT {rider.csat}%
                  </p>

                </div>

              </div>
            ))}

          </div>

        </ChartCard>

      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          AI Coaching Insights
        </h2>

        <div className="space-y-4">

          <Insight
            color="green"
            text="Rahul Singh consistently exceeds customer expectations."
          />

          <Insight
            color="yellow"
            text="Aman Kumar should improve communication during delays."
          />

          <Insight
            color="red"
            text="Deepak Sharma requires coaching to reduce late deliveries."
          />

        </div>

      </div>

    </CompanyLayout>
  );
}

function StatCard({
  title,
  value,
  valueClass = "",
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-3 ${valueClass}`}>
        {value}
      </h2>

    </div>
  );
}

function ChartCard({
  title,
  children,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      {children}

    </div>
  );
}

function Insight({
  color,
  text,
}) {
  const styles = {
    green: "bg-green-50 border-green-500",
    yellow: "bg-yellow-50 border-yellow-500",
    red: "bg-red-50 border-red-500",
  };

  return (
    <div
      className={`border-l-4 rounded-r-2xl px-5 py-4 ${styles[color]}`}
    >
      {text}
    </div>
  );
}