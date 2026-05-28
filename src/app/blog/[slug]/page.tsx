import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for SSG (Static Site Generation)
// This compiles all MDX pages to static HTML during build time for insane loading speeds!
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 md:px-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <span>•</span>
        <span className="text-blue-500 font-medium">Article</span>
      </div>

      {post.coverImage && (
        <div className="flex justify-center p-0 mb-8 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xl relative w-full h-[300px] sm:h-[400px] bg-gray-150 dark:bg-gray-900">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold pt-5 leading-tight">{post.title}</h1>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex flex-wrap gap-2 items-center border-b border-gray-200 dark:border-gray-800 pb-6">
        <span>Published on {new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        {post.tags && post.tags.length > 0 && (
          <>
            <span>•</span>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span key={tag} className="badge badge-sm badge-outline text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700">{tag}</span>
              ))}
            </div>
          </>
        )}
      </div>

      {post.description && (
        <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 italic mt-6 mb-8 border-l-4 border-blue-500 pl-4 py-1">
          {post.description}
        </div>
      )}

      {/* Main MDX Content */}
      <div className="prose dark:prose-invert max-w-none pb-20 mt-4">
        <MDXRemote source={post.content} />
      </div>
    </div>
  );
}
