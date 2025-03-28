import { registerUser} from "../controllers/User.controller";
import { Hono } from "hono";

export const userRouter = new Hono();

userRouter.post('/api/users',registerUser);

