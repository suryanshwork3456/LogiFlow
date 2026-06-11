// // filepath: src/components/FeaturesGrid.jsx
// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { LayoutDashboard, MapPin, TrendingUp, Truck, Bell, MessageSquare, ArrowRight } from 'lucide-react';

// export default function FeaturesGrid() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const scrollToAICopilot = (e) => {
//     e.preventDefault();
//     if (location.pathname === '/') {
//       document.getElementById('ai-copilot')?.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       navigate('/');
//       setTimeout(() => {
//         document.getElementById('ai-copilot')?.scrollIntoView({ behavior: 'smooth' });
//       }, 150);
//     }
//   };

//   const features = [
//     {
//       icon: <LayoutDashboard size={32} strokeWidth={1.5} />,
//       title: "Control Tower",
//       desc: "Unified view of your entire global operations with predictive bottleneck detection.",
//       to: "/control-tower"
//     },
//     {
//       icon: <MapPin size={32} strokeWidth={1.5} />,
//       title: "Live Tracking",
//       desc: "Ultra-precise GPS telemetry with 5-second updates and historical replay capability.",
//       to: "/live-tracking"
//     },
//     {
//       icon: <TrendingUp size={32} strokeWidth={1.5} />,
//       title: "AI Prediction",
//       desc: "Machine learning models that forecast demand and predict ETA within a 15-minute window.",
//       to: "/ai-prediction"
//     },
//     {
//       icon: <Truck size={32} strokeWidth={1.5} />,
//       title: "Route Optimization",
//       desc: "Multi-stop route planning that reduces fuel consumption and mileage by up to 22%.",
//       to: "/route-optimization"
//     },
//     {
//       icon: <Bell size={32} strokeWidth={1.5} />,
//       title: "Smart Alerts",
//       desc: "Instant triggers for geofencing, temperature deviations, or unexpected vehicle stops.",
//       to: "/smart-alerts"
//     },
//     {
//       icon: <MessageSquare size={32} strokeWidth={1.5} />,
//       title: "AI Copilot",
//       desc: "Natural language interface to query any logistics data and generate instant reports.",
//       onClick: scrollToAICopilot
//     }
//   ];

//   return (
//     <section className="py-24 bg-[#FFFFFF] relative overflow-hidden">
//       <div className="world-bg absolute inset-0 pointer-events-none"></div>
      
//       <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
//         <div className="text-center mb-16" data-reveal="true">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6">
//             Everything Your Fleet Needs to <span className="text-[#FF5722]">Perform</span>
//           </h2>
//           <div className="w-24 h-1.5 bg-[#FF5722] mx-auto rounded-full"></div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, idx) => {
//             const content = (
//               <div 
//                 className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E0E0E0] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-[#FF5722] transition-all duration-300 group cursor-pointer relative h-full flex flex-col text-left"
//               >
//                 <div className="text-[#FF5722] mb-6 inline-block">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">{feature.title}</h3>
//                 <p className="text-[#555F6D] leading-relaxed font-medium flex-grow">{feature.desc}</p>
                
//                 <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#FF5722]">
//                   <ArrowRight size={20} />
//                 </div>
//               </div>
//             );

//             return (
//               <div key={idx} data-reveal="true" data-stagger="true" className="h-full">
//                 {feature.to ? (
//                   <Link to={feature.to} className="block h-full outline-none">
//                     {content}
//                   </Link>
//                 ) : (
//                   <div onClick={feature.onClick} className="block h-full outline-none" role="button" tabIndex={0}>
//                     {content}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
//After Edit Code
// filepath: src/components/FeaturesGrid.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MapPin, TrendingUp, Truck, Bell, MessageSquare } from 'lucide-react';

export default function FeaturesGrid() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToAICopilot = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('ai-copilot')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('ai-copilot')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const features = [
    {
      icon: <LayoutDashboard size={32} strokeWidth={1.5} />,
      title: "Control Tower",
      desc: "Unified view of your entire global operations with predictive bottleneck detection.",
    },
    {
      icon: <MapPin size={32} strokeWidth={1.5} />,
      title: "Live Tracking",
      desc: "Ultra-precise GPS telemetry with 5-second updates and historical replay capability.",
    },
    {
      icon: <TrendingUp size={32} strokeWidth={1.5} />,
      title: "AI Prediction",
      desc: "Machine learning models that forecast demand and predict ETA within a 15-minute window.",
    },
    {
      icon: <Truck size={32} strokeWidth={1.5} />,
      title: "Route Optimization",
      desc: "Multi-stop route planning that reduces fuel consumption and mileage by up to 22%.",
    },
    {
      icon: <Bell size={32} strokeWidth={1.5} />,
      title: "Smart Alerts",
      desc: "Instant triggers for geofencing, temperature deviations, or unexpected vehicle stops.",
    },
    {
      icon: <MessageSquare size={32} strokeWidth={1.5} />,
      title: "AI Copilot",
      desc: "Natural language interface to query any logistics data and generate instant reports.",
      onClick: scrollToAICopilot
    }
  ];

  return (
    <section id="fleet" className="py-24 bg-[#FFFFFF] relative overflow-hidden">
      <div className="world-bg absolute inset-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16" data-reveal="true">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E] mb-6">
            Everything Your Fleet Needs to <span className="text-[#FF5722]">Perform</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#FF5722] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              data-reveal="true"
              data-stagger="true"
              onClick={feature.onClick}
              className={`bg-[#FFFFFF] p-8 rounded-3xl border border-[#E0E0E0] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-[#FF5722] transition-all duration-300 group text-left ${feature.onClick ? 'cursor-pointer' : ''}`}
            >
              <div className="text-[#FF5722] mb-6 inline-block">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">{feature.title}</h3>
              <p className="text-[#555F6D] leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}