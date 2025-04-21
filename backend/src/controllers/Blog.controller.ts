import { Context } from "hono";
import Blog from "../models/Post.model";
import User from "../models/User.model";

const createPost = async (c: Context) => {
  try {
    // Get request body
    const body = await c.req.json();

    // Ensure the user exists (assuming userId is sent in the request body)
    const user = await User.findOne(body.username);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Generate a unique slug
    let slug = body.title.replace(/ /g, "-").toLowerCase();
    let existingPost = await Blog.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Blog.findOne({ slug });
      counter++;
    }

    // Create the post
    const newPost = new Blog({ author: user._id, slug, ...body });
    const post = await newPost.save();

    // Return the created post
    return c.json({ message: "Post created successfully", post }, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export {
    createPost
  }

