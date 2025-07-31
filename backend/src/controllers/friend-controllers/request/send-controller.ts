import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { FriendRequestModel } from "@src/models/friend-request.model";
import { UserModel } from "@src/models/users.model";
import { userSchema } from "@src/schemas/auth-schemas";
import type { AuthContextHandlerType } from "@src/types/context";
import { ZodError } from "zod";

export const sendController: AuthContextHandlerType = async (req, res) => {
    try {
        const receiverEmail = (req.body as { receiverEmail: string; }).receiverEmail;
        const parsedReceiverEmail = userSchema.shape.email.parseAsync(receiverEmail);

        const isRequestAlreadyExits = await FriendRequestModel.exists({
            userEmail: res.locals.context?.auth?.email,
            receiverEmail: parsedReceiverEmail
        });

        if (isRequestAlreadyExits !== null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Request already sent");
        }

        const isAlreadyFriends = await UserModel.exists({
            email: res.locals.context?.auth?.email,
            friends: parsedReceiverEmail
        });

        if (isAlreadyFriends !== null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Already both are friends");
        }

        await FriendRequestModel.create({
            userEmail: res.locals.context?.auth?.email,
            receiverEmail: parsedReceiverEmail
        });

        return void res.sendStatus(HTTP_STATUS_CODES.OK);

    }
    catch (e) {
        if (e instanceof ZodError) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};