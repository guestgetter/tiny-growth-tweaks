'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Building, MapPin, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function SignupModal({ isOpen, onClose, title, subtitle, onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    restaurantName: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Pass all form data to signUp function
      const profileData = {
        name: formData.name,
        phone: formData.phone,
        restaurantName: formData.restaurantName,
        city: formData.city
      };
      
      const { data, error: signUpError } = await signUp(formData.email, formData.password, profileData);
      
      if (signUpError) {
        setError(signUpError.message || 'Failed to create account. Please try again.');
        return;
      }

      // Success - close modal and redirect to welcome page
      handleClose();
      router.push('/welcome');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      restaurantName: '',
      city: ''
    });
    setIsSubmitting(false);
    setError('');
    onClose();
  };

  const handleSwitchToSignIn = () => {
    handleClose();
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
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
          className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
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
                {title || 'Get Your Free Checklist'}
              </h2>
              <p className="text-sage-600">
                {subtitle || 'Join 5,000+ restaurants increasing revenue with science-backed strategies'}
              </p>
              <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-sage-500">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No Credit Card</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant Access</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="Create a password"
                    required
                    minLength="6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Restaurant Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="Your restaurant name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-warm-amber-500 transition-colors"
                    placeholder="Your city"
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
                disabled={isSubmitting || !formData.name || !formData.email || !formData.password}
                className="w-full bg-warm-amber-500 text-white py-3 px-6 rounded-lg hover:bg-warm-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Get My Free Checklist</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sage-600 text-sm">
                Already have an account?{' '}
                <button
                  onClick={handleSwitchToSignIn}
                  className="text-warm-amber-600 hover:text-warm-amber-700 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-sage-500">
                By signing up, you agree to receive helpful restaurant growth tips. 
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 