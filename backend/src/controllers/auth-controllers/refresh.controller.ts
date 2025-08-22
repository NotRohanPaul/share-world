import { appLogger } from "@src/configs/app-logger";
import { JWT_SECRET } from "@src/constants/env";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { cookiesSchema, jwtPayloadLooseTransformSchema } from "@src/schemas/auth-schemas";
import { attachNewAccessToken } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

export const refreshController: RequestHandler = async (req, res) => {
    try {
        const cookies = req.cookies as Record<"refreshToken", string> | undefined;
        if (cookies === undefined) {
            appLogger.info("No Cookies");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }
        const parsedRefreshToken = await cookiesSchema.shape.refreshToken.parseAsync(cookies.refreshToken);
        if (parsedRefreshToken === undefined || parsedRefreshToken === '') {
            appLogger.info("Parsed Refresh Token is invalid");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }

        const payload = jwt.verify(parsedRefreshToken, JWT_SECRET) as Record<string, unknown>;
        const parsedPayload = await jwtPayloadLooseTransformSchema.parseAsync(payload);
        attachNewAccessToken(res, parsedPayload);
        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        if (err instanceof ZodError) {
            appLogger.info(err, "Zod Error: ");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }
        if (err instanceof jwt.JsonWebTokenError) {
            appLogger.info(err, "JWT Error: ");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};