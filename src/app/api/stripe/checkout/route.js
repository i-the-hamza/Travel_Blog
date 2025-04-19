import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import stripe from '@/lib/stripe';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in.' },
        { status: 401 }
      );
    }
    
    const { priceId } = await req.json();
    
    if (!priceId) {
      return NextResponse.json(
        { message: 'Price ID is required' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Get the user from the database
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create or retrieve the customer
    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      // Create a new customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user._id.toString(),
        },
      });
      
      customerId = customer.id;
      
      // Update user with Stripe customer ID
      user.stripeCustomerId = customerId;
      await user.save();
    }
    
    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId: user._id.toString(),
      },
    });
    
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { message: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 