import { sendController } from "@src/controllers/friend-controllers/request";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { MongodbMemoryOptions } from "tests/configs/memory-db-options";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

type CreatedUserType = Awaited<ReturnType<typeof UserModel.create>>[number];

const createUsers = async (): Promise<Record<string, CreatedUserType>> => {
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

const provideMockResponse = (user1: CreatedUserType, user2: CreatedUserType): express.Response => {
    return {
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
    } as unknown as express.Response;
};

describe("test for friend request send controller", () => {
    let mongoServer: MongoMemoryServer;
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create(MongodbMemoryOptions);
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

    it("response 200 if the request is sent", async () => {
        const { user1, user2 } = await createUsers();
        const mockRequest = {} as unknown as express.Request;
        const mockResponse = provideMockResponse(user1, user2);
        const mockNext = vi.fn();
        await sendController(mockRequest, mockResponse, mockNext);
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it("response 400 if the request already exist", async () => {
        const { user1, user2 } = await createUsers();
        const mockRequest = {} as unknown as express.Request;
        const mockResponse = provideMockResponse(user1, user2);
        const mockNext = vi.fn();
        await FriendRequestModel.create({
            sender: user1._id.toHexString(),
            receiver: user2._id.toHexString(),
        });

        await sendController(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Request already sent");
    });

    it("response 400 if already friends", async () => {
        const { user1, user2 } = await createUsers();
        await UserModel.updateOne({ _id: user1.id }, { friendsEmailList: user2.email });

        const mockRequest = {} as unknown as express.Request;
        const mockResponse = provideMockResponse(user1, user2);
        const mockNext = vi.fn();

        await sendController(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Already both are friends");
    });

    it("response 400 if the sender is blocked by receiver", async () => {
        const { user1, user2 } = await createUsers();
        await UserModel.updateOne({ _id: user2.id }, { blockedEmailList: user1.email });

        const mockRequest = {} as unknown as express.Request;
        const mockResponse = provideMockResponse(user1, user2);
        const mockNext = vi.fn();

        await sendController(mockRequest, mockResponse, mockNext);
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    });
});