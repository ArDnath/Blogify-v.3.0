import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "reactjs-tiptap-editor/style.css";

const BlogPage = () => {
  const { slug } = useParams(); // Extract slug from URL
  interface Post {
    title: string;
    createdAt: string;
    img?: string;
    description: string;
    content?: string;
  }

  const [post, setPost] = useState<Post | null>(null); // State to store the blog post
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(""); // State to manage errors

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `http://localhost:8080/api/v1/post/${slug}`,
        );
        if (response.data && response.data.post) {
          setPost(response.data.post); // Set the fetched post
        } else {
          setError("Post not found."); // Handle missing post in response
        }
      } catch (err) {
        setError("Error fetching post. Please try again later."); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>; // Show error message
  }

  if (!post) {
    return <div className="text-center mt-10">Post not found.</div>; // Handle case where post is not found
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold pt-5">{post.title}</h1>
      <p className="text-sm ">
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.img && (
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-auto rounded-lg mt-4"
        />
      )}
      <div
        className=" pb-1.5 mt-4 mb-8"
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
