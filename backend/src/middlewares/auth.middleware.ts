import User from "../models/User.model";
import { Context, Next } from "hono";
import { decode, sign, verify } from "hono/jwt";

export const authenticateUser = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  console.log("Authorization header:", authHeader);
  console.log("Extracted token:", token);

  if (!token) {
    return c.json({ message: "Unauthorized: user not found" }, 401);
  }

  try {
    const decoded = await verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    );
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken ",
    );
    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    c.set("user", user);
    await next();
  } catch (err) {
    console.log("Auth Middleware Error: ", err);
    return c.json({ message: "Invalid token" }, 401);
  }
};

