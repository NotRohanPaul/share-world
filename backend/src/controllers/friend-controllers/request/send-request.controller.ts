import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import type { SenderReceiverContextHandlerType } from "@src/middlewares/friends/sender-receiver-checks.middleware";
import { FriendRequestsModel } from "@src/models/non-core-models";
import { UsersModel } from "@src/models/core-models";

export const sendRequestController: SenderReceiverContextHandlerType = async (_req, res) => {
    try {
        const senderEmail = res.locals.context?.auth?.email;
        const receiverEmail = res.locals.context?.receiverEmail;
        const senderId = res.locals.context?.senderId;
        const receiverId = res.locals.context?.receiverId;

        const isRequestAlreadyExists = await FriendRequestsModel.exists({
            sender: senderId,
            receiver: receiverId,
        });

        if (isRequestAlreadyExists !== null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Request already sent");
        }

        const isAlreadyFriends = await UsersModel.exists({
            email: senderEmail,
            friendsEmailList: receiverEmail
        });

        if (isAlreadyFriends !== null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Already both are friends");
        }

        const isSenderBlockedbyReceiver = await UsersModel.exists({
            email: receiverEmail,
            blockedEmailList: senderEmail
        });

        if (isSenderBlockedbyReceiver !== null) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }

        const isReceiverBlockedbySender = await UsersModel.exists({
            email: senderEmail,
            blockedEmailList: receiverEmail
        });

        if (isReceiverBlockedbySender !== null) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }

        await FriendRequestsModel.create({
            sender: senderId,
            receiver: receiverId,
        });

        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        appLogger.error(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};