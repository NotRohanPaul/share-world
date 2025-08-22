import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { UsersModel } from "@src/models/core-models";
import { jwtPayloadStrictSchema, userSchema } from "@schemas/auth-schemas";
import { appLogger } from "@src/configs/app-logger";
import { comparePasswordHash } from "@src/utils/bcrypt-utils";
import { attachAccessAndRefreshTokenCookie } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";
import { ZodError } from "zod";

export const loginController: RequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body as Record<string, unknown>;
        const parsedEmail = await userSchema.shape.email.parseAsync(email);
        const parsedPassword = await userSchema.shape.password.parseAsync(password);

        const userDoc = await UsersModel.findOne({ email: parsedEmail }).exec();
        if (userDoc === null) {
            appLogger.info("No user found");
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }

        const isSame = await comparePasswordHash(parsedPassword, userDoc.password);
        if (isSame === false) {
            appLogger.info({ isSame, test: userDoc.password }, "Password Mismatch",);
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }


        const payload = {
            userId: userDoc._id.toHexString(),
            email: userDoc.email
        };
        const parsedPayload = await jwtPayloadStrictSchema.parseAsync(payload);
        appLogger.info(parsedPayload);
        attachAccessAndRefreshTokenCookie(res, parsedPayload);
        return void res
            .status(HTTP_STATUS_CODES.OK)
            .send({
                name: userDoc.name,
                email: userDoc.email,
            });

    } catch (err) {
        if (err instanceof ZodError) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }

        appLogger.error(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};
