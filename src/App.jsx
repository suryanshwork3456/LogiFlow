// filepath: src/App.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RiderDashboard from "./pages/rider/RiderDashboard.jsx";
import RiderMap from "./pages/rider/RiderMap.jsx";
import RiderFeedback from "./pages/rider/RiderFeedback.jsx";

// Company Pages
import CompanyDashboard from "./pages/company/CompanyDashboard.jsx";
import CompanyOperations from "./pages/company/CompanyOperations.jsx";
import CompanyMap from "./pages/company/CompanyMap.jsx";
import CompanyFeedback from "./pages/company/CompanyFeedback.jsx";
import CompanyDeliveries from "./pages/company/CompanyDeliveries.jsx";
import CompanyAnalytics from "./pages/company/CompanyAnalytics.jsx";
import CompanyAlerts from "./pages/company/CompanyAlerts.jsx";

// Public Components
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import StatsBar from "./components/StatsBar.jsx";
import FeaturesGrid from "./components/FeaturesGrid.jsx";
import AICopilotShowcase from "./components/AICopilotShowcase.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Testimonials from "./components/Testimonials.jsx";
import CTABand from "./components/CTABand.jsx";
import Footer from "./components/Footer.jsx";
import useScrollReveal from "./hooks/useScrollReveal.js";

// Admin Layout
import AdminLayout from "./components/admin/AdminLayout.jsx";

// Admin Pages
import ControlTowerPage from "./pages/admin/ControlTowerPage.jsx";
import LiveTrackingPage from "./pages/admin/LiveTrackingPage.jsx";
import AIDelayPredictionPage from "./pages/admin/AIDelayPredictionPage.jsx";
import RouteOptimizationPage from "./pages/admin/RouteOptimizationPage.jsx";
import SmartAlertsPage from "./pages/admin/SmartAlertsPage.jsx";
import ShipmentFeedPage from "./pages/admin/ShipmentFeedPage.jsx";

// Auth Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

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

      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route
        path="/admin/control-tower"
        element={
          <AdminLayout>
            <ControlTowerPage />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/live-tracking"
        element={
          <AdminLayout>
            <LiveTrackingPage />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/ai-prediction"
        element={
          <AdminLayout>
            <AIDelayPredictionPage />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/route-optimization"
        element={
          <AdminLayout>
            <RouteOptimizationPage />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/smart-alerts"
        element={
          <AdminLayout>
            <SmartAlertsPage />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/shipment-feed"
        element={
          <AdminLayout>
            <ShipmentFeedPage />
          </AdminLayout>
        }
      />

      {/* Rider */}
      <Route path="/rider/dashboard" element={<RiderDashboard />} />
      <Route path="/rider/map" element={<RiderMap />} />
      <Route path="/rider/feedback" element={<RiderFeedback />} />

      {/* Company */}
      <Route path="/company/dashboard" element={<CompanyDashboard />} />

      <Route
        path="/company/operations"
        element={<CompanyOperations />}
      />

      <Route path="/company/map" element={<CompanyMap />} />

      <Route
        path="/company/feedback"
        element={<CompanyFeedback />}
      />

      <Route
        path="/company/deliveries"
        element={<CompanyDeliveries />}
      />

      <Route
        path="/company/analytics"
        element={<CompanyAnalytics />}
      />

      <Route
        path="/company/alerts"
        element={<CompanyAlerts />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}