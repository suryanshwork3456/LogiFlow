// filepath: src/components/HeroSection.jsx
import React, { useState,useRef } from 'react';
import { ArrowRight, PlayCircle, MapPin } from 'lucide-react';
import Modal from './Modal.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('early-access');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const videoRef = useRef(null);

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };
  const openDemoModal = () => {
    setIsDemoOpen(true);
    // thoda delay taki modal render ho jaye phir play call ho
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 0);
  };
  const closeDemoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // dubara se start ke liye
    }
    setIsDemoOpen(false);
  };

  return (
    <section id="home" className="relative pt-20 pb-24 overflow-hidden bg-[#FFFFFF]">
      <div className="world-bg absolute inset-0 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Hero Content */}
        <div className="w-full lg:w-[55%] pt-10" data-reveal="true">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5722]/10 border border-[#FF5722]/20 rounded-full mb-8">
            <span className="w-2.5 h-2.5 bg-[#FF5722] rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-[#FF5722] tracking-wider uppercase">Smart Logistics Platform</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] mb-6 leading-tight">
            Move <span className="text-[#FF5722]">Smarter</span>, Deliver Faster, Everywhere.
          </h1>
          
          <p className="text-lg text-[#555F6D] mb-10 max-w-xl leading-relaxed font-medium">
            Harness the power of AI-driven orchestration to optimize your entire supply chain in real-time. Reduced costs, maximized uptime, and global visibility in one dashboard.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-14">
            <button onClick={() => {
                setIsOpen(false);
                navigate('/login');}}
                className="px-8 py-4 bg-[#FF5722] text-[#FFFFFF] font-bold rounded-lg shadow-xl hover:bg-[#FF7043] transition-all flex items-center gap-2 text-lg">
              Get Started Free <ArrowRight size={20} />
            </button>
            <button onClick={openDemoModal} className="px-8 py-4 border-2 border-[#E0E0E0] text-[#1A1A2E] font-bold rounded-lg hover:border-[#1A1A2E] transition-all flex items-center gap-2 text-lg bg-[#FFFFFF]">
              <PlayCircle size={20} /> Watch Live Demo
            </button>
             {isDemoOpen && (
              <div
             className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={closeDemoModal}
              >
             <div
              className="bg-white rounded-xl p-4 max-w-xl w-full"
             onClick={(e) => e.stopPropagation()} 
             >
              <div className="flex justify-between items-center mb-2">
               <h2 className="font-semibold text-lg">Demo Video</h2>
              <button onClick={closeDemoModal} className="text-sm text-gray-500">
                Close
              </button>
            </div>

            <video
              ref={videoRef}
              controls
              className="w-full rounded-lg"
            >
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
          </div>
          
          <div className="flex flex-wrap items-center gap-6 border-t border-[#E0E0E0] pt-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="font-bold text-[#555F6D]">2,400+ Deliveries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="font-bold text-[#555F6D]">94% On-Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="font-bold text-[#555F6D]">38% Fuel Saved</span>
            </div>
          </div>
        </div>

        {/* Right Card / Map Visual */}
        <div className="w-full lg:w-[45%] relative" data-reveal="true" data-delay="300">
          <div className="bg-[#1A1A2E] rounded-3xl p-6 shadow-2xl border border-[rgba(255,255,255,0.1)] relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#FF5722]" size={24} />
                <span className="font-bold text-[#FFFFFF] text-xl">Control Tower</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#4CAF50]/20 text-[#4CAF50] rounded-full border border-[#4CAF50]/30">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider">LIVE</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[rgba(255,255,255,0.05)] p-3 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <div className="text-[10px] text-[#FFFFFF]/60 uppercase mb-1 font-bold tracking-wider">🚛 Fleet</div>
                <div className="text-sm md:text-base font-bold text-[#FFFFFF]">24 Active</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] p-3 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <div className="text-[10px] text-[#FFFFFF]/60 uppercase mb-1 font-bold tracking-wider">⏱ Avg ETA</div>
                <div className="text-sm md:text-base font-bold text-[#4CAF50]">18 min</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] p-3 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <div className="text-[10px] text-[#FFFFFF]/60 uppercase mb-1 font-bold tracking-wider">🔔 Alerts</div>
                <div className="text-sm md:text-base font-bold text-[#FF9800]">2 Alerts</div>
              </div>
            </div>

            {/* Pure CSS Map inside Card (no image) */}
            <div className="h-52 bg-[#0A0A16] rounded-xl overflow-hidden relative border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
              {/* CSS Grid for Map "feel" */}
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)', backgroundSize: '16px 16px', opacity: 0.8 }}></div>
              
              {/* Route Line SVG */}
              <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 30 70 Q 50 30 70 40" fill="none" stroke="#FF5722" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                <style>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>
              </svg>

              {/* Waypoints */}
              <div className="absolute left-[30%] top-[70%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_15px_#FF5722]"></div>
                <div className="absolute inset-0 border-2 border-[#FF5722] rounded-full animate-ping scale-[2]"></div>
              </div>

              <div className="absolute left-[70%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-[#FF5722] rounded-full shadow-[0_0_15px_#FF5722]"></div>
                <div className="absolute inset-0 border-2 border-[#FF5722] rounded-full animate-ping scale-[2]" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
            {/* AI Insight */}
            <div className="mt-5 bg-[#FF5722]/10 border-l-4 border-[#FF5722] rounded-r-lg p-4 flex items-center gap-4">
              <span className="text-[20px] leading-none mt-0.5">⚠️</span>
              <div className="text-xs text-[#FFFFFF] leading-relaxed">
                <span className="font-bold text-[#FF5722]">Route 7 Alert:</span> 82% delay probability detected. AI reroute suggested.
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />
    </section>
  );
}
