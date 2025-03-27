import {Schema, model} from 'mongoose';

export interface IUser {
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


const User= model<IUser>('User',userSchema);
