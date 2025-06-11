'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, CalculatorIcon, StarIcon, ArrowRightOnRectangleIcon, UserIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { restaurantTweaks, tweakCategories, calculateROI } from '../../data/tweaks';

export default function ChecklistPage() {
  const [user, setUser] = useState(null);
  const [checkedTweaks, setCheckedTweaks] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [avgSpend, setAvgSpend] = useState(25);
  const [guestsPerDay, setGuestsPerDay] = useState(100);
  const [expandedTweak, setExpandedTweak] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('guestGetterUser');
    if (!userData) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (!parsedUser.isAuthenticated) {
      router.push('/');
      return;
    }

    setUser(parsedUser);
    setCheckedTweaks(new Set(parsedUser.checkedTweaks || []));
    setLoading(false);
  }, [router]);

  const toggleTweak = (tweakId) => {
    const newChecked = new Set(checkedTweaks);
    if (newChecked.has(tweakId)) {
      newChecked.delete(tweakId);
    } else {
      newChecked.add(tweakId);
    }
    setCheckedTweaks(newChecked);
    
    // Save progress
    const updatedUser = {
      ...user,
      checkedTweaks: Array.from(newChecked)
    };
    localStorage.setItem('guestGetterUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleSignOut = () => {
    localStorage.removeItem('guestGetterUser');
    router.push('/');
  };

  const filteredTweaks = selectedCategory === 'All' 
    ? restaurantTweaks 
    : restaurantTweaks.filter(tweak => tweak.category === selectedCategory);

  const totalPotentialIncrease = Array.from(checkedTweaks)
    .map(id => restaurantTweaks.find(t => t.id === id))
    .reduce((total, tweak) => {
      if (!tweak) return total;
      const percentMatch = tweak.impact.match(/(\d+\.?\d*)/);
      const percent = percentMatch ? parseFloat(percentMatch[1]) : 0;
      return total + percent;
    }, 0);
    
  const estimatedAnnualIncrease = (avgSpend * (totalPotentialIncrease / 100) * guestsPerDay * 365);
  
  const getCategoryClass = (category) => {
    const classMap = {
      'Menu Design & Psychology': 'category-menu',
      'Pricing Strategy': 'category-pricing',
      'Service & Upselling': 'category-service',
      'Ambiance & Environment': 'category-ambiance',
      'Customer Experience': 'category-experience',
      'Operations & Efficiency': 'category-operations'
    };
    return classMap[category] || 'category-menu';
  };

  const completionPercentage = Math.round((checkedTweaks.size / restaurantTweaks.length) * 100);

  const roiData = calculateROI(checkedTweaks.size, avgSpend, guestsPerDay);

  // Format numbers with commas for better readability
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sage-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sage-600">Loading your checklist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-sage-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/guest-getter-logo-light.png" 
                alt="Guest Getter" 
                className="h-10 w-auto"
              />
              <span className="text-sage-600 text-sm">•</span>
              <span className="text-sage-700 font-medium">Restaurant Growth Checklist</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 text-sage-600">
                  <UserIcon className="w-4 h-4" />
                  <span>Welcome, {user?.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <ChartBarIcon className="w-4 h-4" />
                  <span>{completionPercentage}% Complete</span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-sage-600 hover:text-sage-800 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Banner */}
      <section className="bg-gradient-to-r from-sage-600 to-sage-700 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{checkedTweaks.size}/50</div>
              <div className="text-sage-200">Tweaks Implemented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{completionPercentage}%</div>
              <div className="text-sage-200">Progress Complete</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">+{totalPotentialIncrease.toFixed(1)}%</div>
              <div className="text-sage-200">Potential Revenue Increase</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="bg-sage-500 rounded-full h-2">
              <motion.div
                className="bg-amber-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-warm-amber-50 rounded-xl p-8 border border-warm-amber-200"
          >
            <div className="flex items-center mb-6">
              <CalculatorIcon className="w-6 h-6 text-warm-amber-600 mr-3" />
              <h2 className="text-2xl font-bold text-sage-900">Your ROI Calculator</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Average Spend per Guest ($)
                </label>
                <input
                  type="number"
                  value={avgSpend}
                  onChange={(e) => setAvgSpend(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-2">
                  Guests per Day
                </label>
                <input
                  type="number"
                  value={guestsPerDay}
                  onChange={(e) => setGuestsPerDay(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-warm-amber-500 focus:border-transparent"
                />
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-warm-amber-300">
                <div className="text-sm text-sage-600 mb-1">Estimated Annual Increase</div>
                <div className="text-2xl font-bold text-warm-amber-600">
                  {formatCurrency(estimatedAnnualIncrease)}
                </div>
                <div className="text-sm text-sage-500">
                  {checkedTweaks.size} tweaks selected ({totalPotentialIncrease.toFixed(1)}% increase)
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-cream-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-warm-amber-500 text-white'
                  : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
              }`}
            >
              All Categories
            </button>
            {tweakCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-warm-amber-500 text-white'
                    : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tweaks Checklist */}
      <section id="tweaks" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              Your Growth Checklist
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Check off tweaks as you implement them and watch your potential ROI grow. Track your progress and see real results.
            </p>
          </div>
          
          <div className="space-y-4">
            {filteredTweaks.map((tweak, index) => (
              <motion.div
                key={tweak.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`tweak-card ${checkedTweaks.has(tweak.id) ? 'checked' : ''}`}
                onClick={() => toggleTweak(tweak.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {checkedTweaks.has(tweak.id) ? (
                      <CheckCircleSolid className="w-6 h-6 text-warm-amber-500" />
                    ) : (
                      <CheckCircleIcon className="w-6 h-6 text-sage-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-sage-900 mb-1">
                          {tweak.title}
                        </h3>
                        <span className={getCategoryClass(tweak.category)}>
                          {tweak.category}
                        </span>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium text-warm-amber-600">
                          {tweak.impact}
                        </div>
                        <div className="text-xs text-sage-500">
                          {tweak.difficulty} • {tweak.timeToImplement}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sage-600 mb-3">
                      {tweak.description}
                    </p>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedTweak(expandedTweak === tweak.id ? null : tweak.id);
                      }}
                      className="flex items-center text-sm text-warm-amber-600 hover:text-warm-amber-700 font-medium"
                    >
                      {expandedTweak === tweak.id ? 'Hide Details' : 'Show Details'}
                      {expandedTweak === tweak.id ? (
                        <ChevronUpIcon className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedTweak === tweak.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-sage-200"
                        >
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-sage-700 mb-1">Implementation:</p>
                              <p className="text-sage-600 mb-3">{tweak.implementation}</p>
                              
                              <p className="font-medium text-sage-700 mb-1">Source:</p>
                              <p className="text-sage-600">{tweak.source}</p>
                            </div>
                            
                            <div>
                              <p className="font-medium text-sage-700 mb-2">ROI for Your Restaurant:</p>
                              <div className="bg-sage-50 rounded-lg p-3">
                                {(() => {
                                  const roi = calculateROI(tweak, avgSpend, guestsPerDay);
                                  return (
                                    <div className="space-y-1">
                                      <div className="flex justify-between">
                                        <span>Daily:</span>
                                        <span className="font-medium">{formatCurrency(roi.dailyIncrease)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Monthly:</span>
                                        <span className="font-medium">{formatCurrency(roi.monthlyIncrease)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Annual:</span>
                                        <span className="font-bold text-warm-amber-600">{formatCurrency(roi.annualIncrease)}</span>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
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
            
            <div>
              <h4 className="font-semibold mb-4">Your Progress</h4>
              <ul className="space-y-2 text-sm text-sage-300">
                <li>• {checkedTweaks.size} tweaks implemented</li>
                <li>• {completionPercentage}% complete</li>
                <li>• {formatCurrency(estimatedAnnualIncrease)} potential annual increase</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Academic Sources</h4>
              <p className="text-sm text-sage-300">
                Research from Cornell, MIT, Harvard, Stanford, University of Chicago, Tel Aviv University, and more.
              </p>
            </div>
          </div>
          
          <div className="border-t border-sage-700 pt-8 text-center">
            <p className="text-sage-300 mb-2">
              All strategies are backed by peer-reviewed research from leading universities.
            </p>
            <p className="text-sm text-sage-400">
              © 2025 Guest Getter. Brought to you by Guest Getter - Restaurant Growth Experts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 