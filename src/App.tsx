import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "@/pages/Index";
import Activities from "@/pages/Activities";
import { ActivityDetails } from "@/pages/ActivityDetails";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ClubLogin from "@/pages/ClubLogin";
import ClubRegister from "@/pages/ClubRegister";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activity/:activityId" element={<ActivityDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/club">
              <Route path="login" element={<ClubLogin />} />
              <Route path="register" element={<ClubRegister />} />
            </Route>
            <Route path="/club-login" element={<Navigate to="/club/login" replace />} />
            <Route path="/club-register" element={<Navigate to="/club/register" replace />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;