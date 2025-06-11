'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, Users, DollarSign, Star, Clock, BookOpen, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SignupModal from './components/SignupModal';
import SignInModal from './components/SignInModal';

export default function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const userData = localStorage.getItem('guestGetterUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.isAuthenticated) {
        router.push('/checklist');
      }
    }
  }, [router]);

  const handleSwitchToSignIn = () => {
    setShowSignup(false);
    setShowSignIn(true);
  };

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignup(true);
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Increase Revenue by 15-30%",
      description: "Cornell University research shows simple menu tweaks can boost sales by 8.15% instantly"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Improve Customer Experience",
      description: "Science-backed ambiance and service techniques that keep guests coming back"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Reduce Costs & Waste",
      description: "Operational efficiency tweaks that cut expenses while maintaining quality"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "One Week Per Tweak",
      description: "Manageable pace with one strategy per week. No overwhelm, just steady, sustainable growth all year long"
    }
  ];

  const socialProof = [
    { stat: "15-30%", label: "Average Revenue Increase" },
    { stat: "52", label: "Weekly Tweaks (Full Year)" },
    { stat: "5,000+", label: "Restaurants Transformed" },
    { stat: "1 Week", label: "Per Tweak Implementation" }
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Owner, Bella Vista Italian",
      quote: "Just removing dollar signs from our menu increased average order value by $12. These tiny tweaks made a huge difference!",
      increase: "+18% Revenue"
    },
    {
      name: "James Chen",
      role: "Manager, Downtown Bistro",
      quote: "The ambient lighting and music suggestions transformed our dinner rush. Customers stay 25% longer now.",
      increase: "+25% Table Turns"
    },
    {
      name: "Sarah Williams",
      role: "Owner, Farm Fresh Cafe",
      quote: "I implemented 12 tweaks in one weekend. Within a month, we saw our best numbers ever. The ROI calculator was spot on.",
      increase: "+32% Profit"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-100 to-amber-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-sage-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/guest-getter-logo-light.png" 
                alt="Guest Getter" 
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSignIn(true)}
                className="flex items-center space-x-2 text-sage-700 hover:text-sage-900 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-sage-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sage-600 text-sm">•</span>
            <span className="text-sage-700 font-medium">Restaurant Growth Resource</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSignup(true)}
              className="bg-sage-700 text-white px-6 py-2 rounded-lg hover:bg-sage-800 transition-colors font-medium"
            >
              Get Free Access
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Based on Academic Research from Cornell, Harvard & MIT</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-sage-800 mb-6 leading-tight">
              52 Tiny Restaurant Tweaks
              <span className="text-amber-600 block">One Per Week for a Full Year</span>
            </h1>
            
            <p className="text-xl text-sage-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your restaurant with one manageable, science-backed micro-change each week. 
              52 proven strategies that increase revenue 15-30% without overwhelming your team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                onClick={() => setShowSignup(true)}
                className="bg-sage-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sage-700 transition-colors flex items-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Your Free Checklist</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <p className="text-sage-500 text-sm">
                ✨ Free • No Credit Card • Instant Access
              </p>
            </div>
            
            <p className="text-sage-500 text-sm">
              Already have an account?{' '}
              <button 
                onClick={() => setShowSignIn(true)}
                className="text-sage-600 hover:text-sage-800 font-medium underline"
              >
                Sign in to continue
              </button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {socialProof.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-sage-800 mb-2">
                  {item.stat}
                </div>
                <div className="text-sage-600 font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-800 mb-4">
              Why These Tiny Tweaks Work So Well
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Each recommendation is backed by peer-reviewed research from top universities 
              and proven in real-world restaurant environments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-sage-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-sage-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-sage-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="px-6 py-20 bg-sage-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Your 52-Week Transformation Plan
            </h2>
            <p className="text-xl text-sage-200 max-w-3xl mx-auto">
              52 research-backed tweaks organized into 6 categories. Implement one per week for sustainable, manageable growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Menu Design & Psychology",
                count: "13 Tweaks",
                description: "Remove dollar signs, optimize descriptions, strategic naming"
              },
              {
                title: "Pricing Strategy",
                count: "10 Tweaks", 
                description: "Charm pricing, decoy effects, bundle optimization"
              },
              {
                title: "Service & Upselling",
                count: "10 Tweaks",
                description: "Server training, suggestion timing, order enhancement"
              },
              {
                title: "Ambiance & Environment",
                count: "8 Tweaks",
                description: "Lighting, music, seating, sensory optimization"
              },
              {
                title: "Customer Experience",
                count: "7 Tweaks",
                description: "Wait times, personalization, feedback systems"
              },
              {
                title: "Operations & Efficiency",
                count: "4 Tweaks",
                description: "Kitchen workflow, inventory, staff productivity"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-sage-700/50 p-6 rounded-lg border border-sage-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-400 font-semibold text-sm">
                    {category.count}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {category.title}
                </h3>
                <p className="text-sage-200 text-sm">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-800 mb-4">
              Real Results from Real Restaurants
            </h2>
            <p className="text-xl text-sage-600">
              See how other restaurant owners are using these tweaks to transform their business
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl border border-sage-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <blockquote className="text-sage-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sage-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sage-500 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonial.increase}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 bg-gradient-to-r from-sage-600 to-sage-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Restaurant?
            </h2>
            <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
              Get instant access to all 50 research-backed tweaks, plus an ROI calculator 
              to track your revenue increases. Implementation starts today.
            </p>
            
            <motion.button
              onClick={() => setShowSignup(true)}
              className="bg-amber-500 text-sage-800 px-10 py-4 rounded-lg text-xl font-bold hover:bg-amber-400 transition-colors flex items-center space-x-2 mx-auto shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Your Free Checklist Now</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            
            <div className="flex items-center justify-center space-x-6 mt-8 text-sage-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>100% Free</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-sage-800 text-sage-200 border-t border-sage-700">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/guest-getter-logo-light.png" 
                alt="Guest Getter" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-sage-300 text-sm">
                Transforming hospitality through behavioral science and data-driven growth strategies.
              </p>
            </div>
          </div>
          <p className="text-xs text-sage-400">
            © 2025 Guest Getter. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
        title="Get Your Free Checklist"
        subtitle="Join 5,000+ restaurants increasing revenue with science-backed strategies"
        onSwitchToSignIn={handleSwitchToSignIn}
      />

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignIn} 
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </div>
  );
} 