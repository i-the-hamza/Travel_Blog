import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

// Initialize Stripe on the client side
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Redirect to Stripe checkout
export const redirectToCheckout = async (priceId) => {
  try {
    // Create a checkout session on the server
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });
    
    const { url } = await response.json();
    
    // Redirect to checkout
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};

// Define subscription plans
export const subscriptionPlans = [
  {
    name: 'Monthly',
    description: 'Access to all premium blog content with monthly billing',
    price: '$9.99',
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID, // Set in .env
    features: [
      'Full access to all blog posts',
      'Premium travel guides',
      'Monthly billing',
      'Cancel anytime',
    ],
  },
  {
    name: 'Annual',
    description: 'Access to all premium blog content with annual billing (save 16%)',
    price: '$99.99',
    priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID, // Set in .env
    features: [
      'Full access to all blog posts',
      'Premium travel guides',
      'Annual billing (save 16%)',
      'Cancel anytime',
    ],
    recommended: true,
  },
]; 