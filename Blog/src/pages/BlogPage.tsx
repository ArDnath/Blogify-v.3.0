import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "reactjs-tiptap-editor/style.css";
import Image from "../components/IKHandlers/Image";

interface Post {
  title: string;
  createdAt: string;
  imageUrl?: string;
  description: string;
  content?: string;
}

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ post: Post }>(
          `http://localhost:8080/api/v1/post/${slug}`
        );
        setPost(response.data?.post || null);
        if (!response.data?.post) {
          setError("Post not found.");
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          axiosError.response?.data?.message || "Error fetching post. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center mt-10">Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {post.imageUrl && (
        <div className="flex justify-center">
        <Image
          src={post.imageUrl}
          alt={post.title}
          className="max-w-md w-full h-auto rounded-lg"
        />
      </div>
      )}
      <h1 className="text-4xl font-bold pt-5">{post.title}</h1>
      <p className="text-sm text-gray-600">
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div
        className="pb-1.5 mt-4 mb-8 text-base"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />

      {post.content && (
        <div
          className="ProseMirror prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </div>
  );
};

export default BlogPage;
