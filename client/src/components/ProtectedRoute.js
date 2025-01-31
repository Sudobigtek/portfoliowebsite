import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRequireAuth } from '../hooks/useAuth';
import LoadingScreen from './LoadingScreen';
import { usePermissions } from '../hooks/usePermissions';

const ProtectedRoute = ({ children, permissions = [], redirectTo = '/admin/login' }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useRequireAuth(redirectTo);
  const { checkPermissions } = usePermissions();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (permissions.length > 0 && !checkPermissions(permissions)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
