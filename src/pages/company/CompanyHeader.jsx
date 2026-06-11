export default function CompanyHeader({ title }) {
  const today = new Date().toDateString();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1A1A2E]">
          {title}
        </h1>

        <p className="text-gray-500">
          ABC Logistics • {today}
        </p>
      </div>

      <div className="flex gap-4">
        <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
          ● LIVE
        </span>

        <button className="bg-white border px-6 py-2 rounded-xl">
          Logout
        </button>
      </div>
    </div>
  );
}