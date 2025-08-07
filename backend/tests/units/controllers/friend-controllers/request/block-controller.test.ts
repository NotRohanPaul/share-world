import { blockController } from "@src/controllers/friend-controllers/request";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { describe, expect, it } from "vitest";
import {
    createUsers,
    provideMockRequestHandlerArguments,
    setupMongoReplicaServer
} from "./helpers/common";

describe("test friend request block controller", () => {
    setupMongoReplicaServer();

    it("respose 200 if the sender tries to block receiver for a existing friend request", async () => {
        const { user1, user2 } = await createUsers();
        await FriendRequestModel.create({
            sender: user2._id.toHexString(),
            receiver: user1._id.toHexString(),
        });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await blockController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);

    });

    it("respose 400 if the sender tries to block receiver for a non existing friend request", async () => {
        const { user1, user2 } = await createUsers();

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await blockController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Request does not exist");

    });

});