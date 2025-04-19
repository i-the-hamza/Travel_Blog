"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="relative h-[40vh] bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080"
            alt="World travel"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About Me
              </h1>
              <p className="text-xl text-white max-w-3xl">
                The story behind the travels and the traveler
              </p>
            </div>
          </div>
        </div>
        
        {/* About content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-5 mb-10 lg:mb-0">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60"
                  alt="Travel Blogger"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Hi, I'm John Doe
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>
                  I'm a passionate traveler, photographer, and storyteller who has been exploring the world for over a decade.
                  My journey began with a solo backpacking trip through Southeast Asia after college, and I've been hooked ever since.
                </p>
                <p>
                  I created this travel blog to share my experiences, insights, and tips from my adventures across 6 continents and 45+ countries.
                  My goal is to inspire others to step out of their comfort zones and discover the incredible diversity our world has to offer.
                </p>
                <p>
                  When I'm not traveling, I'm planning my next adventure, editing photos, or enjoying a good book about far-off places.
                  I believe travel is one of the greatest educators and my experiences have shaped my worldview in countless ways.
                </p>
              </div>
            </div>
          </div>
          
          {/* My Story */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              My Travel Journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
                  2012
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  The Beginning
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  After graduating college, I took my first solo backpacking trip through Thailand, Vietnam, and Cambodia. What was meant to be a 3-month adventure turned into a year of exploration that changed my life forever.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
                  2015
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Career Break
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  After working in marketing for a few years, I took a leap of faith and quit my job to travel across South America. During this time, I started this blog to document my experiences and connect with fellow travelers.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
                  2018
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Remote Work & Travel
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I transitioned to remote work as a content creator and digital marketing consultant, allowing me to embrace a nomadic lifestyle. This period included extensive exploration throughout Europe and parts of Africa.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
                  2020
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Pandemic Pause
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The global pandemic forced me to stay put for a while. I used this time to reflect on past travels, improve my photography and writing skills, and plan future adventures for when travel became possible again.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
                  2022
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Back on the Road
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  With travel restrictions easing, I embarked on an ambitious journey across the Middle East and Central Asia, exploring regions I had long dreamed of visiting. This period marked a deeper, more mindful approach to travel.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-4">
                  Today
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Sustainable Travel Focus
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I now focus on sustainable and responsible travel, working with conservation organizations and promoting eco-friendly tourism. My goal is to help others explore the world while minimizing their environmental impact.
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20">
            <div className="bg-indigo-600 rounded-xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    45+
                  </div>
                  <div className="text-indigo-100">
                    Countries Visited
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    6
                  </div>
                  <div className="text-indigo-100">
                    Continents Explored
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    200+
                  </div>
                  <div className="text-indigo-100">
                    Blog Articles
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    10+
                  </div>
                  <div className="text-indigo-100">
                    Years Traveling
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Want to Connect?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              I'm always open to collaborations, questions, or just hearing from fellow travel enthusiasts. Feel free to reach out!
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 