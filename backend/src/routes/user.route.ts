import { registerUser,
    signIn,
    signOut

} from "../controllers/User.controller";
import { Hono } from "hono";
import { validationRequest } from "../middlewares/zod.validation.middleware";
import { signinSchema, signupSchema } from "../validations/auth.validation";


const router = new Hono();

router.post('/signup',validationRequest(signupSchema),registerUser);
router.post('/signin',validationRequest(signinSchema), signIn);
router.post('/signout', signOut);


export default router

