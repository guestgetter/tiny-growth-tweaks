'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Star, TrendingUp, Users, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Redirect to home if not authenticated
    if (!loading && !user) {
      router.push('/');
      return;
    }
    
    // Small delay for better UX
    if (user) {
      setTimeout(() => setIsReady(true), 500);
    }
  }, [user, loading, router]);

  const handleGetStarted = () => {
    router.push('/checklist');
  };

  if (loading || !user || !isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-warm-amber-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-warm-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-warm-amber-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Welcome Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-sage-900 mb-4"
          >
            🎉 Welcome Aboard!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-sage-700 mb-8 max-w-2xl mx-auto"
          >
            You now have access to <strong>52 research-backed strategies</strong> that successful restaurants use to increase revenue by an average of <strong>23%</strong>.
          </motion.p>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-amber-100 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-warm-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-sage-900 mb-2">Proven Results</h3>
              <p className="text-sage-600 text-sm">Each strategy is backed by real restaurant data and research</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-sage-900 mb-2">One Per Week</h3>
              <p className="text-sage-600 text-sm">Implement one strategy per week for sustainable, manageable growth</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-sage-900 mb-2">Actionable Strategies</h3>
              <p className="text-sage-600 text-sm">Each tweak includes clear implementation steps and success metrics</p>
            </div>
          </motion.div>

          {/* What's Inside Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-sage-100 mb-8"
          >
            <h2 className="text-2xl font-bold text-sage-900 mb-6">What's Inside Your Checklist</h2>
            
            {/* Progress Preview */}
            <div className="bg-sage-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-sage-700">Your Progress</span>
                <span className="text-sm text-sage-500">0/52 strategies completed</span>
              </div>
              <div className="w-full bg-sage-200 rounded-full h-2">
                <div className="bg-warm-amber-500 h-2 rounded-full w-0 transition-all duration-300"></div>
              </div>
              <p className="text-xs text-sage-500 mt-2">Ready to start improving your restaurant!</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-warm-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sage-900">Menu Psychology Tweaks</h4>
                  <p className="text-sm text-sage-600">Strategic item placement and naming for +27% sales</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-warm-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sage-900">Customer Experience Hacks</h4>
                  <p className="text-sm text-sage-600">Simple changes that increase return visits by +19%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-warm-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sage-900">Revenue Optimization</h4>
                  <p className="text-sm text-sage-600">Pricing and upselling strategies that work</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-warm-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sage-900">Operational Efficiency</h4>
                  <p className="text-sm text-sage-600">Reduce costs while improving service quality</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center space-x-3 bg-warm-amber-500 text-white px-8 py-4 rounded-xl hover:bg-warm-amber-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span>Access Your 52 Strategies</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sage-500 text-sm mt-4">
              Start with Week 1 and improve your restaurant one strategy at a time
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-sage-200"
          >
            <div className="flex items-center justify-center space-x-2 text-sage-500">
              <img 
                src="/guest-getter-logo-light.png" 
                alt="Guest Getter" 
                className="h-6 w-auto opacity-60"
              />
              <span className="text-sm">Powered by Guest Getter</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 