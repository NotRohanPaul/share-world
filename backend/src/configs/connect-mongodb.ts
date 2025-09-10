import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";
import { appLogger } from "./app-logger";

export const connectMongodb = async (): Promise<void> => {
    try {
        appLogger.info("Connecting to DB");
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 60e3
        });
        appLogger.info("Connected to DB");
    }
    catch (err) {
        appLogger.info("Error connecting to DB \n", err);
        process.exit(1);
    }
};