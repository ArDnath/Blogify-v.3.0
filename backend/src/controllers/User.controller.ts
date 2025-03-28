import User from "../models/User.model";
import { Context } from "hono";

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
        const { username, email, password } = await c.req.json();

        console.log(username)

        // Check if user already exists
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existedUser) {
            return c.json(
                { success: false, message: "User with email or username already exists" },
                400
            );
        }

        // Create new user
        const user = await User.create({
            email,
            password,
            username,
            isEmailVerified: false,
        });

        const { unHashedToken, hashedToken, tokenExpiry } = await user.generateTemporaryToken();

        user.emailVerificationToken = hashedToken;
        user.emailVerificationExpiry = tokenExpiry;
        await user.save({ validateBeforeSave: false });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
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
