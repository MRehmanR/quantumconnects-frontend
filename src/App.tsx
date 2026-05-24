import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppAssistantChatbot from "@/components/AppAssistantChatbot";

import NotFound from "./pages/NotFound";
import Home from "./pages/landing/Home";
import FeaturesPage from "./pages/landing/Features";
import PricingPage from "./pages/landing/Pricing";
import AboutPage from "./pages/landing/About";
import ContactPage from "./pages/landing/Contact";
import AffiliatesPage from "./pages/landing/Affiliates";
import WhiteLabelPage from "./pages/landing/WhiteLabel";
import IndustriesListingPage from "./pages/landing/IndustriesListing";
import IndustriesPage from "./pages/landing/Industries";
import TestimonialsPage from "./pages/landing/Testimonials";
import FAQPage from "./pages/landing/FAQ";
import BookDemoPage from "./pages/landing/BookDemo";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OnboardingBuyNumber from "./pages/auth/OnboardingBuyNumber";
import OnboardingSetup from "./pages/auth/OnboardingSetup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Customer Dashboard
import DashboardOverview from "./pages/dashboard/Overview";
import CallLogs from "./pages/dashboard/CallLogs";
import KnowledgeBase from "./pages/dashboard/KnowledgeBase";
import Appointments from "./pages/dashboard/Appointments";
import Billing from "./pages/dashboard/Billing";
import Settings from "./pages/dashboard/Settings";

// Admin Dashboard
import AdminOverview from "./pages/admin/Overview";
import AdminUsers from "./pages/admin/Users";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminAnalytics from "./pages/admin/Analytics";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function RequireAuth({ allowedRoles }: { allowedRoles: Array<"user" | "admin"> }) {
  const token = localStorage.getItem("qc_auth_token");
  const role = localStorage.getItem("qc_user_role") as "user" | "admin" | null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return <Outlet />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/affiliates" element={<AffiliatesPage />} />
          <Route path="/white-label" element={<WhiteLabelPage />} />
          <Route path="/industries" element={<IndustriesListingPage />} />
          <Route path="/industries/:slug" element={<IndustriesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Customer Dashboard */}
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/onboarding/setup" element={<OnboardingSetup />} />
            <Route path="/onboarding/phone-number" element={<OnboardingBuyNumber />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/calls" element={<CallLogs />} />
            <Route path="/dashboard/appointments" element={<Appointments />} />
            <Route path="/dashboard/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/dashboard/billing" element={<Billing />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          {/* Admin Dashboard */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <AppAssistantChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
