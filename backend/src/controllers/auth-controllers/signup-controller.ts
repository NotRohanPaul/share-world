import { HTTP_STATUS_CODES } from "@src/constants/error-codes";
import { UserModel } from "@src/models/users.model";
import { userSchema } from "@src/schemas/auth-schemas";
import type { RequestHandler } from "express";

export const signupController: RequestHandler<
    Record<string, unknown>,
    string,
    {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }
> = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const parsedName = await userSchema.name.parseAsync(name);
        const parsedEmail = await userSchema.email.parseAsync(email);
        const parsedPassword = await userSchema.email.parseAsync(password);
        const parsedConfirmPassword = await userSchema.email.parseAsync(confirmPassword);

        if (parsedPassword !== parsedConfirmPassword)
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        const exisitingUserDoc = await UserModel.exists({ email: parsedEmail });
        if (exisitingUserDoc !== null)
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        const newUser = new UserModel({
            name: parsedName,
            email: parsedEmail,
            password: parsedPassword,
        });

        await newUser.save();
        res.status(HTTP_STATUS_CODES.CREATED)
            .send("Signup successful");
    }
    catch (err) {
        console.log(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send("Signup successful");
    }
};