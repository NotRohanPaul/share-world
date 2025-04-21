import type { RequestHandler } from "express";
import { UserModel } from "src/models/users.model";
// import { emailSchema, passwordSchema } from "src/schemas/authSchemas";
// import { AppError } from "src/utils/appError";

export const loginController: RequestHandler<
    "POST",
    Record<string, unknown>,
    {
        email: string | undefined,
        password: string | undefined;
    }
> = async (req, res) => {
    // try{

    //     // const { email, password } = req.body;
    //     // const parsedEmail = emailSchema.safeParse(email);
    //     // const parsedPassowrd = passwordSchema.parse(password)
    // }
    // catch(err){
    //     // appError(err);
    // }

    if ((await UserModel.exists({ name: "Test" }))?._id !== undefined) return void res.sendStatus(500);

    const testUser = new UserModel({
        name: "Test",
        email: "Test",
        password: "Test",
    });

    await testUser.save();
    res.sendStatus(200);
};