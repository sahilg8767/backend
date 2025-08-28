import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB= async()=>{
    try{
       const connectInstant = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
       console.log(`\n MongoDB connected !! DB HOST: ${connectInstant.connection.host}`);
        
    }
    catch(error){
        console.log("MongoDb connection error", error);
        process.exit(1);
    }
}

export default connectDB;