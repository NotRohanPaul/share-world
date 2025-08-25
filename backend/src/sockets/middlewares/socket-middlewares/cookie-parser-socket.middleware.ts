import { cookiePraserWithEncryptionMiddleware } from "@src/middlewares/common/cookie-parser-with-encryption.middleware";
import express from "express";
import type { SocketMiddlewareType } from "../../types/socket-types";
import { appLogger } from "@src/configs/app-logger";


export const socketCookieMiddleware: SocketMiddlewareType<{
    socketData: {
        cookies: Record<string, unknown>,
        signedCookies?: Record<string, unknown>,
    };
}> = (socket, next) => {
    try {
        const req = { headers: socket.handshake.headers } as express.Request;
        const res = {} as express.Response;

        void cookiePraserWithEncryptionMiddleware(req, res, (err?: unknown) => {
            if (err !== undefined) {
                if (err instanceof Error) {
                    return void next(err);
                }
                else {
                    return void next(new Error("Somthing went wrong with socket cookie praser"));
                };
            }
            socket.data.cookies = req.cookies || undefined;
            socket.data.signedCookies = req.signedCookies || undefined;
            next();
        });
    }
    catch (err) {
        appLogger.error(err);
        if (err instanceof Error) {
            return void next(err);
        }
        else {
            return void next(new Error("Somthing went wrong with socket cookie praser"));
        };
    }
};
