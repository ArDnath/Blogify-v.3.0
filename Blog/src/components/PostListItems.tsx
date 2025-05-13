import React from "react";
import { Link } from "react-router-dom";
import Image from "./IKHandlers/Image";
import DOMPurify from "dompurify";

function getTrimmedDescription(html: string, wordLimit: number) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = DOMPurify.sanitize(html);
  const text = tempElement.textContent || tempElement.innerText || "";
  const words = text.split(/\s+/).slice(0, wordLimit).join(" ");
  return DOMPurify.sanitize(words);
}

interface Post {
  imageUrl?: string;
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
    <div
      className={`flex flex-col xl:flex-row gap-6 py-8 ${
        !isLast ? "border-b-1 " : ""
      }`}
    >
      {post.imageUrl && (
        <div className="w-full xl:w-1/3">
          <Image
            src={post.imageUrl}
            className="rounded-2xl object-cover w-full h-full max-h-60"
            
          
          />
        </div>
      )}

      <div className="flex flex-col gap-3 xl:w-2/3">
        <Link to={`/blog/${post.slug}`} className="text-2xl md:text-3xl font-semibold leading-snug">
          {post.title}
        </Link>

        <div className="text-sm text-gray-500">
          <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <p
          className="text-base leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: getTrimmedDescription(post.description, 50),
          }}
        ></p>

        <Link to={`/blog/${post.slug}`} className="text-sm underline self-start">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;
