import { describe, expect, it } from "vitest";
import {
    createUsers,
    provideMockRequestHandlerArguments,
    setupMongoReplicaServer
} from "./helpers/common";
import { deleteController } from "@src/controllers/friend-controllers/request";
import { FriendRequestModel } from "@src/models/friend-request.model";

describe("test friend request delete controller", () => {
    setupMongoReplicaServer();

    it("response 200 for successful deletion of request", async () => {
        const { user1, user2 } = await createUsers();
        await FriendRequestModel.create({
            sender: user1._id.toHexString(),
            receiver: user2._id.toHexString(),
        });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await deleteController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it("response 400 for no request present for deletion", async () => {
        const { user1, user2 } = await createUsers();

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await deleteController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("No request to delete");
    });
});