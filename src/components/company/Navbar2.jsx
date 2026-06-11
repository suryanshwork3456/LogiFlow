import { useState, useRef, useEffect } from "react";

 function Navbar2({ company, onToggleSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-5 gap-4">
        {/* Hamburger toggle */}
        <button
          onClick={onToggleSidebar}
          className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/[0.08] flex flex-col items-center justify-center gap-[5px] transition-all group"
        >
          <span className="w-4 h-[1.5px] bg-white/60 group-hover:bg-white transition-colors rounded-full" />
          <span className="w-3 h-[1.5px] bg-white/60 group-hover:bg-white transition-colors rounded-full" />
          <span className="w-4 h-[1.5px] bg-white/60 group-hover:bg-white transition-colors rounded-full" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-orange-500/30">
            S
          </div>
          <span className="text-white font-bold text-sm tracking-tight hidden sm:block">
            Company <span className="text-white/40 font-normal">Portal</span>
          </span>
        </div>

        {/* Center pill */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/50 text-xs">All systems operational</span>
          </div>
        </div>

        {/* Right: notifications + profile */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="relative w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/[0.08] flex items-center justify-center transition-all">
            <span className="text-base">🔔</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 border border-[#0a0a0f]" />
          </button>

          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/10 border border-white/[0.08] rounded-xl px-3 py-1.5 transition-all group"
          >
            {company?.logoPreview ? (
              <img
                src={company.logoPreview}
                alt="logo"
                className="w-7 h-7 rounded-lg object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400/80 to-orange-600/80 flex items-center justify-center text-white text-xs font-bold">
                {company?.name?.[0]?.toUpperCase() || "C"}
              </div>
            )}
            <span className="text-white/70 text-xs font-medium group-hover:text-white transition-colors hidden sm:block max-w-[100px] truncate">
              {company?.name || "Company"}
            </span>
            <svg className="w-3 h-3 text-white/30 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Profile slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full z-[60] transition-all duration-300 ${
          profileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            profileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setProfileOpen(false)}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          className={`absolute top-0 right-0 h-full w-72 bg-[#0f0f17] border-l border-white/[0.08] shadow-2xl flex flex-col transition-transform duration-300 ${
            profileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Profile</span>
            <button
              onClick={() => setProfileOpen(false)}
              className="w-7 h-7 rounded-lg bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-start pt-10 px-6">
            {/* Large logo */}
            <div className="w-28 h-28 rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/40 mb-5">
              {company?.logoPreview ? (
                <img src={company.logoPreview} alt="logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center text-white text-4xl font-black">
                  {company?.name?.[0]?.toUpperCase() || "C"}
                </div>
              )}
            </div>

            <h2 className="text-white font-black text-xl text-center leading-tight">
              {company?.name || "Your Company"}
            </h2>
            <p className="text-white/30 text-xs mt-1">Company Portal</p>

            <div className="mt-8 w-full space-y-3">
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-semibold">Active</span>
                </div>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-1">Member Since</p>
                <p className="text-white text-sm font-semibold">June 2025</p>
              </div>
            </div>

            <div className="mt-6 w-full bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <p className="text-orange-400/70 text-[10px] uppercase tracking-widest font-semibold mb-1">Note</p>
              <p className="text-white/40 text-xs leading-relaxed">
                Your emergency contact and company details have been securely submitted to our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar2;