import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Board from "../pages/Board";
import { useAuthStore } from "../store/authStore";

// Protected routes

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading:authLoading } = useAuthStore();

  if (authLoading) {
    return null; // or a loader
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

// Naviate Route
const NavigateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading:authLoading } = useAuthStore();

  if (authLoading) {
    return null; // or a loader
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
// App routes

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={
          <NavigateRoute>
          <Signin />
          </NavigateRoute>
        } />
        <Route path="/signup" element={
          <NavigateRoute>
          <Signup />
          </NavigateRoute>
        } />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/boards/:id"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
