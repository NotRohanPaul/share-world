import { listBlockedUsersController } from "@src/controllers/friend-controllers/list";
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


describe("test for list controller to return blocked users list with info", () => {
    setupMongoReplicaServer();

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    it("response 200 with the list of blocked users", async () => {
        const usersList = Array.from({ length: 10 }).map((_, i) => {
            return {
                name: "test",
                email: `test${i + 1}@test.com`,
                password: "Test@123"
            };
        });

        const usersDocArr = await UserModel.insertMany(usersList);

        const allEmailListExceptFirst = usersList.slice(1).map(({ email }) => {
            return email;
        });
        await UserModel.updateOne(
            {
                email: usersDocArr[0].email,
            },
            {
                blockedEmailList: allEmailListExceptFirst
            }
        );

        const mockRequest = {
            query: { limit: 50 }
        } as unknown as express.Request;
        const mockResponse = {
            locals: {
                context: {
                    auth: {
                        email: "test1@test.com"
                    }
                }
            },
            send: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as Mocked<express.Response>;
        const mockNext = vi.fn();

        await listBlockedUsersController(mockRequest, mockResponse, mockNext);

        const expectedResponseBody = usersList.slice(1).map(({ email, name }) => {
            return {
                email,
                name
            };
        }).sort((a, b) => a.email.localeCompare(b.email));
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        const params = mockResponse.send.mock.calls[0][0] as typeof expectedResponseBody;
        const actualValueSendCalledWith = params.sort((a, b) => a.email.localeCompare(b.email));
        expect(actualValueSendCalledWith).toMatchObject(expectedResponseBody);
        console.log({
            expected: expectedResponseBody,
            actual: actualValueSendCalledWith
        });
    });
});