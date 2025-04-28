import { HTTP_STATUS_CODES } from "@src/constants/error-codes";
import { UserModel } from "@src/models/users.model";
import { userSchema } from "@src/schemas/auth-schemas";
import { attachAccessAndRefreshTokenCookie } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";


type SignupReqBody = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export const signupController: RequestHandler = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body as SignupReqBody;
        const parsedName = await userSchema.name.parseAsync(name);
        const parsedEmail = await userSchema.email.parseAsync(email);
        const parsedPassword = await userSchema.password.parseAsync(password);
        const parsedConfirmPassword = await userSchema.password.parseAsync(confirmPassword);

        if (parsedPassword !== parsedConfirmPassword)
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        const exisitingUserDoc = await UserModel.exists({ email: parsedEmail });
        if (exisitingUserDoc !== null)
            return void res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .send("Email already registered");

        const newUser = new UserModel({
            name: parsedName,
            email: parsedEmail,
            password: parsedPassword,
        });

        await newUser.save();

        const payload = {
            userId: newUser._id,
            email: newUser.email
        };
        attachAccessAndRefreshTokenCookie(res, payload);
        return void res
            .status(HTTP_STATUS_CODES.CREATED)
            .send("Signup successful");
    }
    catch (err) {
        console.log(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};