import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { formatDate } from '@/utils/format';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getBlog(slug) {
  // In a real app, this would fetch the blog from the API
  // For now, we'll use mock data
  const blogs = [
    {
      _id: '1',
      title: 'Exploring the Ancient Temples of Japan',
      slug: 'exploring-ancient-temples-japan',
      excerpt: 'My journey through the historic temples of Kyoto and the cultural experiences that followed.',
      content: `
# Exploring the Ancient Temples of Japan

Japan is a country steeped in tradition and history, and nowhere is this more evident than in the ancient temples of Kyoto. During my two-week visit to Japan, I dedicated five days to exploring the spiritual heart of the country.

## Fushimi Inari Shrine

My journey began at the iconic Fushimi Inari Shrine, famous for its thousands of vermilion torii gates. Arriving early in the morning allowed me to avoid the crowds and fully appreciate the peaceful atmosphere. The hike up the mountain through the tunnel of gates took about two hours, with beautiful views of Kyoto from various lookout points.

The shrine is dedicated to Inari, the Shinto god of rice, and you'll notice many fox statues throughout the complex – they're believed to be Inari's messengers.

## Kinkaku-ji (The Golden Pavilion)

No visit to Kyoto would be complete without seeing Kinkaku-ji, the Temple of the Golden Pavilion. The top two floors of this three-story structure are completely covered in gold leaf, creating a stunning reflection in the surrounding pond.

Originally built in 1397 as a retirement villa for Shogun Ashikaga Yoshimitsu, it later became a Zen temple. The current structure is actually a reconstruction from 1955, as the original was burned down by a monk in 1950.

## Ryoan-ji Temple

Ryoan-ji is home to Japan's most famous Zen rock garden. Consisting of 15 rocks arranged on a bed of white gravel, it's a masterpiece of minimalism. What I found most fascinating is that the garden is designed so that at least one rock is hidden from view no matter where you stand.

Sitting in contemplation here, I began to understand why this place has inspired meditation for centuries.

## Ginkaku-ji (The Silver Pavilion)

Despite its name, Ginkaku-ji was never actually covered in silver. It was intended to be, to contrast with Kinkaku-ji, but the plans were never completed. Nevertheless, the temple and its gardens are absolutely beautiful.

The carefully raked white sand garden, known as the "Sea of Silver Sand," features a large sand cone called "Moon Viewing Platform" which creates stunning shadows when the moon is bright.

## Cultural Experiences

Between temple visits, I participated in a traditional tea ceremony, tried Zen meditation at a local monastery, and stayed at a ryokan (traditional inn) with tatami floors and futon bedding.

The experience of bathing in an onsen (hot spring) was initially outside my comfort zone but became one of the most relaxing and authentic Japanese experiences.

## Final Thoughts

Japan's ancient temples offer more than just architectural beauty – they provide a window into the country's spiritual heritage and philosophical traditions. The attention to detail, from carefully placed rocks to meticulously maintained gardens, reflects the Japanese concept of "ma" – the appreciation of negative space.

I left Kyoto with a profound respect for Japan's ability to preserve its past while embracing the future, and a desire to return to explore even more of this fascinating country's sacred spaces.
      `,
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
      content: `
# Safari Adventures in Tanzania

The Serengeti plains of Tanzania offer one of the most spectacular wildlife experiences on Earth. During my recent two-week safari, I witnessed the Great Migration, encountered the Big Five, and experienced the unparalleled beauty of the African wilderness.

## The Great Migration

Timing my visit during the migration period was absolutely worth it. Watching over a million wildebeest, accompanied by hundreds of thousands of zebras and gazelles, traverse the plains in search of water and fresh grass was breathtaking. The sheer scale of this natural phenomenon is difficult to comprehend until you've seen it with your own eyes.

One morning, we witnessed a river crossing where hundreds of wildebeest braved crocodile-infested waters. The drama and intensity of these moments – the hesitation at the riverbank, the first brave animals taking the plunge, and the chaos that followed – is something I'll never forget.

## Big Five Encounters

Tanzania's northern circuit is one of the best places to see the "Big Five" (lion, leopard, elephant, buffalo, and rhinoceros), and I was fortunate enough to spot all of them.

The most memorable was a leopard sighting in the central Serengeti. Our guide spotted this elusive cat lounging in an acacia tree with an impala carcass safely stored in the branches. We watched for nearly an hour as it dozed in the afternoon sun, occasionally opening its eyes to survey its domain.

## Ngorongoro Crater

The Ngorongoro Crater, often described as Africa's Eden, lived up to its reputation. This extinct volcanic caldera creates a natural enclosure for an extraordinary concentration of wildlife. In a single day, we saw lions, elephants, hippos, flamingos, and even the endangered black rhino.

The viewpoint at the crater rim provides one of the most spectacular panoramas in Africa – looking down into this perfect natural habitat from 2,000 feet above.

## Camping Under African Skies

Choosing a mobile tented camp rather than a lodge was the best decision I made. Falling asleep to the sounds of the bush – distant lion roars, hyena calls, and the rustle of animals moving through the grass around camp – created an immersive experience.

One night, I lay awake watching shooting stars streak across the clearest sky I've ever seen, while a family of elephants grazed silently just beyond our camp perimeter. These are the moments no luxury lodge can provide.

## Conservation Insights

Beyond the incredible wildlife viewing, I gained a deeper understanding of the conservation challenges facing Tanzania's national parks. Meeting with rangers and conservation officers highlighted the ongoing battle against poaching and the efforts to balance tourism with environmental protection.

Many lodges and tour operators now contribute directly to conservation efforts and community development, creating a model where tourism can actually help preserve these precious ecosystems.

## Final Thoughts

Tanzania offers an unfiltered connection with nature that's increasingly rare in our modern world. Whether it was watching a cheetah teach its cubs to hunt, sharing a sundowner with Maasai warriors, or simply absorbing the vastness of the Serengeti plains, each day delivered experiences that will remain with me forever.

If an African safari is on your bucket list, move it to the top. These wild places and the incredible creatures that inhabit them need our appreciation, protection, and respect now more than ever.
      `,
      featuredImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e',
      country: 'Tanzania',
      tags: ['africa', 'safari', 'wildlife'],
      isPremium: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      author: {
        name: 'John Doe',
        image: null
      }
    }
  ];
  
  const blog = blogs.find(blog => blog.slug === slug);
  
  if (!blog) {
    return null;
  }
  
  return blog;
}

