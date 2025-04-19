import { Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';

async function getBlogs(searchParams) {
  try {
    // In a real app, this would fetch from the API with searchParams
    // For now, we'll use mock data
    const country = searchParams?.country || '';
    const tag = searchParams?.tag || '';
    
    // Mock data - same as home page for now
    const blogs = [
      {
        _id: '1',
        title: 'Exploring the Ancient Temples of Japan',
        slug: 'exploring-ancient-temples-japan',
        excerpt: 'My journey through the historic temples of Kyoto and the cultural experiences that followed.',
        featuredImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
        country: 'Japan',
        tags: ['asia', 'temples', 'culture'],
        isPremium: true,
        createdAt: new Date().toISOString(),
        author: {
          name: 'John Doe',
          image: null
        }
      },
      {
        _id: '2',
        title: 'Safari Adventures in Tanzania',
        slug: 'safari-adventures-tanzania',
        excerpt: 'Witnessing the great migration in the Serengeti and camping under the stars.',
        featuredImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e',
        country: 'Tanzania',
        tags: ['africa', 'safari', 'wildlife'],
        isPremium: false,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        author: {
          name: 'John Doe',
          image: null
        }
      },
      {
        _id: '3',
        title: 'A Week in the Swiss Alps',
        slug: 'week-in-swiss-alps',
        excerpt: 'Hiking, skiing, and enjoying the breathtaking mountain views of Switzerland.',
        featuredImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12',
        country: 'Switzerland',
        tags: ['europe', 'mountains', 'hiking'],
        isPremium: true,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        author: {
          name: 'John Doe',
          image: null
        }
      },
      {
        _id: '4',
        title: 'The Culinary Delights of Italy',
        slug: 'culinary-delights-italy',
        excerpt: 'Exploring the diverse regional cuisines and learning traditional cooking methods in Italy.',
        featuredImage: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee',
        country: 'Italy',
        tags: ['europe', 'food', 'culture'],
        isPremium: false,
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        author: {
          name: 'John Doe',
          image: null
        }
      },
      {
        _id: '5',
        title: 'Exploring the Ancient Ruins of Mexico',
        slug: 'ancient-ruins-mexico',
        excerpt: 'Discovering the rich history and archaeological wonders of the Mayan civilization.',
        featuredImage: 'https://images.unsplash.com/photo-1512813389649-acb9131ced20',
        country: 'Mexico',
        tags: ['americas', 'history', 'archaeology'],
        isPremium: true,
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        author: {
          name: 'John Doe',
          image: null
        }
      },
      {
        _id: '6',
        title: 'Island Hopping in Greece',
        slug: 'island-hopping-greece',
        excerpt: 'From Santorini to Mykonos, experiencing the beauty of the Greek islands and their culture.',
        featuredImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
        country: 'Greece',
        tags: ['europe', 'islands', 'beaches'],
        isPremium: false,
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        author: {
          name: 'John Doe',
          image: null
        }
      }
    ];
    
    // Filter by country if provided
    const filteredBlogs = country
      ? blogs.filter(blog => blog.country === country)
      : tag
        ? blogs.filter(blog => blog.tags.includes(tag))
        : blogs;
    
    return {
      blogs: filteredBlogs,
      countries: ['Japan', 'Tanzania', 'Switzerland', 'Italy', 'Mexico', 'Greece', 'Australia', 'Peru', 'France'],
      popularTags: ['asia', 'europe', 'africa', 'americas', 'food', 'culture', 'beaches', 'mountains', 'wildlife']
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { blogs: [], countries: [], popularTags: [] };
  }
}

function BlogList({ blogs }) {
  return (
    <>
      {blogs.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">No blogs found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
}

function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md">
          <div className="h-60 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="p-5">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function BlogPage({ searchParams }) {
  const { blogs, countries, popularTags } = await getBlogs(searchParams);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Travel Blog</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Discover my adventures across the globe, from bustling cities to remote wilderness.
          </p>
        </div>
      </div>
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar filters */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filter by Country</h3>
                  <div className="space-y-2">
                    <Link href="/blog" className="block text-indigo-600 dark:text-indigo-400 font-medium">
                      All Countries
                    </Link>
                    {countries.map((country) => (
                      <Link
                        key={country}
                        href={`/blog?country=${country}`}
                        className={`block ${
                          searchParams?.country === country
                            ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                      >
                        {country}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag}`}
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                          searchParams?.tag === tag
                            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-medium'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-800/30'
                        }`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Blog posts grid */}
            <div className="mt-8 lg:mt-0 lg:col-span-9">
              {searchParams?.country && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Blogs from {searchParams.country}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Discover my adventures and experiences in {searchParams.country}.
                  </p>
                </div>
              )}
              
              {searchParams?.tag && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Blogs tagged with #{searchParams.tag}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore stories related to {searchParams.tag}.
                  </p>
                </div>
              )}
              
              <Suspense fallback={<BlogListSkeleton />}>
                <BlogList blogs={blogs} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 