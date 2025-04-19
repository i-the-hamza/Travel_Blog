"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/format';

export default function BlogCard({ blog }) {
  return (
    <div className="group bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative h-60 overflow-hidden">
          <Image 
            src={blog.featuredImage} 
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {blog.isPremium && (
            <div className="absolute top-0 right-0 m-4 bg-indigo-600 text-white px-2 py-1 text-xs font-medium rounded">
              Premium
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-xs font-medium mb-2">
              {blog.country}
            </div>
            <h2 className="text-xl font-bold text-white truncate">
              {blog.title}
            </h2>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {blog.author.image ? (
              <Image 
                src={blog.author.image} 
                alt={blog.author.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs mr-2">
                {blog.author.name.charAt(0)}
              </div>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {blog.author.name}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {formatDate(blog.createdAt)}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {blog.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {blog.tags && blog.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link 
          href={`/blog/${blog.slug}`}
          className="mt-4 inline-flex items-center font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          Read more
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="ml-1 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 