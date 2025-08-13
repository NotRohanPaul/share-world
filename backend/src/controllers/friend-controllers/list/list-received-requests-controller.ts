import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import type { AuthContextHandlerType } from "@src/types/context";


export const listReceivedRequestsController: AuthContextHandlerType = async (_req, res) => {
    try {
        const userEmail = res.locals.context?.auth?.email;

        if (userEmail === undefined) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No email in context");
        }

        const usersDoc = await UserModel.findOne({
            email: userEmail
        });

        if (usersDoc === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No email in context");
        }

        const receivedRequest = await FriendRequestModel.find({
            receiver: usersDoc._id.toHexString(),
        }).limit(50);

        console.log(receivedRequest);
        if (receivedRequest === null) {
            return void res.status(HTTP_STATUS_CODES.OK).send([]);
        }

        const senderIds = receivedRequest.map(({ sender }) => {
            return sender;
        });

        const users = await UserModel.find(
            { _id: { $in: senderIds.slice(0, 50) } },
            { name: 1, email: 1, _id: 0 }
        );

        if (users === null) {
            return void res.status(HTTP_STATUS_CODES.OK).send([]);
        }
        return void res.status(HTTP_STATUS_CODES.OK).send(users);
    }
    catch (err) {
        appLogger.error(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

};