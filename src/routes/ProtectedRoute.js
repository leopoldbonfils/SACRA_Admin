import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROUTES } from './routeConfig';
import Loader from '../components/common/Loader';

/**
 * ProtectedRoute – redirects unauthenticated users to /login.
 * Renders a full-screen loader while the auth state is being resolved.
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *
 * Optionally restrict by role:
 *   <Route element={<ProtectedRoute requiredRole="admin" />}>
 */
const ProtectedRoute = ({ requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
