import mongoose from "mongoose";
import type { Server } from "node:http";

export const gracefulShutdown = (server: Server) => {
    //To prevent multiple calls for termination
    let isShuttingDown = false;

    function shutdown() {
        if (isShuttingDown === true) return;
        isShuttingDown = true;

        console.log('Shutting down server...');

        server.on('close', () => {
            console.log('Server has closed');
        });
        server.close(async () => {
            try {
                console.log('Closing MongoDB connection');
                await mongoose.connection.close(false);
                console.log('MongoDB connection closed');
                process.exit(0);
            }
            catch (err) {
                console.log('Something went wrong during MongoDB connection closing \n', err);
                process.exit(1);
            }
        });
    }

    process.on('unhandledRejection', (reason, origin) => {
        console.error(`Unhandled Rejection at: ${origin}`, reason);
        shutdown();
    });
    process.on('uncaughtException', (error, origin) => {
        console.error(`Uncaught Exception at: ${origin}`, error);
        shutdown();
    });
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
};