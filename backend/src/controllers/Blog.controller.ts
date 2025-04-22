import { Context } from "hono";
import Blog from "../models/Post.model";
import User from "../models/User.model";

const createPost = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const body = await c.req.json();
    // Generate a unique slug
    let slug = body.title.replace(/ /g, "-").toLowerCase();
    let existingPost = await Blog.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await Blog.findOne({ slug });
      counter++;
    }

    const newPost = new Blog({ author: user._id, slug, ...body });
    const post = await newPost.save();


    return c.json({ message: "Post created successfully", post }, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

const getAllPosts = async (c: Context) => {
  try {
    const posts = await Blog.find({}, { description: 1, title: 1, slug: 1, createdAt: 1 });
    return c.json({ posts }, 200);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

const getPostBySlug = async (c: Context) => {
  try {
    const { slug } = c.req.param();
    const post = await Blog.findOne({ slug }).populate("author", "username email").select("title description createdAt");
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json({ post }, 200);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export {
  createPost,
  getAllPosts,
  getPostBySlug,
};

