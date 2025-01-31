import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return { isAuthenticated, loading, login, logout };
};

export const useRequireAuth = (redirectTo = '/admin/login') => {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  return { isAuthenticated, loading };
};

export const useAuthRedirect = (redirectTo = '/admin/dashboard') => {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  return { isAuthenticated, loading };
};

export const useAuthActions = () => {
  const { login, logout, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const success = await login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return {
    handleLogin,
    handleLogout,
    user
  };
};

export const usePermissions = () => {
  const { user } = useAuthContext();

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const checkPermissions = (requiredPermissions) => {
    if (!Array.isArray(requiredPermissions)) {
      requiredPermissions = [requiredPermissions];
    }
    return requiredPermissions.every(hasPermission);
  };

  return {
    hasPermission,
    checkPermissions,
    permissions: user?.permissions || []
  };
}; 