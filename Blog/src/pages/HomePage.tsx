import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostList from '../components/PostList';
import Image from '../components/Image';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/post/all");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="mt-3 flex flex-col gap-8 pt-10 max-w-6xl mx-auto px-6 lg:px-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4  text-lg">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="text-gray-500">•</span>
        <span className="text-blue-500 font-medium">Blogs and Articles</span>
      </div>

      {/* Main Content */}
      <div className="pt-2 space-y-3">
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden ">
          <Image 
            src="./Me.png" 
            alt="Ariyaman's Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Text Content */}
        <div className="md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            Hey! This is <span className='font-bold'>Ariyaman Debnath</span> 
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed">
            I'm a full-stack software engineer passionate about building stuff
            and learning new technologies. I write blogs and articles about
            programming, software engineering, and life. 
            <br/>
            <span className='text-gray-400'>Currently, I'm working
            on a project called <strong>"Blog"</strong> where I share insights
            and experiences in software development.</span>
          </p>
        </div>
        
        {/* Blog Posts */}
        <h1 className="text-3xl font-bold">Blogs</h1>
        {posts.map((post) => (
          <div key={post._id} className="border-b pb-4">
            <Link to={`/blog/${post.slug}`} className="text-2xl font-semibold">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.description.substring(0, 100) + "..." }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;