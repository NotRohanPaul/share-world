import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import type { SenderReceiverContextHandlerType } from "@src/middlewares/friends/sender-receiver-checks.middleware";
import { FriendRequestsModel } from "@src/models/non-core-models";

export const rejectRequestController: SenderReceiverContextHandlerType = async (_req, res) => {
    try {
        const senderId = res.locals.context?.senderId;
        const receiverId = res.locals.context?.receiverId;

        const isRequestAlreadyExists = await FriendRequestsModel.exists({
            sender: receiverId,
            receiver: senderId,
        });

        if (isRequestAlreadyExists === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No request to reject");
        }

        await FriendRequestsModel.deleteOne({
            sender: receiverId,
            receiver: senderId,
        });

        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        appLogger.error(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};