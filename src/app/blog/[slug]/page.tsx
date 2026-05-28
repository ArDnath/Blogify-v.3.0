import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-24">

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-10">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* ── Tags ───────────────────────────────────────────────── */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Title ──────────────────────────────────────────────── */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
        {post.title}
      </h1>

      {/* ── Description / Sub-heading ──────────────────────────── */}
      {post.description && (
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
          {post.description}
        </p>
      )}

      {/* ── Date ───────────────────────────────────────────────── */}
      <p className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-200 dark:border-gray-800/60 pb-6 mb-8">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* ── Cover Image ────────────────────────────────────────── */}
      {post.coverImage && (
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-10 border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* ── MDX Content ────────────────────────────────────────── */}
      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>

      {/* ── Back link ──────────────────────────────────────────── */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800/60">
        <Link
          href="/"
          className="text-sm text-blue-500 dark:text-blue-400 hover:underline underline-offset-2"
        >
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}
