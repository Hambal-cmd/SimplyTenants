import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to MONGO DB.");
    } catch (error) {
        console.log("Error in connecting to Mongo DB ",error);
        process.exit(1);
    }
}