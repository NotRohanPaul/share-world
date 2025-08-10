import { listSentRequestsController } from "@src/controllers/friend-controllers/list";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import express from "express";
import { setupMongoReplicaServer } from "tests/configs/helpers/common";
import {
    afterEach,
    describe,
    expect,
    it,
    vi,
    type Mocked
} from "vitest";


describe("test for list sent request", () => {
    setupMongoReplicaServer();

    afterEach(async () => {
        await UserModel.deleteMany({});
        await FriendRequestModel.deleteMany({});
    });

    it("reponse 200 with all sent request users list", async () => {
        const testUserEmail = "test1@test.com";
        const usersList = Array.from({ length: 10 }).map((_, i) => {
            return {
                name: "Test",
                email: `test${i + 1}@test.com`,
                password: "Test@123"
            };
        });

        const users = await UserModel.insertMany(usersList);

        const testUserId = users.find(({ email }) => email === testUserEmail)?._id;
        if (testUserId === undefined) return;

        const emailsListExceptOne = users.filter(({ email }) => email !== testUserEmail).map(({ _id }) => {
            return {
                sender: testUserId.toHexString(),
                receiver: _id.toHexString()
            };
        });
        await FriendRequestModel.insertMany(emailsListExceptOne);

        const mockRequest = {

        } as express.Request;
        const mockResponse = {
            locals: {
                context: {
                    auth: {
                        email: testUserEmail
                    }
                }
            },
            send: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis(),
        } as unknown as Mocked<express.Response>;
        const mockNext = vi.fn();

        await listSentRequestsController(mockRequest, mockResponse, mockNext);

        const expectedResponseBody = usersList.filter(({ email }) => email !== testUserEmail).map(({ email, name }) => {
            return {
                email,
                name
            };
        }).sort((a, b) => a.email.localeCompare(b.email));
        const params = mockResponse.send.mock.calls[0][0] as typeof expectedResponseBody;
        const actualValueSendCalledWith = params.sort((a, b) => a.email.localeCompare(b.email));

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(actualValueSendCalledWith).toMatchObject(expectedResponseBody);
        console.log({
            expected: expectedResponseBody,
            actual: actualValueSendCalledWith
        });
    });
});