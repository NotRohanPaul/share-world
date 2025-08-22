import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { FriendRequestsModel } from "@src/models/non-core-models";
import { UsersModel } from "@src/models/core-models";
import type { AuthContextHandlerType } from "@src/types/context";


export const listSentRequestsController: AuthContextHandlerType = async (_req, res) => {
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

        const sentRequest = await FriendRequestsModel.find({
            sender: usersDoc._id.toHexString(),
        }).limit(50);

        if (sentRequest === null) {
            return void res.status(HTTP_STATUS_CODES.OK).send([]);
        }

        const receiverIds = sentRequest.map(({ receiver }) => {
            return receiver;
        });

        const users = await UsersModel.find(
            { _id: { $in: receiverIds.slice(0, 50) } },
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