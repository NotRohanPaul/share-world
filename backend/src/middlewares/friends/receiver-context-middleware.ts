import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { UserModel } from "@src/models/users.model";
import { userSchema } from "@src/schemas/auth-schemas";
import type { AuthContextHandlerType } from "@src/types/context";
import { ZodError } from "zod";

export const receiverContextMiddleware: AuthContextHandlerType<{
    context: { receiverEmail?: string; },
    reqBody: { receiverEmail?: string; },
}> = async (req, res, next) => {
    try {
        const receiverEmail = req.body.receiverEmail;
        const parsedReceiverEmail = await userSchema.shape.email.parseAsync(receiverEmail);

        const result = await UserModel.exists({ email: parsedReceiverEmail });
        if (result === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("Receiver email doesn't exists");
        }

        res.locals.context = {
            ...res.locals.context,
            receiverEmail: parsedReceiverEmail
        };
        next();

    }
    catch (e) {
        appLogger.error(e);
        if (e instanceof ZodError) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
}; 