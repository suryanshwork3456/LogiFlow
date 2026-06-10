
// Previous Code-Before Update (for reference):
// // filepath: src/App.jsx
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// // Layout & Global Components
// import Navbar from './components/Navbar.jsx';
// import HeroSection from './components/HeroSection.jsx';
// import StatsBar from './components/StatsBar.jsx';
// import FeaturesGrid from './components/FeaturesGrid.jsx';
// import AICopilotShowcase from './components/AICopilotShowcase.jsx';
// import HowItWorks from './components/HowItWorks.jsx';
// import Testimonials from './components/Testimonials.jsx';
// import CTABand from './components/CTABand.jsx';
// import Footer from './components/Footer.jsx';
// import useScrollReveal from './hooks/useScrollReveal.js';

// // Feature Pages
// import ControlTowerPage from './pages/ControlTowerPage.jsx';
// import LiveTrackingPage from './pages/LiveTrackingPage.jsx';
// import AIDelayPredictionPage from './pages/AIDelayPredictionPage.jsx';
// import RouteOptimizationPage from './pages/RouteOptimizationPage.jsx';
// import SmartAlertsPage from './pages/SmartAlertsPage.jsx';
// import ShipmentFeedPage from './pages/ShipmentFeedPage.jsx';

// // Auth Pages (Merged)
// import Login from "./pages/Login.jsx"; // Added .jsx extension for consistency
// import Register from "./pages/Register.jsx";

// // Home Page Component
// function HomePage() {
//   useScrollReveal();

//   return (
//     <div className="min-h-screen flex flex-col pt-20">
//       <Navbar />
//       <main className="flex-grow">
//         <HeroSection />
//         <StatsBar />
//         <FeaturesGrid />
//         <AICopilotShowcase />
//         <HowItWorks />
//         <Testimonials />
//         <CTABand />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// // Main App Component with Merged Routes
// export default function App() {
//   return (
//     <Routes>
//       {/* Auth Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Main Application Routes */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/control-tower" element={<ControlTowerPage />} />
//       <Route path="/live-tracking" element={<LiveTrackingPage />} />
//       <Route path="/ai-prediction" element={<AIDelayPredictionPage />} />
//       <Route path="/route-optimization" element={<RouteOptimizationPage />} />
//       <Route path="/smart-alerts" element={<SmartAlertsPage />} />
//       <Route path="/shipment-feed" element={<ShipmentFeedPage />} />

//       {/* Fallback: Redirect any unknown routes back to home or login */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }
// After code for App.jsx
// filepath: src/App.jsx

// filepath: src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RiderDashboard from './pages/rider/RiderDashboard.jsx';
import CompanyDashboard from './pages/company/CompanyDashboard.jsx';
 

// Public Components
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import StatsBar from './components/StatsBar.jsx';
import FeaturesGrid from './components/FeaturesGrid.jsx';
import AICopilotShowcase from './components/AICopilotShowcase.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Testimonials from './components/Testimonials.jsx';
import CTABand from './components/CTABand.jsx';
import Footer from './components/Footer.jsx';
import useScrollReveal from './hooks/useScrollReveal.js';

// Add import
import DashboardPage from './pages/admin/DashboardPage.jsx';


// Admin Layout
import AdminLayout from './components/admin/AdminLayout.jsx';

// Admin Pages
import ControlTowerPage from './pages/admin/ControlTowerPage.jsx';
import LiveTrackingPage from './pages/admin/LiveTrackingPage.jsx';
import AIDelayPredictionPage from './pages/admin/AIDelayPredictionPage.jsx';
import RouteOptimizationPage from './pages/admin/RouteOptimizationPage.jsx';
import SmartAlertsPage from './pages/admin/SmartAlertsPage.jsx';
import ShipmentFeedPage from './pages/admin/ShipmentFeedPage.jsx';

// Auth Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function HomePage() {
  useScrollReveal();
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsBar />
        <FeaturesGrid />
        <AICopilotShowcase />
        <HowItWorks />
        <Testimonials />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminLayout><DashboardPage /></AdminLayout>} />
      {/* Admin Routes */}
      <Route path="/admin/control-tower" element={<AdminLayout><ControlTowerPage /></AdminLayout>} />
      <Route path="/admin/live-tracking" element={<AdminLayout><LiveTrackingPage /></AdminLayout>} />
      <Route path="/admin/ai-prediction" element={<AdminLayout><AIDelayPredictionPage /></AdminLayout>} />
      <Route path="/admin/route-optimization" element={<AdminLayout><RouteOptimizationPage /></AdminLayout>} />
      <Route path="/admin/smart-alerts" element={<AdminLayout><SmartAlertsPage /></AdminLayout>} />
      <Route path="/admin/shipment-feed" element={<AdminLayout><ShipmentFeedPage /></AdminLayout>} />
      {/* Rider Routes */}
<Route path="/rider/dashboard" element={<RiderDashboard />} />

{/* Company Routes */}
<Route path="/company/dashboard" element={<CompanyDashboard />} />



      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}