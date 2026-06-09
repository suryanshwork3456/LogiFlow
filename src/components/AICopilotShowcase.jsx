// filepath: src/components/AICopilotShowcase.jsx
import React from 'react';
import { Send, Bot, BarChart2, Leaf, Users, AlertTriangle } from 'lucide-react';

export default function AICopilotShowcase() {
  return (
    <section id="ai-copilot" className="bg-[#FFFFFF] py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-[#1A1A2E] rounded-[2rem] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-20 shadow-2xl relative">
          {/* Chat UI Mockup */}
          <div className="w-full lg:w-1/2" data-reveal="true">
            <div className="bg-[#0F0F1E] rounded-3xl border border-[rgba(255,255,255,0.05)] overflow-hidden shadow-2xl relative z-10 block">
            <div className="bg-[rgba(255,255,255,0.02)] px-6 py-4 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
              <span className="ml-auto text-xs font-bold text-[rgba(255,255,255,0.4)] uppercase tracking-widest">LogiFlow AI Copilot</span>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              {/* Turn 1 User */}
              <div className="flex justify-end">
                <div className="bg-[rgba(255,255,255,0.08)] text-[#FFFFFF] p-4 rounded-2xl rounded-tr-sm max-w-[85%] text-sm md:text-base">
                  <p>Which driver has the most delays this week?</p>
                </div>
              </div>
              
              {/* Turn 1 AI */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF5722] rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <Bot className="text-[#FFFFFF]" size={20} />
                </div>
                <div className="bg-[rgba(255,87,34,0.12)] border-l-[3px] border-l-[#FF5722] text-[#FFFFFF] p-4 rounded-2xl rounded-tl-sm max-w-[85%] text-sm md:text-base leading-relaxed">
                  <p>📊 Driver Amar Singh — 4 delays (avg +22 min).</p>
                  <p className="mt-1">Cause: Sector 14 traffic 2–4 PM.</p>
                  <p className="mt-1">Suggest: Reassign his afternoon routes.</p>
                </div>
              </div>

              {/* Turn 2 User */}
              <div className="flex justify-end">
                <div className="bg-[rgba(255,255,255,0.08)] text-[#FFFFFF] p-4 rounded-2xl rounded-tr-sm max-w-[85%] text-sm md:text-base">
                  <p>Optimize tomorrow's morning dispatch</p>
                </div>
              </div>

              {/* Turn 2 AI */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF5722] rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <Bot className="text-[#FFFFFF]" size={20} />
                </div>
                <div className="bg-[rgba(255,87,34,0.12)] border-l-[3px] border-l-[#FF5722] text-[#FFFFFF] p-4 rounded-2xl rounded-tl-sm max-w-[85%] text-sm md:text-base leading-relaxed">
                  <p>✅ 8 routes optimized.</p>
                  <p className="mt-1">Saving: ₹1,840 + 3.2 hrs fleet time.</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex gap-3 overflow-x-auto pb-3 mb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full border border-[#FF5722] text-[#FF5722] text-xs font-bold hover:bg-[#FF5722] hover:text-[#FFFFFF] transition-colors">Yield Analysis</button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full border border-[#FF5722] text-[#FF5722] text-xs font-bold hover:bg-[#FF5722] hover:text-[#FFFFFF] transition-colors">Risk Mitigation</button>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] rounded-xl px-4 py-3 border border-[rgba(255,255,255,0.1)] flex justify-between items-center mt-2 group focus-within:border-[#FF5722] transition-colors">
                <input type="text" placeholder="Ask your logistics AI..." className="bg-transparent border-none outline-none text-[#FFFFFF] w-full text-sm placeholder-[rgba(255,255,255,0.3)]" disabled />
                <button className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-[#FFFFFF] shrink-0 hover:bg-[#FF7043] transition-colors ml-3 cursor-pointer">
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 text-left" data-reveal="true" data-delay="200">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FFFFFF] mb-6">
            Ask Anything.<br/>Know Everything.
          </h2>
          <p className="text-[rgba(255,255,255,0.7)] text-lg mb-10 leading-relaxed font-medium">
            Stop digging through spreadsheets. LogiFlow AI understands your business context, fleet history, and global supply chain conditions to give you answers in seconds.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center gap-3 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-default group">
              <BarChart2 className="text-[#FF5722]" size={20} />
              <span className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider group-hover:text-[#FF5722] transition-colors">Yield Analysis</span>
            </div>
            <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center gap-3 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-default group">
              <Leaf className="text-[#FF5722]" size={20} />
              <span className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider group-hover:text-[#FF5722] transition-colors">Carbon Report</span>
            </div>
            <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center gap-3 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-default group">
              <Users className="text-[#FF5722]" size={20} />
              <span className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider group-hover:text-[#FF5722] transition-colors">Driver Safety</span>
            </div>
            <div className="p-4 border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center gap-3 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-default group">
              <AlertTriangle className="text-[#FF5722]" size={20} />
              <span className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider group-hover:text-[#FF5722] transition-colors">Risk Mitigation</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
