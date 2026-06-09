// filepath: src/components/Testimonials.jsx
import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      initials: "MT",
      name: "Marcus Thorne",
      role: "COO, Global Freight",
      quote: "The transition from manual tracking to LogiFlow was seamless. We've seen a 15% reduction in fuel costs within just the first quarter."
    },
    {
      initials: "SC",
      name: "Sarah Chen",
      role: "Director of Logistics, AeroPort",
      quote: "The AI Copilot is a game changer. Being able to ask natural questions about my fleet while on the road saves me hours of analysis every week."
    },
    {
      initials: "JM",
      name: "Jameson Miller",
      role: "Founder, LastMile Express",
      quote: "Reliability is everything in this business. LogiFlow provides the most accurate ETAs we've ever had, which has drastically improved client satisfaction."
    }
  ];

  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16" data-reveal="true">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-4">Fleet Operators Love LogiFlow</h2>
          <p className="text-lg text-[#555F6D] font-medium">Trusted by industry leaders across 4 continents.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, idx) => (
            <div 
              key={idx} 
              className="bg-[#1A1A2E] p-8 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              data-reveal="true" 
              data-stagger="true"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FF5722" stroke="none" />
                ))}
              </div>
              <p className="text-[rgba(255,255,255,0.8)] font-medium leading-relaxed italic flex-grow mb-8 text-lg">"{testi.quote}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF5722] text-[#FFFFFF] flex items-center justify-center font-extrabold text-lg">
                  {testi.initials}
                </div>
                <div>
                  <div className="font-bold text-[#FFFFFF]">{testi.name}</div>
                  <div className="text-xs font-bold text-[rgba(255,255,255,0.5)] uppercase tracking-wider">{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
