import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import type { SenderReceiverContextHandlerType } from "@src/middlewares/friends/sender-receiver-checks-middleware";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import mongoose from "mongoose";

export const acceptController: SenderReceiverContextHandlerType = async (_req, res) => {
    try {
        const senderEmail = res.locals.context?.auth?.email;
        const receiverEmail = res.locals.context?.receiverEmail;
        const senderId = res.locals.context?.senderId;
        const receiverId = res.locals.context?.receiverId;

        const isRequestAlreadyExists = await FriendRequestModel.exists({
            sender: receiverId,
            receiver: senderId,
        });

        if (isRequestAlreadyExists === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Request does not exist");
        }

        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            await FriendRequestModel.deleteOne(
                { sender: senderId, receiver: receiverId },
                { session }
            );

            await UserModel.updateOne(
                { _id: senderId },
                { $addToSet: { friendsEmailList: receiverEmail } },
                { session }
            );

            await UserModel.updateOne(
                { _id: receiverId },
                { $addToSet: { friendsEmailList: senderEmail } },
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
    catch (e) {
        appLogger.error({ e });
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};