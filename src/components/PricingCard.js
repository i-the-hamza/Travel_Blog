"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirectToCheckout } from '@/utils/stripe';

export default function PricingCard({ plan }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!session) {
      window.location.href = '/auth/signin?callbackUrl=/pricing';
      return;
    }

    try {
      setIsLoading(true);
      await redirectToCheckout(plan.priceId);
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 border ${plan.recommended ? 'border-indigo-500' : 'border-gray-200 dark:border-gray-700'}`}>
      {plan.recommended && (
        <div className="bg-indigo-500 text-white text-center py-2 font-medium text-sm">
          Recommended
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {plan.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {plan.description}
        </p>
        
        <p className="mb-6">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {plan.price}
          </span>
          {plan.name === 'Monthly' && (
            <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
          )}
          {plan.name === 'Annual' && (
            <span className="text-gray-500 dark:text-gray-400 ml-1">/year</span>
          )}
        </p>
        
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={handleSubscribe}
          disabled={isLoading || (session?.user?.isPaid)}
          className={`w-full py-3 px-4 rounded-md font-medium text-white ${
            plan.recommended
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors
          ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}
          ${session?.user?.isPaid ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? 'Processing...' : session?.user?.isPaid ? 'Already subscribed' : 'Subscribe now'}
        </button>
      </div>
    </div>
  );
} 