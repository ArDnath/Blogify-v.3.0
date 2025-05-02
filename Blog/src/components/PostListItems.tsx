import React from "react";
import { Link } from "react-router-dom";
import Image from "./IKHandlers/Image";

interface Post {
  img?: string;
  slug: string;
  title: string;
  createdAt: string;
  description: string;
}

interface PostListItemsProps {
  post: Post;
  isLast: boolean;
}

const PostListItems: React.FC<PostListItemsProps> = ({ post, isLast }) => {
  return (
    <div className={`flex flex-col xl:flex-row gap-8 ${!isLast ? "border-b-1" : ""} py-8`}>
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        </div>
      )}

      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/blog/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p
          className="text-gray-600 mt-5"
          dangerouslySetInnerHTML={{ __html: post.description }}
        ></p>
        <Link to={`/blog/${post.slug}`} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;
