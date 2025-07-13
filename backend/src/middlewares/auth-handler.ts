import { appLogger } from "@src/configs/app-logger";
import { JWT_SECRET } from "@src/constants/env";
import { HTTP_STATUS_CODES } from "@src/constants/error-codes";
import { cookiesSchema, jwtPayloadSchema } from "@src/schemas/auth-schemas";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authHandler: RequestHandler = async (req, res, next) => {
    try {
        const parsedCookies = await cookiesSchema.parseAsync(req.cookies as Record<string, unknown>);
        const accessToken = parsedCookies.accessToken;
        if (accessToken === undefined)
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);


        const payload = jwt.verify(accessToken, JWT_SECRET);

        const parsedPayload = await jwtPayloadSchema.parseAsync(payload);
        if (parsedPayload !== null && typeof parsedPayload === "object") {
            next();
        }
    }
    catch (err) {
        appLogger.error({ err });
        return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
    }

};