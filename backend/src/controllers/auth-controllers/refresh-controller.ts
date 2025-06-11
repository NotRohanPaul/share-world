import { appLogger } from "@src/configs/app-logger";
import { JWT_SECRET } from "@src/constants/env";
import { HTTP_STATUS_CODES } from "@src/constants/error-codes";
import { cookiesSchema } from "@src/schemas/auth-schemas";
import { attachNewAccessToken } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const refreshController: RequestHandler = async (req, res) => {
    try {
        const parsedCookies = await cookiesSchema.parseAsync(req.cookies as Record<string, unknown>);
        const refreshToken = parsedCookies.refreshToken;
        if (refreshToken === undefined || refreshToken === '')
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);

        const payload = jwt.verify(refreshToken, JWT_SECRET) as Record<string, unknown>;
        attachNewAccessToken(res, payload);
        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        appLogger.info(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};