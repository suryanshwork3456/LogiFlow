import { useNavigate } from "react-router-dom";

export default function RiderDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🚚</div>

          <h1 className="text-4xl font-bold text-[#1A1A2E] mb-3">
            Rider Portal
          </h1>

          <p className="text-[#555F6D] text-lg">
            Manage deliveries, optimize routes, track performance and grow your earnings.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Smart Rider Hub */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <div className="text-5xl mb-4">🚀</div>

            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3">
              Smart Rider Hub
            </h2>

            <p className="text-gray-600 mb-6">
              AI Route Optimization, ETA Tracking and Rider Transfer Network.
            </p>

            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>✅ Smart Route Planning</li>
              <li>✅ Live ETA Tracking</li>
              <li>✅ Nearby Riders</li>
              <li>✅ Transfer Delivery Requests</li>
            </ul>

            <button
              onClick={() => navigate("/rider/map")}
              className="bg-[#FF5A1F] hover:bg-[#e84d15] text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Launch Hub
            </button>
          </div>

          {/* Feedback & Earnings */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <div className="text-5xl mb-4">⭐</div>

            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3">
              Feedback & Earnings
            </h2>

            <p className="text-gray-600 mb-6">
              View ratings, customer reviews, tips earned and AI suggestions to improve performance.
            </p>

            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>⭐ Customer Ratings</li>
              <li>📝 Review History</li>
              <li>💰 Tips & Earnings</li>
              <li>🤖 AI Improvement Coach</li>
            </ul>

            <button
              onClick={() => navigate("/rider/feedback")}
              className="border-2 border-[#FF5A1F] text-[#FF5A1F] hover:bg-[#FF5A1F] hover:text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              View Feedback
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}