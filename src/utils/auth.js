import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

// Check if user is authenticated in server components
export async function getAuthSession() {
  return await getServerSession(authOptions);
}

// Middleware function to check if user is authenticated
export async function requireAuth() {
  const session = await getAuthSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return session;
}

// Middleware function to check if user is admin
export async function requireAdmin() {
  const session = await getAuthSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  if (session.user.role !== 'admin') {
    redirect('/'); // Redirect to home if not admin
  }
  
  return session;
}

// Middleware function to check if user has paid subscription
export async function requireSubscription() {
  const session = await getAuthSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  if (!session.user.isPaid) {
    redirect('/pricing'); // Redirect to pricing page
  }
  
  return session;
} 