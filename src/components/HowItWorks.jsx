// filepath: src/components/HowItWorks.jsx
import React from 'react';
import { Plug, Upload, Brain, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Plug size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "1. Connect",
      desc: "Integrate your existing GPS hardware or use our mobile driver app."
    },
    {
      icon: <Upload size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "2. Import",
      desc: "Sync your ERP and warehouse management data with one click."
    },
    {
      icon: <Brain size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "3. AI Plans",
      desc: "LogiFlow analyzes your historical data to suggest optimizations."
    },
    {
      icon: <Rocket size={32} strokeWidth={1.5} color="#FFFFFF" />,
      title: "4. Go Live",
      desc: "Launch your dashboard and watch your efficiency metrics climb."
    }
  ];

  return (
    <section id = "solutions" className="py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-20" data-reveal="true">
          Seamless Integration in <span className="text-[#FF5722]">4 Steps</span>
        </h2>
        
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-[36px] left-[12%] right-[12%] z-0 pointer-events-none" style={{ borderTop: '2px dashed #FF5722', opacity: 0.4 }}></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center w-full md:w-1/4" data-reveal="true" data-stagger="true">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 z-10 relative bg-[#FF5722] shadow-[0_8px_24px_rgba(255,87,34,0.3)]">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-[#1A1A2E] mb-3">{step.title}</h4>
              <p className="text-[#555F6D] font-medium px-4 max-w-[280px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
