'use client';

import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { subscriptionPlans } from '@/utils/stripe';

export default function PricingPage() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-indigo-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Premium Access to Travel Adventures
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Unlock the full travel experience with premium content, detailed guides, and insider tips.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Value proposition */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Subscribe?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Full Access
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get unrestricted access to all travel blogs, including premium content and detailed guides.
                </p>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Exclusive Content
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access exclusive travel tips, hidden gems, and insider knowledge not available to regular visitors.
                </p>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Direct Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ask questions directly and get personalized travel advice from experienced travelers.
                </p>
              </div>
            </div>
          </div>
          
          {/* Subscription plans */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Choose Your Plan
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : session?.user?.isPaid ? (
            <div className="text-center max-w-2xl mx-auto bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                You're a Premium Member!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Thank you for your subscription. You now have access to all premium content across the site.
              </p>
              <a 
                href="/blog" 
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Browse Premium Blogs
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subscriptionPlans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          )}
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Can I cancel my subscription anytime?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  What's included in the premium content?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Premium content includes detailed travel guides, insider tips, accommodation recommendations, budget planners, and exclusive stories not available in the free content.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  How do I access premium content after subscribing?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Once your payment is processed, your account will be automatically upgraded to premium status. Simply stay logged in to access all premium content.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Is there a refund policy?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If you're not satisfied with your subscription within the first 7 days, contact us for a full refund. After that period, we don't offer refunds for partial subscription periods.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Can I switch between monthly and annual plans?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can switch between plans at any time. If you upgrade, the new plan will start immediately. If you downgrade, the new plan will start after your current billing period ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 