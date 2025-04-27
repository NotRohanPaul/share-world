import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@src/constants/env";
import { HTTP_STATUS_CODES } from "@src/constants/error-codes";
import type { RequestHandler } from "express";
import { cookiesSchema } from "@src/schemas/auth-schemas";

export const refreshController: RequestHandler = async (req, res) => {
    try {
        const parsedCookies = await cookiesSchema.parseAsync(req.cookies as Record<string, unknown>);
        const refreshToken = parsedCookies.refreshToken;
        if (refreshToken === undefined)
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);

        const payload = jwt.verify(refreshToken, JWT_SECRET);
        console.log(payload);
        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        console.log(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};