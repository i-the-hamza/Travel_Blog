import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe from '@/lib/stripe';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Subscription from '@/models/Subscription';

export async function POST(req) {
  const body = await req.text();
  const headersList = headers();
  const signature = headersList.get('stripe-signature');

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json(
      { message: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Connect to database
  await dbConnect();

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Handle successful checkout
async function handleCheckoutSessionCompleted(session) {
  try {
    // Get user from metadata
    const userId = session.metadata.userId;
    
    if (!userId) {
      console.error('No userId in session metadata');
      return;
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      return;
    }
    
    // If subscription was purchased, user is now paid
    if (session.mode === 'subscription') {
      user.isPaid = true;
      await user.save();
    }
  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription) {
  try {
    const customerId = subscription.customer;
    
    // Find user with this Stripe customer ID
    const user = await User.findOne({ stripeCustomerId: customerId });
    
    if (!user) {
      console.error(`User not found with Stripe customer ID: ${customerId}`);
      return;
    }
    
    // Update user's paid status based on subscription status
    user.isPaid = subscription.status === 'active' || subscription.status === 'trialing';
    await user.save();
    
    // Update or create subscription record
    await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      {
        userId: user._id,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCustomerId: customerId,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

// Handle subscription deletions
async function handleSubscriptionDeleted(subscription) {
  try {
    const customerId = subscription.customer;
    
    // Find user with this Stripe customer ID
    const user = await User.findOne({ stripeCustomerId: customerId });
    
    if (!user) {
      console.error(`User not found with Stripe customer ID: ${customerId}`);
      return;
    }
    
    // Update user's paid status
    user.isPaid = false;
    await user.save();
    
    // Update subscription record
    await Subscription.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      {
        status: subscription.status,
        cancelAtPeriodEnd: true,
      }
    );
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
} 