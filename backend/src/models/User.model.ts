import { Schema, model, Document } from 'mongoose';
import { sign } from 'hono/jwt';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    refreshToken?: string;
    forgotPasswordToken?: string;
    forgotPasswordExpiry?: number;
    emailVerificationToken?: string;
    emailVerificationExpiry?: number;
    createdAt?: Date;
    updatedAt?: Date;


    //Method Signatures
    isPasswordCorrect(password: string): Promise<boolean>;generateAccessToken(): Promise<string>;generateRefreshToken(): Promise<string>;
    generateTemporaryToken(): Promise<{
        unHashedToken: string;
        hashedToken: string;
        tokenExpiry: number;
    }>;
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true,
        index: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    refreshToken:{
        type:String,
    },
    forgotPasswordExpiry:{
        type:Date,
    },
    emailVerificationToken:{
        type:String,
    },
    emailVerificationExpiry:{
        type:Date
    }
},{
    timestamps:true,
});

userSchema.pre<IUser>("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await Bun.password.hash(this.password, {
        algorithm: 'bcrypt',
        cost: 10,
    });
    next()
})

userSchema.methods.isPasswordCorrect = async function (password:string){
    return await Bun.password.verify(password, this.password);
}

//Generate Access Token
userSchema.methods.generateAccessToken = async function (): Promise<string> {
    return sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            exp: Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_EXPIRY || "3600"),
        },
        process.env.ACCESS_TOKEN_SECRET as string
    );
};

userSchema.methods.generateRefreshToken = async function () : Promise<string>{
    return sign(
        {
            _id: this._id,
            exp: Math.floor(Date.now() / 1000) + parseInt(process.env.REFRESH_TOKEN_EXPIRY || "604800"),
        },
        process.env.REFRESH_TOKEN_SECRET as string
    );
};



userSchema.methods.generateTemporaryToken = function () {
  // Generate a random token (secure & URL-safe)
  const randomBytes = new Uint8Array(20);
  crypto.getRandomValues(randomBytes);
  const unHashedToken = Buffer.from(randomBytes).toString("hex");

  // Hash the token using SHA-256
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(unHashedToken))
    .then((hashedBuffer) => {
      const hashedToken = Array.from(new Uint8Array(hashedBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Token expiry time (20 minutes from now)
      const tokenExpiry = Date.now() + (parseInt(process.env.USER_TEMPORARY_TOKEN_EXPIRY || "1200000"));

      return { unHashedToken, hashedToken, tokenExpiry };
    });
};


const User =model<IUser>('User',userSchema);

export default User;