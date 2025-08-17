import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import type { SenderReceiverContextHandlerType } from "@src/middlewares/friends/sender-receiver-checks-middleware";
import { FriendRequestModel } from "@src/models/friend-request.model";

export const deleteRequestController: SenderReceiverContextHandlerType = async (_req, res) => {
    try {
        const senderId = res.locals.context?.senderId;
        const receiverId = res.locals.context?.receiverId;

        const isRequestAlreadyExists = await FriendRequestModel.exists({
            sender: senderId,
            receiver: receiverId,
        });

        if (isRequestAlreadyExists === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No request to delete");
        }

        await FriendRequestModel.deleteOne({
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
