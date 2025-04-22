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
            Hi, I am <span className='font-bold'>Ariyaman Debnath</span> 
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed">

            I am a FullStack Developer living in India. I have a passion for 
            building, from writing the first line of code to deploying it to
            some server across the globe, it all feels like magic with logic!!
            

            <br/>
            <span className="block mt-4 text-gray-400">
    Currently messing with{" "}
    <span className="text-blue-400 font-semibold animate-pulse">Reactjs</span>,{" "}
    <span className="text-pink-400 font-semibold animate-pulse">Honojs</span>, and{" "}
    <span className="text-yellow-400 font-semibold animate-pulse">Typescript</span>⚡
  </span>
          </p>
        </div>
        
        {/* Blog Posts */}
        <h1 className="text-4xl font-bold border-b-3 pt-4 pb-4 mb-5">Blog Posts</h1>

        <div>
          <PostList />
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;