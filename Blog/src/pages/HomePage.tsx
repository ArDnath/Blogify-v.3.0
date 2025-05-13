import { Link } from "react-router-dom";
import PostList from '../components/PostList';
import Image from '../components/IKHandlers/Image';

const HomePage = () => {

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
        <div className="w-35 h-35 shadow-2xl rounded-full overflow-hidden  ">
            <Image src="./Me2.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
        
        {/* Text Content */}
        <div className="md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            Hi, I am <span className='font-bold'>Ariyaman Debnath</span> 
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed">

          I'm a Full Stack Developer based in India, driven by a deep passion for crafting end-to-end digital experiences. From architecting the first line of code to deploying robust applications to servers across the globe, I find magic in the logic behind every build. I thrive on turning ideas into scalable, high-performance products — blending clean code, thoughtful design, and seamless deployment into one continuous journey.
            

            <br/>
            <span className="block mt-4 text-gray-400">
  Currently building with{" "}
  <span className="text-green-400 font-semibold animate-pulse">React</span>,{" "}
  <span className="text-orange-400 font-semibold animate-pulse">Hono</span>,{" "}
  <span className="text-blue-400 font-semibold animate-pulse">TypeScript</span>, and tinkering with{" "}
  <span className="text-yellow-400 font-semibold animate-pulse">Next.js</span>,{" "}
  <span className="text-purple-400 font-semibold animate-pulse">Prisma</span> &{" "}
  <span className="text-cyan-400 font-semibold animate-pulse">DevOps</span> tools ⚙️✨
</span>

          </p>
        </div>
        
        {/* Blog Posts */}
        <h1 className="text-4xl font-bold border-b-4 pt-4 pb-4 ">Blog Posts :</h1>

        <div>
          <PostList />
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;