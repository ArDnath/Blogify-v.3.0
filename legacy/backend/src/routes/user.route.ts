import { registerUser,
    signIn,
    signOut

} from "../controllers/User.controller";
import { Hono } from "hono";
import { validationRequest } from "../middlewares/zod.validation.middleware";
import { signinSchema, signupSchema } from "../validations/auth.validation";


const Userroutes = new Hono();

Userroutes.post('/signup',validationRequest(signupSchema),registerUser);
Userroutes.post('/signin',validationRequest(signinSchema), signIn);
Userroutes.post('/signout', signOut);


export default Userroutes;

