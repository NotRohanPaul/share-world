import { JWT_SECRET } from "@src/constants/env";
import jwt from "jsonwebtoken";
import type { SocketMiddlewareType } from "../../types/socket-generic-types";
import { appLogger } from "@src/configs/app-logger";
import { cookiesSchema, jwtPayloadLooseTransformSchema } from "@src/schemas/auth-schemas";

export const socketAuthMiddleware: SocketMiddlewareType<{
    context: {
        auth: Record<string, unknown>;
    },
    socketData: {
        signedCookies?: {
            accessToken?: string;
        };
    };
}> = (socket, next) => {
    try {
        const cookies = socket.data.signedCookies;
        if (cookies === undefined) {
            appLogger.error("No Cookies");
            return void next(new Error("Unautorized Access"));
        }

        const prasedCookieAccessToken = cookiesSchema.shape.accessToken.safeParse(cookies.accessToken);
        if (prasedCookieAccessToken.success === false) {
            appLogger.error(prasedCookieAccessToken.error, "Cookie Prasing Error");
            return void next(new Error("Unautorized Access"));
        }

        const jwtPayload = jwt.verify(prasedCookieAccessToken.data, JWT_SECRET);
        const payloadParsedResult = jwtPayloadLooseTransformSchema.safeParse(jwtPayload);
        if (payloadParsedResult.success === false) {
            appLogger.error(payloadParsedResult.error, "JWT Payload Parsing Error");
            return void next(new Error("Unautorized Access"));
        }

        socket.data.context ||= {};
        socket.data.context.auth = {
            email: payloadParsedResult.data.email
        };
        next();
    }
    catch (err) {
        appLogger.error(err);
        return void next(new Error("Somthing went wrong with socket auth middleware"));
    }
};