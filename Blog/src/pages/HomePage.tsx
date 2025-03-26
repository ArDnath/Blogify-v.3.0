import { Link } from 'react-router-dom';
import React from 'react';
import PostList from '../components/PostList';

const HomePage = () => {
    return (
        <div className="mt-4 flex flex-col gap-8 pt-10 max-w-6xl mx-auto px-6 lg:px-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-4 text-gray-700 text-lg">
                <Link to="/" className="hover:underline">Home</Link>
                <span className="text-gray-500">•</span>
                <span className="text-blue-800 font-medium">Blogs and Articles</span>
            </div>

            {/* Main Content */}
            <div className="pt-4 space-y-3">
                {/* Profile Image */}
                <div className="w-40 h-40 rounded-full overflow-hidden ">
                    <img 
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
                    <p className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed">
                        I'm a full-stack software engineer passionate about building stuff
                        and learning new technologies. I write blogs and articles about
                        programming, software engineering, and life. Currently, I'm working
                        on a project called <strong>"Blog"</strong> where I share insights
                        and experiences in software development.
                    </p>
                </div>
                

                {/*PostList*/ }

                <PostList/>
            </div>
        </div>
    );
}

export default HomePage;