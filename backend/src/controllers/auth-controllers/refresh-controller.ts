import { appLogger } from "@src/configs/app-logger";
import { JWT_SECRET } from "@src/constants/env";
import { HTTP_STATUS_CODES } from "@src/constants/error-codes";
import { cookiesSchema, jwtPayloadLooseTransformSchema } from "@src/schemas/auth-schemas";
import { attachNewAccessToken } from "@src/utils/jwt-utils";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const refreshController: RequestHandler = async (req, res) => {
    try {
        const cookies = req.cookies as Record<"refreshToken", string> | undefined;
        if (cookies === undefined) {
            appLogger.info("No Cookies");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }
        const parsedRefreshToken = await cookiesSchema.shape.refreshToken.parseAsync(cookies.refreshToken);
        if (parsedRefreshToken === undefined || parsedRefreshToken === '')
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);

        const payload = jwt.verify(parsedRefreshToken, JWT_SECRET) as Record<string, unknown>;
        const parsedPayload = await jwtPayloadLooseTransformSchema.parseAsync(payload);
        attachNewAccessToken(res, parsedPayload);
        return void res.sendStatus(HTTP_STATUS_CODES.OK);
    }
    catch (err) {
        appLogger.info(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};