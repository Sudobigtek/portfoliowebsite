import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePermissions from '../hooks/usePermissions';
import LoadingScreen from './LoadingScreen';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = usePermissions();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
