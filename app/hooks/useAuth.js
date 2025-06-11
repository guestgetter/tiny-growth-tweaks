'use client';

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('guestGetterUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.isAuthenticated) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    const userWithAuth = {
      ...userData,
      isAuthenticated: true,
      checkedTweaks: [],
      signupDate: new Date().toISOString()
    };
    
    localStorage.setItem('guestGetterUser', JSON.stringify(userWithAuth));
    setUser(userWithAuth);
    return userWithAuth;
  };

  const logout = () => {
    localStorage.removeItem('guestGetterUser');
    setUser(null);
  };

  const updateProgress = (checkedTweaks) => {
    if (user) {
      const updatedUser = {
        ...user,
        checkedTweaks: Array.from(checkedTweaks)
      };
      localStorage.setItem('guestGetterUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const isAuthenticated = () => {
    return user && user.isAuthenticated;
  };

  return {
    user,
    loading,
    login,
    logout,
    updateProgress,
    isAuthenticated: isAuthenticated()
  };
}; 