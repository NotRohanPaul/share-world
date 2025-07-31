import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import type { AuthContextHandlerType } from "@src/types/context";
import { ZodError } from "zod";

export const sendController: AuthContextHandlerType<{
    context: { receiverEmail?: string; };
}> = async (_req, res) => {
    try {
        const senderEmail = res.locals.context?.auth?.email;
        const receiverEmail = res.locals.context?.receiverEmail;

        if (senderEmail === undefined || receiverEmail === undefined) {
            return void res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .send("Missing sender or receiver email");
        }

        const senderUser = await UserModel.findOne({ email: senderEmail }).select("_id");
        const receiverUser = await UserModel.findOne({ email: receiverEmail }).select("_id");

        if (senderUser === null || receiverUser === null) {
            return void res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .send("Sender or Receiver not found");
        }

        const isRequestAlreadyExists = await FriendRequestModel.exists({
            sender: senderUser._id,
            receiver: receiverUser._id,
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
            sender: senderUser._id,
            receiver: receiverUser._id,
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