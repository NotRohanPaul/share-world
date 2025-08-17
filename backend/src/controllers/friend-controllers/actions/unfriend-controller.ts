import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import type { SenderReceiverContextHandlerType } from "@src/middlewares/friends/sender-receiver-checks-middleware";
import { UserModel } from "@src/models/users.model";
import mongoose from "mongoose";


export const unfriendController: SenderReceiverContextHandlerType = async (_req, res) => {
    try {
        const senderEmail = res.locals.context?.auth?.email;
        const receiverEmail = res.locals.context?.receiverEmail;

        if (senderEmail === undefined || receiverEmail === undefined) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Sender and/or receiver are missing");
        }

        if (senderEmail === receiverEmail) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Receiver can't be same as sender");
        }

        const isAlreadyFriends = await UserModel.exists({
            email: senderEmail,
            friendsEmailList: receiverEmail,
        });

        if (isAlreadyFriends === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Receiver is not a friend");
        }

        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            await UserModel.updateOne(
                { email: senderEmail },
                {
                    $pull: { friendsEmailList: receiverEmail }
                },
                { session }
            );

            await UserModel.updateOne(
                { email: receiverEmail },
                {
                    $pull: { friendsEmailList: senderEmail }
                },
                { session }
            );

            await session.commitTransaction();
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            await session.endSession();
        }

        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        appLogger.error(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};