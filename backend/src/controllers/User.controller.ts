import User from "../models/User.model";
import { Context } from "hono";
import { deleteCookie, setSignedCookie } from "hono/cookie";

interface ISignup {
    username: string;
    email: string;
    password: string;
};

  interface ISignIn{
    username?: string;
    email?: string;
    password: string;
};




//Generate Accesstoken and Refreshtoken utility function.



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

        return { accessToken, refreshToken };
    } catch (error) {
        return c.json({ error: "Internal server error" }, 500);
    }
};



//SignUp Logic

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




//SignIn Controller 


//SignIn Controller 

const signIn = async ( c:Context) =>{
    try {
        const {username ,email, password} :ISignIn = await c.req.json();
        const emailLower = email ? email.toLowerCase() : null;
        const userNameLower = username && username.toLocaleLowerCase();


        const user= await User.findOne({
            $or : [{email: emailLower}, {userName: userNameLower}],
        });

        if (!user){
            return c.json({
                data: { message: "User not found"},
                status: 404
            });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if(!isPasswordCorrect){
            return c.json({
                data: {message : "Invalid password"},
                status: 401
            });
        }

        const tokens = await generateAccessAndRefreshToken(c, user._id as string);
        if (!tokens) {
            return c.json({ data: { message: "Failed to generate tokens" }, status: 500 });
        }
        const { accessToken, refreshToken } = tokens;
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        );

        const setCookieOptions ={
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60* 24 * 30,
        }
        await setSignedCookie(
            c,
            "auth_token",
            accessToken,
            process.env.ACCESS_TOKEN_SECRET as string,
            setCookieOptions
        )
        
        return c.json({
            loggedInUser,
            accessToken,
            data:{message: "User is Logged in Successfully"},
            status:200
        })


    } catch (error: any) {

        return c.json(
            {message: `Internal server error: ${error.message}`},
            { status: 500}
        )
        
    }
}
//SignOut controller


const signOut = async (c: Context)=>{
    try {
        deleteCookie(c,"auth_token");

        return c.json({
            data: {message: "User logged out successfully"}
        })
    } catch (error: any) {
        return  c.json(
            {message: `Internal server error: ${error.message}`},
            { status: 500}
        )
    }
}

export { 
    registerUser,
    signIn,
    signOut
 };