import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, PostMetadata } from "@/lib/mdx";

function PostListItem({ post, isLast }: { post: PostMetadata; isLast: boolean }) {
  return (
    <div
      className={`flex flex-col xl:flex-row gap-8 py-8 ${
        !isLast ? "border-b border-gray-200 dark:border-gray-900" : ""
      }`}
    >
      {post.coverImage && (
        <div className="w-full xl:w-1/3 relative h-60 xl:h-auto min-h-60 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1200px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 xl:w-2/3 justify-center">
        <Link href={`/blog/${post.slug}`} className="text-2xl md:text-3xl font-bold leading-snug hover:text-blue-500 transition-colors">
          {post.title}
        </Link>

        <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-2 items-center">
          <span>Published on {new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge badge-sm badge-outline border-gray-400 dark:border-gray-700 text-gray-600 dark:text-gray-400">{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 mt-2">
          {post.description}
        </p>

        <Link href={`/blog/${post.slug}`} className="text-sm font-semibold underline self-start hover:text-blue-500 transition-colors mt-3">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mt-3 flex flex-col gap-8 pt-10 max-w-6xl mx-auto px-6 lg:px-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 text-lg">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="text-gray-500">•</span>
        <span className="text-blue-500 font-medium">Blogs and Articles</span>
      </div>

      {/* Main Content */}
      <div className="pt-2 space-y-8">
        {/* Profile Details */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="w-36 h-36 min-w-36 min-h-36 shadow-2xl rounded-full overflow-hidden relative border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
            <Image
              src="/Me.png"
              alt="Ariyaman Debnath"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </div>
          
          {/* Text Content */}
          <div className="md:text-left flex-grow">
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Hi, I am <span className="font-bold">Ariyaman Debnath</span> 
            </h1>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              I am a FullStack Developer living in India. I have a passion for 
              building—from writing the first line of code to deploying it to 
              some server across the globe, it all feels like magic with logic!!
            </p>
            <div className="mt-6 text-gray-600 dark:text-gray-400 text-lg">
              Currently messing with{" "}
              <span className="text-green-500 font-semibold animate-pulse">Reactjs</span>,{" "}
              <span className="text-orange-500 font-semibold animate-pulse">Honojs</span>, and{" "}
              <span className="text-blue-500 font-semibold animate-pulse">Typescript</span>⚡
            </div>
          </div>
        </div>
        
        {/* Blog Posts Section */}
        <div className="pt-8">
          <h2 className="text-3xl font-bold border-b border-gray-200 dark:border-gray-900 pb-4 mb-4 animate-fade-in">Blog Posts :</h2>
          
          {posts.length === 0 ? (
            <p className="py-12 text-center text-gray-500 text-lg">
              No blog posts found. Create your first post inside the <code className="bg-gray-150 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono">posts/</code> folder!
            </p>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-900">
              {posts.map((post, index) => (
                <PostListItem
                  key={post.slug}
                  post={post}
                  isLast={index === posts.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
