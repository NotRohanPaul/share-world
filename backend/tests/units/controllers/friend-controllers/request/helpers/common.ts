import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import express from "express";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MongodbMemoryOptions } from "tests/configs/memory-db-options";
import {
    afterAll,
    afterEach,
    beforeAll,
    vi,
    type Mock,
    type Mocked
} from "vitest";

type CreatedUserType = Awaited<ReturnType<typeof UserModel.create>>[number];

export const createUsers = async (): Promise<Record<string, CreatedUserType>> => {
    const user1 = await UserModel.create({
        name: "test",
        email: "test@example.com",
        password: "Test@123"
    });
    const user2 = await UserModel.create({
        name: "test",
        email: "test1@example.com",
        password: "Test@123"
    });

    return { user1, user2 };
};

export const provideMockRequestHandlerArguments = (user1: CreatedUserType, user2: CreatedUserType): {
    mockRequest: Mocked<express.Request>,
    mockResponse: Mocked<express.Response>,
    mockNext: Mock,
} => {
    const mockRequest = {} as unknown as Mocked<express.Request>;
    const mockResponse = {
        locals: {
            context: {
                auth: {
                    email: "test@example.com"
                },
                receiverEmail: "test1@example.com",
                senderId: user1._id.toHexString(),
                receiverId: user2._id.toHexString(),
            }
        },
        send: vi.fn().mockReturnThis(),
        status: vi.fn().mockReturnThis(),
        sendStatus: vi.fn().mockReturnThis(),
    } as unknown as Mocked<express.Response>;
    const mockNext = vi.fn();

    return { mockRequest, mockResponse, mockNext };
};

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

    afterEach(async () => {
        await UserModel.deleteMany({});
        await FriendRequestModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
};