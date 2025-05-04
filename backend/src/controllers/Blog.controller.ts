import { Context } from "hono";
import Blog from "../models/Post.model";
import User from "../models/User.model";
import { JSDOM } from "jsdom";
const ImageKit = require("imagekit");
const createDOMPurify = require("dompurify");




const createPost = async (c: Context) => {
  try {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    const window = new JSDOM("").window;
    const DOMPurifyInstance = createDOMPurify(window);

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
    
    const sanitizedContent = DOMPurifyInstance.sanitize(body.content);

    const newPost = new Blog({
      author: user._id,
      slug,
      title: body.title,
      description: body.description,
      content: sanitizedContent,
      imageUrl: body.imageUrl,
    });
    const post = await newPost.save();

    return c.json({ message: "Post created successfully", post }, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

const getAllPosts = async (c: Context) => {
  try {
    const page = Number(c.req.query("page")) || 1;
    const limit = Number(c.req.query("limit")) || 2;


    const posts = await Blog.find()
    .limit(limit)
    .skip((page -1) * limit)
    .sort({createdAt: -1});

    const totalPosts = await Blog.countDocuments();
    const hasMore = page* limit < totalPosts;
    
    return c.json({ posts, hasMore }, 200);

  } catch (error) {
    console.error("Error fetching posts:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

const getPostBySlug = async (c: Context) => {
  try {
    const { slug } = c.req.param();
    const post = await Blog.findOne({ slug })
      .populate("author", "username email")
      .select("title description imageUrl content createdAt"); 
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json({ post }, 200);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadAuth = async (c:Context) => {
  const result = imagekit.getAuthenticationParameters();
  return c.json(result);
};

export {
  createPost,
  getAllPosts,
  getPostBySlug,
  uploadAuth,
};

