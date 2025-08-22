import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { UsersModel } from "@src/models/core-models";
import { jwtPayloadStrictSchema, userSchema } from "@src/schemas/auth-schemas";
import { attachAccessAndRefreshTokenCookie } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";
import { ZodError } from "zod";


type SignupReqBody = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export const signupController: RequestHandler = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body as SignupReqBody;
        const parsedName = await userSchema.shape.name.parseAsync(name);
        const parsedEmail = await userSchema.shape.email.parseAsync(email);
        const parsedPassword = await userSchema.shape.password.parseAsync(password);
        const parsedConfirmPassword = await userSchema.shape.password.parseAsync(confirmPassword);

        if (parsedPassword !== parsedConfirmPassword)
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        const existingUserDoc = await UsersModel.exists({ email: parsedEmail });
        if (existingUserDoc !== null)
            return void res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .send("Email already registered");

        const newUser = await UsersModel.create({
            name: parsedName,
            email: parsedEmail,
            password: parsedPassword,
        });

        const payload = {
            userId: newUser._id.toHexString(),
            email: newUser.email
        };
        const parsedPaylod = await jwtPayloadStrictSchema.parseAsync(payload);
        attachAccessAndRefreshTokenCookie(res, parsedPaylod);
        return void res
            .status(HTTP_STATUS_CODES.CREATED)
            .send({
                name: newUser.name,
                email: newUser.email,
            });
    }
    catch (err) {
        if (err instanceof ZodError)
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        appLogger.info(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};