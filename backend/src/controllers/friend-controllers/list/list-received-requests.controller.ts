import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { FriendRequestsModel } from "@src/models/non-core-models";
import { UsersModel } from "@src/models/core-models";
import type { AuthContextHandlerType } from "@src/types/express-types";


export const listReceivedRequestsController: AuthContextHandlerType = async (_req, res) => {
    try {
        const userEmail = res.locals.context?.auth?.email;

        if (userEmail === undefined) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No email in context");
        }

        const usersDoc = await UsersModel.findOne({
            email: userEmail
        });

        if (usersDoc === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No email in context");
        }

        const receivedRequest = await FriendRequestsModel.find({
            receiver: usersDoc._id.toHexString(),
        }).limit(50);

        console.log(receivedRequest);
        if (receivedRequest === null) {
            return void res.status(HTTP_STATUS_CODES.OK).send([]);
        }

        const senderIds = receivedRequest.map(({ sender }) => {
            return sender;
        });

        const users = await UsersModel.find(
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