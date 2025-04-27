import type { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "@constants/error-codes";
import { UserModel } from "@models/users.model";
import { userSchema } from "@schemas/auth-schemas";
import { comparePasswordHash } from "@src/utils/bcrypt-utils";
import { attachAccessAndRefreshTokenCookie } from "@src/utils/jwt-utils";

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
            console.log(payload);
            attachAccessAndRefreshTokenCookie(res, payload);
            return void res.sendStatus(HTTP_STATUS_CODES.OK);
        }

        return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
    } catch (err) {
        console.log(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};
