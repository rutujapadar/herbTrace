import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SupplyChainTrackingDashboard from './pages/supply-chain-tracking-dashboard';
import LaboratoryTestingInterface from './pages/laboratory-testing-interface';
import RegulatoryComplianceDashboard from './pages/regulatory-compliance-dashboard';
import ConsumerProductVerification from './pages/consumer-product-verification';
import UserRegistrationLogin from './pages/user-registration-login';
import CollectorDashboard from './pages/collector-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CollectorDashboard />} />
        <Route path="/supply-chain-tracking-dashboard" element={<SupplyChainTrackingDashboard />} />
        <Route path="/laboratory-testing-interface" element={<LaboratoryTestingInterface />} />
        <Route path="/regulatory-compliance-dashboard" element={<RegulatoryComplianceDashboard />} />
        <Route path="/consumer-product-verification" element={<ConsumerProductVerification />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/collector-dashboard" element={<CollectorDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
