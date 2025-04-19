import Image from "next/image";
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getBlogs() {
  try {
    // In a real app, this would be a server-side fetch from the database
    // For now, we'll use mock data
    return {
      blogs: [
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
        }
      ],
      countries: ['Japan', 'Tanzania', 'Switzerland', 'Italy', 'Mexico', 'Australia', 'Peru', 'France']
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { blogs: [], countries: [] };
  }
}

export default async function Home() {
  const { blogs, countries } = await getBlogs();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
          alt="Travel the world"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore the World Through My Eyes
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Join me on my journey across continents, discovering new cultures, cuisines, and breathtaking landscapes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/blog" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Read My Blogs
            </Link>
            <Link href="/pricing" className="bg-white hover:bg-gray-100 text-indigo-600 px-6 py-3 rounded-md font-medium transition-colors">
              Get Premium Access
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Blogs Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Travel Stories</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dive into some of my most memorable adventures from around the globe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative h-48">
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                    {blog.isPremium && (
                      <div className="absolute top-0 right-0 m-4 bg-indigo-600 text-white px-2 py-1 text-xs font-medium rounded">
                        Premium
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <div className="mb-2">
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                          {blog.country}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{blog.title}</h3>
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {blog.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${blog.slug}`} 
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                  >
                    Read more
                    <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              View All Travel Stories
            </Link>
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore by Destination</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover stories from countries around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {countries.map((country) => (
              <Link 
                key={country}
                href={`/blog?country=${country}`}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center shadow hover:shadow-md hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all"
              >
                <span className="text-gray-900 dark:text-white font-medium">{country}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-white">Stay Updated with My Adventures</h2>
              <p className="mt-4 text-xl text-indigo-100">
                Subscribe to my newsletter to get notified about new travel stories and exclusive content.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-transparent rounded-md focus:ring-2 focus:ring-white focus:border-white sm:max-w-xs"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-indigo-200">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
