import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterAll, beforeAll } from "vitest";
import { MongodbMemoryOptions } from "../memory-db-options";

export const setupMongoReplicaServer = (): void => {
    let mongoServer: MongoMemoryReplSet;
    beforeAll(async () => {
        mongoServer = await MongoMemoryReplSet.create({
            replSet: {
                count: 1
            },
            ...MongodbMemoryOptions
        });
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
};