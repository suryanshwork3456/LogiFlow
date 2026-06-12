// filepath: src/components/HowItWorks.jsx

import React from "react";
import {
  Zap,
  DollarSign,
  ShieldCheck,
  Globe,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Zap size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "⚡ Faster Decision Making",
      desc: "Gain actionable insights instantly with centralized logistics intelligence.",
    },
    {
      icon: <DollarSign size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "💰 Lower Operational Costs",
      desc: "Reduce waste, optimize resources, and improve profitability.",
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "🛡 Proactive Risk Management",
      desc: "Identify disruptions early and respond before they impact deliveries.",
    },
    {
      icon: <Globe size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "🌍 Built to Scale",
      desc: "Expand operations confidently with infrastructure designed to grow with your business.",
    },
  ];

  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6"
          data-reveal="true"
        >
          Why Leading Logistics Teams Choose{" "}
          <span className="text-[#FF5722]">LogiFlow</span>
        </h2>

        <p
          className="max-w-3xl mx-auto text-[#555F6D] text-lg font-medium mb-20"
          data-reveal="true"
        >
          More than tracking. LogiFlow empowers businesses to make smarter
          decisions, reduce costs, and scale operations with confidence.
        </p>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
          {/* Progress Line */}
          <div
            className="hidden md:block absolute top-[36px] left-[12%] right-[12%] z-0 pointer-events-none"
            style={{
              borderTop: "2px dashed #FF5722",
              opacity: 0.4,
            }}
          ></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center w-full md:w-1/4"
              data-reveal="true"
              data-stagger="true"
            >
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 z-10 relative bg-[#FF5722] shadow-[0_8px_24px_rgba(255,87,34,0.3)]">
                {step.icon}
              </div>

              <h4 className="text-xl font-bold text-[#1A1A2E] mb-3 px-4">
                {step.title}
              </h4>

              <p className="text-[#555F6D] font-medium px-4 max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}