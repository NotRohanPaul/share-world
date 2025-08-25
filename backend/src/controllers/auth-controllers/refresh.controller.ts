import { appLogger } from "@src/configs/app-logger";
import { JWT_SECRET } from "@src/constants/env";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { BlockedRefreshTokensModel } from "@src/models/non-core-models";
import { cookiesSchema, jwtPayloadLooseTransformSchema } from "@src/schemas/auth-schemas";
import { attachNewAccessToken } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ZodError } from "zod";

export const refreshController: RequestHandler = async (req, res) => {
    try {
        const cookies = req.signedCookies as Record<"refreshToken", string> | undefined;
        if (cookies === undefined) {
            appLogger.info("No Cookies");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }

        const parsedRefreshToken = await cookiesSchema.shape.refreshToken.parseAsync(cookies.refreshToken);

        const jwtPayload = jwt.verify(parsedRefreshToken, JWT_SECRET) as JwtPayload;
        if (jwtPayload.exp === undefined) {
            appLogger.info("No exp is JWT payload");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }

        const parsedPayload = await jwtPayloadLooseTransformSchema.parseAsync(jwtPayload);

        const isTokenBlocked = await BlockedRefreshTokensModel.exists({
            token: parsedRefreshToken
        });

        if (isTokenBlocked !== null) {
            appLogger.info("Token is blocked");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }

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