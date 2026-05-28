import mongoose,{Mongoose} from 'mongoose';
import { DB_NAME } from '../constants';




const connectDB = async():Promise<void>=>{

    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`,
        )
    
        console.info(
            `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
        );
        
    } catch (error) {
        console.error("MongoDB connection error:", (error as Error).message);
        process.exit(1);
    }
}

export default connectDB;