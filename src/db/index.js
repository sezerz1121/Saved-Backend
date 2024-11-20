import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import  dotenv  from "dotenv";
dotenv.config();

const connectDB = async() =>{
    try {

        const connectInstance=await mongoose.connect(`mongodb+srv://tatsam24copywriter:YwMrk9Kxtg2UhlJO@cluster0.6j78u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`Mango DB connected`);
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1);
        
    }
}

export default connectDB;