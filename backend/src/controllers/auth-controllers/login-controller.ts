import type { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "@constants/error-codes";
import { UserModel } from "@models/users.model";
import { emailSchema, passwordSchema } from "@schemas/auth-schemas";

export const loginController: RequestHandler<
    "POST",
    Record<string, unknown>,
    {
        email: string | undefined,
        password: string | undefined;
    }
> = async (req, res) => {
    try {
        const { email, password } = req.body;
        const parsedEmail = await emailSchema.parseAsync(email);
        const parsedPassword = await passwordSchema.parseAsync(password);

        const exisitingUserDoc = await UserModel.exists({ email: parsedEmail });
        if (exisitingUserDoc !== null) return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        const newUser = new UserModel({
            name: "Test",
            email: parsedEmail,
            password: parsedPassword,
        });

        await newUser.save();
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
};