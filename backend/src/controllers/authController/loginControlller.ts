import type { RequestHandler } from "express";
import { UserModel } from "src/models/users.model";
import { emailSchema } from "src/schemas/authSchemas";

export const loginController: RequestHandler<"POST"> = async (req, res) => {
    try {
        await emailSchema.parseAsync(req.body.email);
    }
    catch (err) {
        console.log(err);
    }
    if ((await UserModel.exists({ name: "Test" }))?._id !== undefined) return void res.sendStatus(500);

    const testUser = new UserModel({
        name: "Test",
        email: "Test",
        password: "Test",
    });

    await testUser.save();
    res.sendStatus(200);
};