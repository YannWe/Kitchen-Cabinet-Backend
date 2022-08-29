import mongoose from "mongoose";
import dotenv from "dotenv";

// loading environment variables
dotenv.config();

// connecting Async
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log("Connection to MongoDB failed", error.message)
    };
};