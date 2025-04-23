import type { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "@constants/error-codes";
import { UserModel } from "@models/users.model";
import { userSchema } from "@schemas/auth-schemas";
import { comparePasswordHash } from "@src/utils/bcrypt";

export const loginController: RequestHandler<
    "POST",
    string,
    {
        email: string | undefined;
        password: string | undefined;
    }
> = async (req, res) => {
    try {
        const { email, password } = req.body;

        const parsedEmail = await userSchema.email.parseAsync(email);
        const parsedPassword = await userSchema.password.parseAsync(password);

        const userDoc = await UserModel.findOne({ email: parsedEmail }).exec();

        if (!userDoc || !userDoc.password) {
            return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }

        const isSame = await comparePasswordHash(parsedPassword, userDoc.password);

        if (isSame) {
            return void res.sendStatus(HTTP_STATUS_CODES.OK);
        }

        return void res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
    } catch (err) {
        console.log(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send("Internal Server Error");
    }
};
