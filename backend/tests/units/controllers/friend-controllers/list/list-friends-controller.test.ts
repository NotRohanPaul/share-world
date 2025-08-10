import { listFriendsController } from "@src/controllers/friend-controllers/list";
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


describe("test for list friends controller", () => {
    setupMongoReplicaServer();

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    it("reponse 200 with all friends of the user", async () => {
        const testUserEmail = "test1@test.com";
        const usersList = Array.from({ length: 10 }).map((_, i) => {
            return {
                name: "Test",
                email: `test${i + 1}@test.com`,
                password: "Test@123"
            };
        });

        await UserModel.insertMany(usersList);


        const emailsListExceptOne = usersList.filter(({ email }) => email !== testUserEmail).map(({ email }) => {
            return email;
        });

        await UserModel.updateOne({
            email: testUserEmail
        }, {
            friendsEmailList: emailsListExceptOne
        });

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

        await listFriendsController(mockRequest, mockResponse, mockNext);

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