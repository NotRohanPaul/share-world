import { COMMON_COOKIE_OPTIONS } from "@src/constants/common";
import type { RequestHandler } from "express";

export const logoutController: RequestHandler = (_req, res) => {
    res.clearCookie("accessToken", COMMON_COOKIE_OPTIONS);
    res.clearCookie("refreshToken", COMMON_COOKIE_OPTIONS);
    return void res.status(200).send("Logout successful");
};