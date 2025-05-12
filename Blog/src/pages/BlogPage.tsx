import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "reactjs-tiptap-editor/style.css";
import Image from "../components/IKHandlers/Image";
import DOMPurify from "dompurify";


interface Post {
  title: string;
  createdAt: string;
  imageUrl?: string;
  description: string;
  content?: string;
}

const fetchPost = async (slug: string): Promise<Post> => {
  const response = await axios.get<{ post: Post }>(
    `https://apibunhono-production.up.railway.app/api/v1/post/${slug}`
  );
  if (!response.data?.post) throw new Error("Post not found");
  return response.data.post;
};
const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();;

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 mins
    gcTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        {(error as Error).message || "Error loading post"}
      </div>
    );
  }

  if (!post) {
    return <div className="text-center mt-10">Post not found.</div>;
  }

  return (
    <div className="mt-3 flex flex-col gap-8 pt-10 max-w-6xl mx-auto px-6 lg:px-12">
      {post.imageUrl && (
        <div className="flex justify-center mb-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-w-md h-auto rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold pt-3">{post.title}</h1>
      <p className="text-xs sm:text-sm text-gray-600 mt-1">
  Published on {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Unknown date"}
</p>


      <div
        className="mt-4 text-base sm:text-lg text-justify leading-relaxed"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
      />

      {post.content && (
        <div
          className="ProseMirror prose dark:prose-invert max-w-none mt-6 text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </div>
  );
};

export default BlogPage;