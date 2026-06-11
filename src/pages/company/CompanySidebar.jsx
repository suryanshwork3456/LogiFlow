import { NavLink, useNavigate } from "react-router-dom";

export default function CompanySidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/company/dashboard",
      icon: "🏢",
    },
    {
      name: "Fleet Operations",
      path: "/company/map",
      icon: "🚚",
    },
    {
      name: "Rider Performance",
      path: "/company/feedback",
      icon: "⭐",
    },
  ];

  return (
    <aside className="w-72 bg-[#15172D] text-white flex flex-col p-6">

      {/* Logo */}
      <div>
        <h1 className="text-4xl font-bold">
          <span className="text-white">Logi</span>
          <span className="text-[#FF5A1F]">Flow</span>
        </h1>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">
            Company Panel
          </h2>

          <p className="text-gray-400">
            Company Operations
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-12 space-y-3">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition ${
                isActive
                  ? "bg-[#FF5A1F] font-semibold text-white"
                  : "text-gray-300 hover:bg-[#22254A] hover:text-white"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Footer */}
      <div className="mt-auto pt-10">

        <button
          onClick={() => navigate("/")}
          className="text-gray-400 hover:text-white transition"
        >
          ← Back to Website
        </button>

      </div>

    </aside>
  );
}