import {
    createPost,
    getAllPosts,
    getPostBySlug,
    uploadAuth,

} from "../controllers/Blog.controller";
import { Hono } from "hono";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = new Hono();

router.get("/uploadAuth",uploadAuth);

router.post("/create", authenticateUser, createPost);
router.get("/all", getAllPosts);
router.get("/:slug", getPostBySlug);

export default router;