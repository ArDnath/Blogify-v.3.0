import {z} from "zod";

export const signupSchema = z.object({
    name: z.string().optional(),
    username:z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
});



export const signinSchema = z.object({
    username: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
});
