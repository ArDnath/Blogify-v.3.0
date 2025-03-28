import User from "../models/User.model";
import {Context, Next} from "hono";
import {decode, sign, verify} from "hono/jwt";


export const authenticateUser = async(c: Context, next:Next)=>{
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if(!token) {
        return c.json({message:"Unauthorized"},401);
    }

    try{
        const decoded: any = await verify(token, process.env.JWT_SECRET as string);
        const user = await User.findById(decoded?._id).select(
            "-password -refreshToken"
        )
        if(!user){
            return c.json({message:"Unauthorized"},401);
        }
        c.set("user",user);
        await next();
    }
    catch(err){
        return c.json({ message:"Invalid token"}, 401);
    }
};