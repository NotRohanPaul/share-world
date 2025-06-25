import mongoose from "mongoose";
import type { Server } from "node:http";
import { appLogger } from "./app-logger";

export const gracefulShutdown = (server: Server): void => {
    //To prevent multiple calls for termination
    let isShuttingDown = false;

    function shutdown(): void {
        if (isShuttingDown === true) return;
        isShuttingDown = true;

        appLogger.info('Shutting down server...');

        server.on('close', () => {
            appLogger.info('Server has closed');
        });
        server.close(() => {
            void (async (): Promise<void> => {
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
            })();
        });
    }

    process.on('unhandledRejection', (reason, origin) => {
        appLogger.error({ reason, origin }, "Unhandled Rejection at: ",);
        shutdown();
    });
    process.on('uncaughtException', (error, origin) => {
        appLogger.error({ error, origin }, "Uncaught Exception at: ");
        shutdown();
    });
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
};