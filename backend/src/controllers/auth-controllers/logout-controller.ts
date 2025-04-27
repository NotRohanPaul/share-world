import type { RequestHandler } from "express";

export const logoutController: RequestHandler = (req, res) => {
    console.log(req.cookies);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return void res.status(200).send("Logout successful");
};