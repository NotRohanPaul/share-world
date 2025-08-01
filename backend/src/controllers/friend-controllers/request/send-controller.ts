import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import type { SenderReceiverContextHandlerType } from "@src/middlewares/friends/sender-receiver-checks-middleware";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import { ZodError } from "zod";

export const sendController: SenderReceiverContextHandlerType = async (_req, res) => {
    try {
        const senderEmail = res.locals.context?.auth?.email;
        const receiverEmail = res.locals.context?.receiverEmail;
        const senderId = res.locals.context?.senderId;
        const receiverId = res.locals.context?.receiverId;

        const isRequestAlreadyExists = await FriendRequestModel.exists({
            sender: senderId,
            receiver: receiverId,
        });

        if (isRequestAlreadyExists !== null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Request already sent");
        }

        const isAlreadyFriends = await UserModel.exists({
            email: senderEmail,
            friendsEmailList: receiverEmail
        });

        if (isAlreadyFriends !== null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Already both are friends");
        }

        await FriendRequestModel.create({
            sender: senderId,
            receiver: receiverId,
        });

        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (e) {
        appLogger.error({ e });
        if (e instanceof ZodError) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};