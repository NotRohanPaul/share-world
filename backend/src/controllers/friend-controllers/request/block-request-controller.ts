import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import type { SenderReceiverContextHandlerType } from "@src/middlewares/friends/sender-receiver-checks-middleware";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import mongoose from "mongoose";

export const blockRequestController: SenderReceiverContextHandlerType = async (_req, res) => {
    try {
        const requestReceiverId = res.locals.context?.senderId;
        const requestSenderId = res.locals.context?.receiverId;
        const requestReceiverEmail = res.locals.context?.auth?.email;
        const requestSenderEmail = res.locals.context?.receiverEmail;

        const isRequestAlreadyExists = await FriendRequestModel.exists({
            sender: requestSenderId,
            receiver: requestReceiverId,
        });

        if (isRequestAlreadyExists === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Request does not exist");
        }

        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            await FriendRequestModel.deleteOne(
                { sender: requestSenderId, receiver: requestReceiverId },
                { session }
            );
            await FriendRequestModel.deleteOne(
                { sender: requestReceiverId, receiver: requestSenderId },
                { session }
            );

            await UserModel.updateOne(
                { email: requestReceiverEmail },
                { $addToSet: { blockedEmailList: requestSenderEmail } },
                { session }
            );

            await session.commitTransaction();
        } catch (e) {
            await session.abortTransaction();
            throw e;
        } finally {
            await session.endSession();
        }

        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        appLogger.error(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};