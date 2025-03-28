import User from "../models/User.model";
import { Context } from "hono";

interface ISignup {
    username: string;
    email: string;
    password: string;
  }

export const generateAccessAndRefreshToken = async (c: Context, userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return c.json({ error: "User not found" }, 404);
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return c.json({ accessToken, refreshToken });
    } catch (error) {
        return c.json({ error: "Internal server error" }, 500);
    }
};

const registerUser = async (c: Context) => {
    try {
        const { username, email, password } :ISignup= await c.req.json();

        const userNameLower = username.toLocaleLowerCase();
        const emailLower = email.toLocaleLowerCase();
        

        if ([email, username, password].some((field) => field?.trim() === "")) {
            return {
              data: { message: "All fields are required" },
              status: 401,
            };
          }

          console.log(email)
        

        // Check if user already exists
        const existedUser = await User.findOne({
            $or: [{ username:userNameLower }, { email :emailLower}]
        });


        if (existedUser) {
            return c.json(
                { success: false, message: "User with email or username already exists" },
                400
            );
        }

        // Create new user
        const user = await User.create({
            email:emailLower,
            password:password,
            username:userNameLower,
            isEmailVerified: false,
        });
        
        const { unHashedToken, hashedToken, tokenExpiry } = await user.generateTemporaryToken();

        user.emailVerificationToken = hashedToken;
        user.emailVerificationExpiry = tokenExpiry;
        
        console.log("🔍 User Before Save:", user);
        await user.validate(); // Validate before saving to check for errors
        await user.save();
        
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken "
        );

        if (!createdUser) {
            return c.json(
                { success: false, message: "Something went wrong while registering the user" },
                500
            );
        }

        return c.json(
            { user: createdUser, success: true, message: "User created successfully" },
            201
        );
    } catch (error) {
        return c.json({ success: false, message: "Internal server error" }, 500);
    }
};

export { registerUser };
