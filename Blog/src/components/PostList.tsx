import React from "react";
import PostListItems from "./PostListItems";

const PostList: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 mb-8 py-6">
        <h1 className="text-3xl py-4 font-bold border-b-2">
            Blogs
        </h1>
      <PostListItems />
      <PostListItems />
      <PostListItems />
      <PostListItems />
      <PostListItems />
      <PostListItems />
    </div>
  );
};

export default PostList;
