import {
    createPost,
    getAllPosts,
    getPostBySlug
} from "../controllers/Blog.controller";
import { Hono } from "hono";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = new Hono();

router.post("/create",authenticateUser,createPost);
router.get("/all", getAllPosts);
router.get("/:slug", getPostBySlug); // Add route for fetching a post by slug

export default router;