function createMarkup(content) {
  const htmlContent = marked(content);
  return { __html: htmlContent };
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.slug);
  
  if (!blog) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="relative h-[50vh] md:h-[60vh] bg-gray-900">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 md:p-12">
            <div className="max-w-4xl mx-auto w-full">
              <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {blog.country}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  {blog.author.image ? (
                    <Image 
                      src={blog.author.image} 
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg mr-3">
                      {blog.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">
                      {blog.author.name}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {formatDate(blog.createdAt)}
                    </p>
                  </div>
                </div>
                
                {blog.isPremium && (
                  <div className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    Premium Content
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
          </div>
          
          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Link 
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md text-sm"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Author info */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              About the Author
            </h3>
            <div className="flex items-center">
              {blog.author.image ? (
                <Image 
                  src={blog.author.image} 
                  alt={blog.author.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl mr-4">
                  {blog.author.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="text-xl font-medium text-gray-900 dark:text-white">
                  {blog.author.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Travel writer and photographer, exploring the world one country at a time.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          {blog.isPremium && (
            <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
                Enjoying this premium content?
              </h3>
              <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                Unlock all premium articles and travel guides with a subscription.
              </p>
              <Link 
                href="/pricing"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                View Subscription Plans
              </Link>
            </div>
          )}
          
          {/* Navigation */}
          <div className="mt-12 flex justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
            <Link
              href="/blog"
              className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              <svg className="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to all blogs
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 