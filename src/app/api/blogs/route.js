import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';

// GET all blogs with filtering options
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    const isPaid = session?.user?.isPaid;
    
    await dbConnect();
    
    // Build query object
    let query = { published: true };
    
    if (country) {
      query.country = country;
    }
    
    if (tag) {
      query.tags = tag;
    }
    
    // Get total count for pagination
    const totalBlogs = await Blog.countDocuments(query);
    
    // Get blogs
    let blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name image')
      .lean();
    
    // If user is not paid, filter out premium content from full blog posts
    blogs = blogs.map(blog => {
      // If blog is premium and user is not paid, remove the main content
      if (blog.isPremium && !isPaid) {
        return {
          ...blog,
          content: blog.excerpt + '... [Subscribe to read more]',
          isPremiumContent: true
        };
      }
      return blog;
    });
    
    return NextResponse.json({
      blogs,
      pagination: {
        total: totalBlogs,
        page,
        limit,
        pages: Math.ceil(totalBlogs / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Error fetching blogs' },
      { status: 500 }
    );
  }
}

// POST a new blog (protected route for admins)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in and is an admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    
    await dbConnect();
    
    // Create slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }
    
    // Set the author to the current user
    data.author = session.user.id;
    
    // Create the blog
    const blog = await Blog.create(data);
    
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: 'Error creating blog', error: error.message },
      { status: 500 }
    );
  }
} 