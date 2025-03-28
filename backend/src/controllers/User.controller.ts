import  User  from "../models/User.model";

export const generateRefreshAndRefreshToken = async (userId: string)=>{

    try {
        const user = await User.findById(userId);
        const accessToken =  User.generateAccessToken();

        
    } catch (error) {
        
    }
}