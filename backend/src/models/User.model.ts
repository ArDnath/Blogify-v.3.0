import {Schema, model, Document} from 'mongoose';
import {decode, sign,verify} from 'hono/jwt';


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    refreshToken?: string;
    forgotPasswordToken?: string;
    forgotPasswordExpiry?: Date;
    emailVerificationToken?: string;
    emailVerificationExpiry?: Date;
    createdAt?: Date;
    updatedAt?: Date;
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
userSchema.methods.generateAccessToken = async function (){
    return await sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        exp:  Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_EXPIRY || "3600"),
    },
    process.env.ACCESS_TOKEN_SECRET as string,
)
}

userSchema.methods.generateRefreshToken = async function (){
    return await sign(
        {
            _id: this._id,
            exp: Math.floor(Date.now()/1000) + parseInt(process.env.REFRESH_TOKEN_EXPIRY || "604800"),
        }
        ,
        process.env.REFRESH_TOKEN_SECRET as string,
    )
}

const User= model<IUser>('User',userSchema);

export default User;