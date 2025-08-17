import { sendRequestController } from "@src/controllers/friend-controllers/request";
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

describe("test for friend request send controller", () => {
    setupMongoReplicaServer();

    afterEach(async () => {
        await UserModel.deleteMany({});
        await FriendRequestModel.deleteMany({});
    });

    it("response 200 if the request is sent", async () => {
        const { user1, user2 } = await createUsers();

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await sendRequestController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it("response 400 if the request already exist", async () => {
        const { user1, user2 } = await createUsers();
        await FriendRequestModel.create({
            sender: user1._id.toHexString(),
            receiver: user2._id.toHexString(),
        });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await sendRequestController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Request already sent");
    });

    it("response 400 if already friends", async () => {
        const { user1, user2 } = await createUsers();
        await UserModel.updateOne({ _id: user1.id }, { friendsEmailList: user2.email });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await sendRequestController(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Already both are friends");
    });

    it("response 400 if the sender is blocked by receiver", async () => {
        const { user1, user2 } = await createUsers();
        await UserModel.updateOne({ _id: user2.id }, { blockedEmailList: user1.email });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await sendRequestController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    });

    it("response 400 if the receiver is blocked by sender", async () => {
        const { user1, user2 } = await createUsers();
        await UserModel.updateOne({ _id: user1.id }, { blockedEmailList: user2.email });

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await sendRequestController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    });
});