import type { RequestHandler } from "express";

export const logoutController: RequestHandler = (req, res) => {
    // res.cookie("refreshToken", , options)
    console.log(req.cookies);

    return void res.status(200).send("Logout successful");
};