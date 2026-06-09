// filepath: src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

import ControlTowerPage from './pages/ControlTowerPage.jsx';
import LiveTrackingPage from './pages/LiveTrackingPage.jsx';
import AIDelayPredictionPage from './pages/AIDelayPredictionPage.jsx';
import RouteOptimizationPage from './pages/RouteOptimizationPage.jsx';
import SmartAlertsPage from './pages/SmartAlertsPage.jsx';
import ShipmentFeedPage from './pages/ShipmentFeedPage.jsx';

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
      <Route path="/" element={<HomePage />} />
      <Route path="/control-tower" element={<ControlTowerPage />} />
      <Route path="/live-tracking" element={<LiveTrackingPage />} />
      <Route path="/ai-prediction" element={<AIDelayPredictionPage />} />
      <Route path="/route-optimization" element={<RouteOptimizationPage />} />
      <Route path="/smart-alerts" element={<SmartAlertsPage />} />
      <Route path="/shipment-feed" element={<ShipmentFeedPage />} />
    </Routes>
  );
}
