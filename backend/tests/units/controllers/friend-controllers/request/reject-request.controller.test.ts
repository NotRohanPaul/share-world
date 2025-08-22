import { rejectRequestController } from "@src/controllers/friend-controllers/request";
import { FriendRequestsModel } from "@src/models/non-core-models";
import { UsersModel } from "@src/models/core-models";
import { setupMongoReplicaServer } from "tests/configs/helpers/common";
import { afterEach, describe, expect, it } from "vitest";
import {
    createUsers,
    provideMockRequestHandlerArguments,
} from "../helpers/common";

describe("test friend request reject controller", () => {
    setupMongoReplicaServer();

    afterEach(async () => {
        await UsersModel.deleteMany({});
        await FriendRequestsModel.deleteMany({});
    });

    it("response 200 for successful rejection of request", async () => {
        const { user1, user2 } = await createUsers();
        await FriendRequestsModel.create({
            sender: user2._id.toHexString(),
            receiver: user1._id.toHexString(),
        });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await rejectRequestController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it("response 400 for no request present for rejection", async () => {
        const { user1, user2 } = await createUsers();

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await rejectRequestController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("No request to reject");
    });
});