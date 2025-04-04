import {
    createPost
} from "../controllers/Blog.controller";
import { Hono } from "hono";

const router = new Hono();

router.post("/create",createPost);

export default router;