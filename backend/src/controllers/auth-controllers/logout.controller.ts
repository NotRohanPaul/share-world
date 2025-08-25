import { appLogger } from "@src/configs/app-logger";
import { COMMON_COOKIE_OPTIONS } from "@src/constants/common";
import { JWT_SECRET } from "@src/constants/env";
import { BlockedRefreshTokensModel } from "@src/models/non-core-models";
import { cookiesSchema, jwtPayloadLooseTransformSchema } from "@src/schemas/auth-schemas";
import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const logoutController: RequestHandler = async (req, res) => {
    try {
        const cookies = req.signedCookies as Record<"refreshToken", string> | undefined;
        if (cookies === undefined) {
            throw new Error("No Cookies");
        }

        const parsedCookieRefreshToken = await cookiesSchema.shape.refreshToken.safeParseAsync(cookies.refreshToken);
        if (parsedCookieRefreshToken.success === false) {
            throw new Error("No Refresh Token");
        }

        const refreshToken = parsedCookieRefreshToken.data;
        const jwtPayload = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload;
        console.log(jwtPayload);
        const payloadParsedResult = await jwtPayloadLooseTransformSchema.safeParseAsync(jwtPayload);
        if (payloadParsedResult.success === false) {
            throw new Error("JWT payload is wrong");
        }

        if (jwtPayload.exp === undefined) {
            throw new Error("JWT payload has no expiry");
        }

        await BlockedRefreshTokensModel.create({
            token: refreshToken,
            expiresAt: new Date(jwtPayload.exp * 1e3 + 60 * 1e3)
        });
    }
    catch (err) {
        appLogger.error(err);
    }
    finally {
        res.clearCookie("accessToken", COMMON_COOKIE_OPTIONS);
        res.clearCookie("refreshToken", COMMON_COOKIE_OPTIONS);
        res.status(200).send("Logout successful");
    }
};