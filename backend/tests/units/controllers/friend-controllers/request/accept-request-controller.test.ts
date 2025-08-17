import { acceptRequestController } from "@src/controllers/friend-controllers/request";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import { setupMongoReplicaServer } from "tests/configs/helpers/common";
import {
    afterEach,
    describe,
    expect,
    it
} from "vitest";
import {
    createUsers,
    provideMockRequestHandlerArguments,
} from "../helpers/common";


describe("test for friend request accept controller", () => {
    setupMongoReplicaServer();

    afterEach(async () => {
        await UserModel.deleteMany({});
        await FriendRequestModel.deleteMany({});
    });

    it("response 200 if the request is already present to accept", async () => {
        const { user1, user2 } = await createUsers();
        await FriendRequestModel.create({
            sender: user2._id.toHexString(),
            receiver: user1._id.toHexString(),
        });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await acceptRequestController(mockRequest, mockResponse, mockNext);
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it("response 400 if the request doesnt exist", async () => {
        const { user1, user2 } = await createUsers();
        await FriendRequestModel.create({
            sender: user1._id.toHexString(),
            receiver: user2._id.toHexString(),
        });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);


        await acceptRequestController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Request does not exist");
    });
});