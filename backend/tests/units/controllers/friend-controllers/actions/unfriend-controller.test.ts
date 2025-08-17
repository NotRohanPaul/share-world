import { UserModel } from "@src/models/users.model";
import { setupMongoReplicaServer } from "tests/configs/helpers/common";
import { afterEach, describe, expect, it } from "vitest";
import { createUsers, provideMockRequestHandlerArguments } from "../helpers/common";
import { unfriendController } from "@src/controllers/friend-controllers/actions";



describe("test for unfriend controller", () => {
    setupMongoReplicaServer();

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    it("respose 200 if both are already friends and the receiver is unfriended", async () => {
        const { user1, user2 } = await createUsers();
        await UserModel.updateOne(
            { email: user1.email },
            {
                $addToSet: { friendsEmailList: user2.email }
            }
        );

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await unfriendController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
    });

    it("respose 400 if both are not friends", async () => {
        const { user1, user2 } = await createUsers();

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await unfriendController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Receiver is not a friend");
    });

    it("respose 400 if both are sender and receiver is same email", async () => {
        const { user1 } = await createUsers();

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user1);

        await unfriendController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Receiver can't be same as sender");
    });

    it("respose 400 if sender email is undefined", async () => {
        const { user1, user2 } = await createUsers();
        user1.email = undefined as unknown as string;

        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await unfriendController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Sender and/or receiver are missing");
    });

    it("respose 400 if receiver email is undefined", async () => {

        const { user1, user2 } = await createUsers();

        user2.email = undefined as unknown as string;
        const { mockRequest, mockResponse, mockNext } = provideMockRequestHandlerArguments(user1, user2);

        await unfriendController(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("Sender and/or receiver are missing");
    });
});