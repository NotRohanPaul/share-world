import { REDIS_URI } from "@src/constants/env";
import Redis from "ioredis";
import { appLogger } from "./app-logger";

const DELAY_MS = 5e3;
const MAX_WAIT_MS = 60e3;

export const redis = new Redis(REDIS_URI, {
    retryStrategy: (times): number | null => {
        if (times * DELAY_MS > MAX_WAIT_MS) return null;
        return DELAY_MS;
    },
});
export const pubClient = new Redis(REDIS_URI, {
    retryStrategy: (times): number | null => {
        if (times * DELAY_MS > MAX_WAIT_MS) return null;
        return DELAY_MS;
    },
});
export const subClient = pubClient.duplicate();

const waitClientReady = async (
    client: Redis,
    name: string,
): Promise<void> => {
    const start = Date.now();

    return new Promise((resolve, reject) => {
        const checkReady = (): void => {
            client.once("error", () => { });
            if (client.status === "ready") {
                client.on("connecting", () => appLogger.info(`${name} client connecting to Redis`));
                client.on("connect", () => appLogger.info(`${name} client connected to Redis`));
                client.on("ready", () => appLogger.info(`${name} client ready`));
                client.on("reconnecting", () => appLogger.info(`${name} client reconnecting to Redis...`));
                client.on("error", (err) => appLogger.error(err, `${name} client Redis connection error:`));
                client.on("end", () => appLogger.warn(`${name} client connection closed`));
                appLogger.info(`${name} client ready`);
                return void resolve();
            } else if (Date.now() - start > MAX_WAIT_MS) {
                return void reject(new Error(`${name} client failed to connect to Redis after ${MAX_WAIT_MS / 1e3}s`));
            } else {
                setTimeout(checkReady, DELAY_MS);
            }
        };
        checkReady();
    });
};


export const waitForAllRedisReady = async (): Promise<void> => {
    appLogger.info("Waiting for Redis Clients to start.");
    await Promise.all([
        waitClientReady(redis, "General"),
        waitClientReady(pubClient, "Pub"),
        waitClientReady(subClient, "Sub"),
    ]);
    appLogger.info("All Redis clients are ready.");
};