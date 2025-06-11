import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";
import { appLogger } from "./app-logger";

export const connectDB = async (): Promise<void> => {
    try {
        appLogger.info("Connecting to DB");
        await mongoose.connect(MONGO_URI);
        appLogger.info("Connected to DB");
    }
    catch (err) {
        appLogger.info("Error connecting to DB \n", err);
        process.exit(1);
    }
};