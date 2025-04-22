import type { RequestHandler } from "express";

export const signupController: RequestHandler = (_req, res) => {
    res.status(200).send("Signup successful");
};