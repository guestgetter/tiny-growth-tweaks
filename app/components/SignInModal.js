'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('Attempting sign in with:', email);
      const { data, error: signInError } = await signIn(email, password);
      
      console.log('Sign in response:', { data, signInError });
      
      if (signInError) {
        console.error('Sign in error:', signInError);
        setError(signInError.message || 'Failed to sign in. Please check your credentials.');
        return;
      }

      // Success - close modal and redirect
      handleClose();
      router.push('/checklist');
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSwitchToSignUp = () => {
    handleClose();
    if (onSwitchToSignUp) {
      onSwitchToSignUp();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <img 
                src="/guest-getter-logo-light.png" 
                alt="Guest Getter" 
                className="h-10 w-auto"
              />
              <button
                onClick={handleClose}
                className="text-sage-400 hover:text-sage-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-sage-900 mb-2">
                Welcome Back!
              </h2>
              <p className="text-sage-600">
                Sign in to access your restaurant growth checklist
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !email || !password}
                className="w-full bg-warm-amber-500 text-white py-3 px-6 rounded-lg hover:bg-warm-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sage-600 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={handleSwitchToSignUp}
                  className="text-warm-amber-600 hover:text-warm-amber-700 font-medium"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 