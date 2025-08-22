import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { UsersModel } from "@src/models/core-models";
import type { AuthContextHandlerType } from "@src/types/context";

export type SenderReceiverContextHandlerType = AuthContextHandlerType<{
    context: {
        receiverEmail?: string,
        senderId?: string,
        receiverId?: string,
    };
}>;

export const senderReceiverChecksMiddleware: SenderReceiverContextHandlerType = async (_req, res, next) => {
    const senderEmail = res.locals.context?.auth?.email;
    const receiverEmail = res.locals.context?.receiverEmail;

    if (senderEmail === undefined || receiverEmail === undefined) {
        return void res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send("Missing sender or receiver email");
    }

    const senderUser = await UsersModel.findOne({ email: senderEmail }).select("_id");
    const receiverUser = await UsersModel.findOne({ email: receiverEmail }).select("_id");

    if (senderUser === null || receiverUser === null) {
        return void res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .send("Sender or Receiver not found");
    }
    if (res.locals.context === undefined) {
        throw new Error("No context in res locals");
    }

    res.locals.context.senderId = senderUser._id.toHexString();
    res.locals.context.receiverId = receiverUser._id.toHexString();

    next();
};