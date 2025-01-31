import { useState, useEffect } from 'react';

const usePermissions = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (e.g., check for valid token)
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
  };
};

export default usePermissions; 