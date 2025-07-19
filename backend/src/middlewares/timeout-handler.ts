import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/error-codes";
import type { RequestHandler } from "express";


export const timeoutHandler = (duration: number): RequestHandler => {
    if (typeof duration !== "number" || duration < 1_000 || duration > 100_000) {
        const handler: RequestHandler = (_req, _res, next) => {
            next(new Error("Duration is not between [1e3,1e5] miliseconds"));
        };

        return handler;
    }

    const handler: RequestHandler = (_req, res, next) => {
        const timeoutId = setTimeout(() => {
            if (res.headersSent === true) return;

            appLogger.info("Request timed out");
            res.sendStatus(HTTP_STATUS_CODES.GATEWAY_TIMEOUT);
        }, duration);

        res.on("finish", () => clearTimeout(timeoutId));

        next();
    };
    return handler;
};