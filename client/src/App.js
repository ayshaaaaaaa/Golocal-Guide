import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import TouristDashboard from './pages/tourist/TouristDashboard';
import GuideDashboard from './pages/guide/GuideDashboard';
import BusinessDashboard from './pages/business/BusinessDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/tourist-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Tourist']}>
            <TouristDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/guide-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Guide']}>
            <GuideDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/business-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <BusinessDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {({ user }) => {
              switch (user.role) {
                case 'Tourist':
                  return <Navigate to="/tourist-dashboard" replace />;
                case 'Guide':
                  return <Navigate to="/guide-dashboard" replace />;
                case 'Business Owner':
                  return <Navigate to="/business-dashboard" replace />;
                default:
                  return <Navigate to="/" replace />;
              }
            }}
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

