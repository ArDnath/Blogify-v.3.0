import { Context } from "hono";
import Blog from "../models/Post.model";
import User from "../models/User.model";
import { Types } from "mongoose";

const createPost = async (c: Context) => {
  try {
    // Get request body
    const body = await c.req.json();

    // Ensure the user exists (assuming userId is sent in the request body)
    const user = c.get("user");

    // Generate a unique slug
    let slug = body.title.trim().replace(/\s+/g, "-").toLowerCase();
    let counter = 2;

    let existingPost = await Blog.findOne({ slug });
    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Blog.findOne({ slug });
      counter++;
    }

    // Create the post
    const newPost = new Blog({
      ...body,
      slug,
      author: user._id as Types.ObjectId,
    });
    const post = await newPost.save();

    // Return the created post
    return c.json({ message: "Post created successfully", post }, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export { createPost };
