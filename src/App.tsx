import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/components/context/ThemeContext";
import { AuthProvider, useAuth } from "@/components/context/AuthContext";

import AuthPage from "@/components/pages/AuthPage";
import Dashboard from "@/components/pages/Dashboard";
import ExplorePage from "@/components/pages/ExplorePage";
import PathwayPage from "@/components/pages/PathwayPage";
import TokensPage from "@/components/pages/TokensPage";
import ProfilePage from "@/components/pages/ProfilePage";
import SettingsPage from "@/components/pages/SettingsPage";
import NotFound from "@/components/pages/NotFound";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Checking authentication...
        </p>
      </div>
    );

  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster />

              <Routes>
                {/* Public */}
                <Route path="/" element={<AuthPage />} />

                {/* Protected */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/explore"
                  element={
                    <PrivateRoute>
                      <ExplorePage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/pathway"
                  element={
                    <PrivateRoute>
                      <PathwayPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/tokens"
                  element={
                    <PrivateRoute>
                      <TokensPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <SettingsPage />
                    </PrivateRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
