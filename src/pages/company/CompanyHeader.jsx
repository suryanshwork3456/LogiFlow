import { useNavigate } from "react-router-dom";

export default function CompanyHeader({ title, sidebarOpen, onToggleSidebar }) {
  const today = new Date().toDateString();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        {/* ✅ Sidebar toggle button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border shadow-sm text-gray-700"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        <div>
          <h1 className="text-4xl font-bold text-[#1A1A2E]">
            {title}
          </h1>
          <p className="text-gray-500">
            ABC Logistics • {today}
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
          ● LIVE
        </span>

        <button
          onClick={() => navigate("/")}
          className="bg-white border px-6 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}