// filepath: src/components/Navbar.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    setActiveSection(sectionId);

    if (location.pathname === "/") {
      if (sectionId === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/");

      setTimeout(() => {
        if (sectionId === "home") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    }
  };

  const navButtonClass = (section) =>
    activeSection === section
      ? "text-[#FF5722] border-b-2 border-[#FF5722] pb-1 transition-all"
      : "text-[#555F6D] hover:text-[#FF5722] transition-colors pb-1";

  return (
    <nav
      id="navbar"
      className="fixed top-0 w-full z-50 bg-[#FFFFFF] transition-all duration-300 py-6 px-6 md:px-10 border-b border-[#E0E0E0]"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-2xl md:text-3xl font-bold tracking-tighter text-[#1A1A2E]"
        >
          Logi<span className="text-[#FF5722]">Flow</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center font-semibold text-sm uppercase tracking-wide">
          <button
            onClick={() => scrollToSection("home")}
            className={navButtonClass("home")}
          >
            HOME
          </button>

          <button
            onClick={() => scrollToSection("solutions")}
            className={navButtonClass("solutions")}
          >
            SOLUTIONS
          </button>

          <button
            onClick={() => scrollToSection("fleet")}
            className={navButtonClass("fleet")}
          >
            FLEET
          </button>

          <button
            onClick={() => scrollToSection("ai-copilot")}
            className={navButtonClass("ai-copilot")}
          >
            AI COPILOT
          </button>

          <button
            onClick={() => scrollToSection("why-logiflow")}
            className={navButtonClass("why-logiflow")}
          >
            WHY LOGIFLOW
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 text-sm font-bold">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-[#FF5722] text-[#FFFFFF] rounded-lg hover:bg-[#FF7043] transition-all"
          >
            Sign in
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#1A1A2E]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FFFFFF] shadow-lg border-t border-[#E0E0E0] p-6 flex flex-col gap-6 font-semibold uppercase tracking-wide">
          <button
            onClick={() => scrollToSection("home")}
            className="text-left text-[#555F6D] hover:text-[#FF5722] transition-colors pb-2 border-b border-[#E0E0E0]"
          >
            HOME
          </button>

          <button
            onClick={() => scrollToSection("solutions")}
            className="text-left text-[#555F6D] hover:text-[#FF5722] transition-colors pb-2 border-b border-[#E0E0E0]"
          >
            SOLUTIONS
          </button>

          <button
            onClick={() => scrollToSection("fleet")}
            className="text-left text-[#555F6D] hover:text-[#FF5722] transition-colors pb-2 border-b border-[#E0E0E0]"
          >
            FLEET
          </button>

          <button
            onClick={() => scrollToSection("ai-copilot")}
            className="text-left text-[#555F6D] hover:text-[#FF5722] transition-colors pb-2 border-b border-[#E0E0E0]"
          >
            AI COPILOT
          </button>

          <button
            onClick={() => scrollToSection("why-logiflow")}
            className="text-left text-[#555F6D] hover:text-[#FF5722] transition-colors pb-2 border-b border-[#E0E0E0]"
          >
            WHY LOGIFLOW
          </button>

          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="py-3 w-full bg-[#FF5722] text-[#FFFFFF] rounded-lg text-center"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}