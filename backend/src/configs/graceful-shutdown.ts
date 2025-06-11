import mongoose from "mongoose";
import type { Server } from "node:http";
import { appLogger } from "./app-logger";

export const gracefulShutdown = (server: Server) => {
    //To prevent multiple calls for termination
    let isShuttingDown = false;

    function shutdown() {
        if (isShuttingDown === true) return;
        isShuttingDown = true;

        appLogger.info('Shutting down server...');

        server.on('close', () => {
            appLogger.info('Server has closed');
        });
        server.close(async () => {
            try {
                appLogger.info('Closing MongoDB connection');
                await mongoose.connection.close(false);
                appLogger.info('MongoDB connection closed');
                process.exit(0);
            }
            catch (err) {
                appLogger.info('Something went wrong during MongoDB connection closing \n', err);
                process.exit(1);
            }
        });
    }

    process.on('unhandledRejection', (reason, origin) => {
        appLogger.error(`Unhandled Rejection at: ${origin}`, reason);
        shutdown();
    });
    process.on('uncaughtException', (error, origin) => {
        appLogger.error(`Uncaught Exception at: ${origin}`, error);
        shutdown();
    });
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
};