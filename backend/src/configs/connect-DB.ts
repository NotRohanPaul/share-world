import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

export const connectDB = async (): Promise<void> => {
    try {
        console.log("Connecting to DB");
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");
    }
    catch (err) {
        console.log("Error connecting to DB \n", err);
        process.exit(1);
    }
};