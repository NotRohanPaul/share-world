import type { RequestHandler } from "express";

export const logoutController: RequestHandler = (_req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return void res.status(200).send("Logout successful");
};