import { HTTP_STATUS_CODES } from "@constants/error-codes";
import { UserModel } from "@models/users.model";
import { userSchema } from "@schemas/auth-schemas";
import { appLogger } from "@src/configs/app-logger";
import { comparePasswordHash } from "@src/utils/bcrypt-utils";
import { attachAccessAndRefreshTokenCookie } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";
import { ZodError } from "zod";

export const loginController: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body as Record<string, unknown>;
        const parsedEmail = await userSchema.email.parseAsync(email);
        const parsedPassword = await userSchema.password.parseAsync(password);

        const userDoc = await UserModel.findOne({ email: parsedEmail }).exec();
        if (userDoc === null) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }

        const isSame = await comparePasswordHash(parsedPassword, userDoc.password);
        if (isSame === true) {
            const payload = {
                userId: userDoc._id,
                email: userDoc.email
            };
            appLogger.info(payload);
            attachAccessAndRefreshTokenCookie(res, payload);
            return void res.sendStatus(HTTP_STATUS_CODES.OK);
        }

        return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
    } catch (err) {
        appLogger.error(err);
       if (err instanceof ZodError) 
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};
