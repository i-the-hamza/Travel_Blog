import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';

// GET a single blog by slug
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }
    
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    const isPaid = session?.user?.isPaid;
    
    await dbConnect();
    
    const blog = await Blog.findOne({ slug, published: true })
      .populate('author', 'name image')
      .lean();
    
    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }
    
    // If blog is premium and user is not paid, limit content
    if (blog.isPremium && !isPaid) {
      return NextResponse.json({
        ...blog,
        content: blog.excerpt + '... [Subscribe to read more]',
        isPremiumContent: true
      });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { message: 'Error fetching blog' },
      { status: 500 }
    );
  }
}

// PUT to update a blog (admin only)
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { slug } = params;
    const data = await request.json();
    
    await dbConnect();
    
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }
    
    // Update blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      { ...data, updatedAt: new Date() },
      { new: true }
    );
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { message: 'Error updating blog' },
      { status: 500 }
    );
  }
}

// DELETE a blog (admin only)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { slug } = params;
    
    await dbConnect();
    
    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }
    
    await Blog.deleteOne({ slug });
    
    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { message: 'Error deleting blog' },
      { status: 500 }
    );
  }
} 