import {
    createPost
} from "../controllers/Blog.controller";
import { Hono } from "hono";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = new Hono();

router.post("/create",authenticateUser,createPost);

export default router;