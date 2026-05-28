import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string | null;
  tags?: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

export function getAllPosts(): PostMetadata[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    createDummyPost();
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        coverImage: data.coverImage || null,
        tags: data.tags || [],
      } as PostMetadata;
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

    if (!fullPath) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      coverImage: data.coverImage || null,
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    return null;
  }
}

function createDummyPost() {
  const dummyContent = `---
title: "Welcome to Blogify v3.0"
description: "Discover how we migrated Blogify from a React + Hono monorepo to a unified, high-performance Next.js + MDX application."
date: "2026-05-28"
coverImage: "/Me.png"
tags: ["Next.js", "MDX", "Migration", "WebDev"]
---

Welcome to **Blogify v3.0**! 

This is your first MDX blog post. It is written in standard Markdown/MDX and rendered dynamically inside Next.js using dynamic server-side compilation!

## Why MDX?

MDX is an incredibly powerful format because it merges standard, readable Markdown syntax with embedded React components. It gives you:
* **Writing Ease**: Write articles in plain text without worrying about code templates or database setups.
* **Component Embedding**: Inject rich interactive components directly into your blog posts.
* **Zero Database Overhead**: Deploy your blog statically at the edge (e.g. on Cloudflare Pages) completely database-free!

### Code Syntax Highlighting Example

\`\`\`typescript
const greeting = "Hello, Ariyaman!";
console.log(greeting);
\`\`\`

Enjoy publishing blogs with Markdown!
`;
  fs.writeFileSync(path.join(postsDirectory, "welcome-to-blogify.mdx"), dummyContent, "utf8");
}
