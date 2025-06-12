'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signIn, signUp, signOut, getUserProgress, saveProgress } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState(new Set());

  useEffect(() => {
    // Get initial session
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      
      if (currentUser) {
        await loadUserProgress(currentUser.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async (userId) => {
    try {
      const { data, error } = await getUserProgress(userId);
      if (error) throw error;
      
      // Convert to Set of completed tweak IDs
      const completedTweaks = new Set(
        data?.filter(item => item.completed).map(item => item.tweak_id) || []
      );
      setUserProgress(completedTweaks);
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const handleSignUp = async (email, password, profileData = {}) => {
    try {
      const { data, error } = await signUp(email, password, profileData);
      if (error) throw error;
      
      // Set user state immediately after successful signup
      if (data.user) {
        setUser(data.user);
        await loadUserProgress(data.user.id);
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      
      setUser(data.user);
      await loadUserProgress(data.user.id);
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      setUser(null);
      setUserProgress(new Set());
      
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const toggleTweakCompletion = async (tweakId) => {
    if (!user) return;

    const isCurrentlyCompleted = userProgress.has(tweakId);
    const newCompletionState = !isCurrentlyCompleted;

    try {
      // Optimistically update UI
      setUserProgress(prev => {
        const newSet = new Set(prev);
        if (newCompletionState) {
          newSet.add(tweakId);
        } else {
          newSet.delete(tweakId);
        }
        return newSet;
      });

      // Save to database
      const { error } = await saveProgress(user.id, tweakId, newCompletionState);
      if (error) throw error;
      
    } catch (error) {
      console.error('Error updating progress:', error);
      // Revert optimistic update
      setUserProgress(prev => {
        const newSet = new Set(prev);
        if (isCurrentlyCompleted) {
          newSet.add(tweakId);
        } else {
          newSet.delete(tweakId);
        }
        return newSet;
      });
    }
  };

  const value = {
    user,
    loading,
    userProgress,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    toggleTweakCompletion,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 