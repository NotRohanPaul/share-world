import { UsersModel } from "@src/models/core-models";
import express from "express";
import {
    vi,
    type Mock,
    type Mocked
} from "vitest";

export type CreatedUserType = Awaited<ReturnType<typeof UsersModel.create>>[number];

export const createUsers = async (): Promise<Record<string, CreatedUserType>> => {
    const user1 = await UsersModel.create({
        name: "test",
        email: "test@example.com",
        password: "Test@123"
    });
    const user2 = await UsersModel.create({
        name: "test one",
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
                    email: user1.email,
                },
                receiverEmail: user2.email,
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

