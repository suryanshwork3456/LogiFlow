import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export default function RiderFeedback() {
  const ratingData = [
    { month: "Jan", rating: 4.2 },
    { month: "Feb", rating: 4.3 },
    { month: "Mar", rating: 4.4 },
    { month: "Apr", rating: 4.6 },
    { month: "May", rating: 4.7 },
    { month: "Jun", rating: 4.8 },
  ];

  const deliveryData = [
    { month: "Jan", deliveries: 35 },
    { month: "Feb", deliveries: 42 },
    { month: "Mar", deliveries: 58 },
    { month: "Apr", deliveries: 61 },
    { month: "May", deliveries: 74 },
    { month: "Jun", deliveries: 88 },
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      review: "Fast delivery and very professional.",
      rating: 5,
      tip: 50,
      date: "2 days ago",
    },
    {
      name: "Rahul Verma",
      review: "Package arrived safely and on time.",
      rating: 5,
      tip: 20,
      date: "5 days ago",
    },
    {
      name: "Ankit Singh",
      review: "Good service but slight delay.",
      rating: 4,
      tip: 0,
      date: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1A1A2E]">
          ⭐ Rider Performance Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Ratings, reviews, earnings and growth insights.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Overall Rating</p>
          <h2 className="text-3xl font-bold text-[#FF5A1F]">
            ⭐ 4.8
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Deliveries</p>
          <h2 className="text-3xl font-bold">247</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Tips Earned</p>
          <h2 className="text-3xl font-bold">₹8,920</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Success Rate</p>
          <h2 className="text-3xl font-bold text-green-600">
            96%
          </h2>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Experience</p>
          <h3 className="text-2xl font-bold">
            2 Years
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Distance Covered</p>
          <h3 className="text-2xl font-bold">
            5,420 km
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Avg ETA</p>
          <h3 className="text-2xl font-bold">
            18 min
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-gray-500">Current Streak</p>
          <h3 className="text-2xl font-bold">
            24 Days
          </h3>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Customer Satisfaction Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingData}>
              <XAxis dataKey="month" />
              <YAxis domain={[4, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#FF5A1F"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Monthly Delivery Performance
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="deliveries"
                fill="#FF5A1F"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Review Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Review Breakdown
        </h2>

        {[
          ["Communication", "95%"],
          ["Speed", "91%"],
          ["Professionalism", "98%"],
          ["Package Safety", "97%"],
        ].map(([title, value]) => (
          <div key={title} className="mb-4">
            <div className="flex justify-between">
              <span>{title}</span>
              <span>{value}</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
              <div
                className="bg-[#FF5A1F] h-3 rounded-full"
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reviews + AI Coach */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-5">
            Recent Reviews
          </h2>

          {reviews.map((review, index) => (
            <div
              key={index}
              className="border-b py-4"
            >
              <p className="font-bold">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="mt-2">
                {review.review}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {review.name}
              </p>

              <p className="text-sm text-green-600">
                Tip: ₹{review.tip}
              </p>

              <p className="text-xs text-gray-400">
                {review.date}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow border-l-4 border-[#FF5A1F]">
          <h2 className="text-2xl font-bold mb-5">
            🤖 AI Rider Coach
          </h2>

          <div className="space-y-5">

            <div>
              <h3 className="font-semibold">
                Performance Insight
              </h3>

              <p className="text-gray-600 mt-2">
                Your ratings are highest during
                morning deliveries.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Recommendation
              </h3>

              <p className="text-gray-600 mt-2">
                Accept more deliveries between
                8 AM and 12 PM.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Expected Impact
              </h3>

              <p className="text-green-600 mt-2">
                +0.2 Rating Increase
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Reputation + Achievements */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Reputation Score
          </h2>

          <div className="text-5xl font-bold text-[#FF5A1F]">
            92/100
          </div>

          <p className="text-green-600 mt-2">
            Excellent Performer
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Achievements
          </h2>

          <div className="space-y-3">
            <p>🏅 Top Rated Rider</p>
            <p>🏅 Customer Favorite</p>
            <p>🏅 100 Deliveries Completed</p>
            <p>🏅 30 Day Streak</p>
          </div>
        </div>

      </div>

    </div>
  );
}