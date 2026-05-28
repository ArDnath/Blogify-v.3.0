import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, PostMetadata } from "@/lib/mdx";

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 tracking-wide">
      {label}
    </span>
  );
}

function PostListItem({ post, isLast }: { post: PostMetadata; isLast: boolean }) {
  return (
    <article
      className={`group flex flex-col sm:flex-row gap-6 py-8 ${
        !isLast ? "border-b border-gray-200 dark:border-gray-800/60" : ""
      }`}
    >
      {/* Cover image thumbnail */}
      {post.coverImage && (
        <div className="sm:w-44 sm:h-28 w-full h-44 relative rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 justify-center flex-grow min-w-0">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => <Tag key={tag} label={tag} />)}
          </div>
        )}

        {/* Title */}
        <Link
          href={`/blog/${post.slug}`}
          className="text-xl font-bold leading-snug tracking-tight hover:text-blue-500 dark:hover:text-blue-400 transition-colors line-clamp-2"
        >
          {post.title}
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {post.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 dark:text-gray-500">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="ml-auto text-blue-500 dark:text-blue-400 font-medium hover:underline underline-offset-2 text-xs flex-shrink-0"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-20">

      {/* ── Hero / Bio ────────────────────────────────────────── */}
      <section className="flex items-start gap-6 mb-14">
        <div className="w-20 h-20 relative rounded-full overflow-hidden flex-shrink-0 shadow-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <Image
            src="/Me.png"
            alt="Ariyaman Debnath"
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-grow pt-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Ariyaman Debnath
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            FullStack Developer · Building with{" "}
            <span className="text-green-500 font-medium">React</span>,{" "}
            <span className="text-orange-500 font-medium">Hono</span> &{" "}
            <span className="text-blue-500 font-medium">TypeScript</span>. I write about web dev, security, and shipping things.
          </p>
          <div className="flex gap-3 mt-3">
            <a
              href="https://github.com/ariyaman1224"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              GitHub ↗
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              Twitter ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="border-t border-gray-200 dark:border-gray-800/60 mb-8" />

      {/* ── Posts ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          All Articles
        </h2>

        {posts.length === 0 ? (
          <p className="py-12 text-center text-gray-400 text-sm">
            No posts yet. Drop an <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">.mdx</code> file in the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">posts/</code> folder to get started.
          </p>
        ) : (
          posts.map((post, index) => (
            <PostListItem
              key={post.slug}
              post={post}
              isLast={index === posts.length - 1}
            />
          ))
        )}
      </section>
    </div>
  );
}
