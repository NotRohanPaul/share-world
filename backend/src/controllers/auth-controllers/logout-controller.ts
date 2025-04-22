import type { RequestHandler } from "express";

export const logoutController: RequestHandler = (_req, res) => {
    res.status(200).send("Logout successful");
};