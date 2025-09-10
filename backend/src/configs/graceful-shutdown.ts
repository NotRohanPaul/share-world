import mongoose from "mongoose";
import type { Server } from "node:http";
import { appLogger } from "./app-logger";
import { pubClient, redis, subClient } from "./redis-client";

const shutdownMogodb = async (): Promise<void> => {
    appLogger.info("Closing MongoDB connection");
    await mongoose.connection.close(false);
    appLogger.info("MongoDB connection closed");
};

const shutdownRedis = async (): Promise<void> => {
    try {
        appLogger.info("Closing Redis clients...");

        await redis.quit();
        appLogger.info("General Redis client closed");

        await pubClient.quit();
        appLogger.info("Pub Redis client closed");

        await subClient.quit();
        appLogger.info("Sub Redis client closed");

        redis.disconnect();
        pubClient.disconnect();
        subClient.disconnect();
    } catch (err) {
        appLogger.error(err, "Error closing Redis clients");
    }
};

//To prevent multiple calls for termination
let isShuttingDown = false;
const shutdownServer = (server: Server): void => {
    if (isShuttingDown === true) return;
    isShuttingDown = true;

    appLogger.info("Shutting down server...");

    server.on("close", () => {
        appLogger.info("Server has closed");
    });
    server.close(() => {
        void (async (): Promise<void> => {
            try {
                await shutdownRedis();
                await shutdownMogodb();
                process.exit(0);
            }
            catch (err) {
                appLogger.error(err, "Something went wrong during server closing \n");
                process.exit(1);
            }
        })();
    });
};

export const gracefulShutdown = (server: Server): void => {
    [
        { client: redis, name: "General" },
        { client: pubClient, name: "Publisher" },
        { client: subClient, name: "Subscriber" }
    ].forEach(({ client, name }) => {
        client.on("end", () => {
            appLogger.error(`${name} Redis client connection closed permanently.`);
            shutdownServer(server);
        });

        client.on("error", (err) => {
            appLogger.error(err, `${name} Redis client error`);
        });
    });

    mongoose.connection.on("disconnected", () => {
        appLogger.error("MongoDB disconnected.");
        shutdownServer(server);
    });

    mongoose.connection.on("error", (err) => {
        appLogger.error(err, "MongoDB connection error.");
        shutdownServer(server);
    });

    process.on("unhandledRejection", (reason, origin) => {
        appLogger.error({ reason, origin }, "Unhandled Rejection at: ",);
        shutdownServer(server);
    });
    process.on("uncaughtException", (error, origin) => {
        appLogger.error({ error, origin }, "Uncaught Exception at: ");
        shutdownServer(server);
    });
    process.on("SIGINT", () => shutdownServer(server));
    process.on("SIGTERM", () => shutdownServer(server));
};