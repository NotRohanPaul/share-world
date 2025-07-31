import { appLogger } from "@src/configs/app-logger";
import { JWT_SECRET } from "@src/constants/env";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { cookiesSchema, jwtPayloadLooseTransformSchema } from "@src/schemas/auth-schemas";
import type { AuthContextHandlerType } from "@src/types/context";
import jwt from "jsonwebtoken";

export const authMiddleware: AuthContextHandlerType = async (req, res, next) => {
    try {
        const cookies = req.cookies as Record<"accessToken", string> | undefined;
        if (cookies === undefined) {
            appLogger.error("No Cookies");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }

        const prasedCookieAccessToken = await cookiesSchema.shape.accessToken.safeParseAsync(cookies.accessToken);
        if (prasedCookieAccessToken.success === false || prasedCookieAccessToken.data === undefined) {
            appLogger.error("Cookie Prasing Error");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }

        const accessToken = prasedCookieAccessToken.data;
        const jwtPayload = jwt.verify(accessToken, JWT_SECRET);

        const payloadParsedResult = await jwtPayloadLooseTransformSchema.safeParseAsync(jwtPayload);

        if (payloadParsedResult.success === false || payloadParsedResult.data === undefined) {
            appLogger.error("JWT Payload Parsing Error");
            return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
        }

        if (res.locals.context === undefined) res.locals.context = {};
        res.locals.context.auth = payloadParsedResult.data;

        next();

    }
    catch (err) {
        appLogger.error({ err });
        return void res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
    }
};