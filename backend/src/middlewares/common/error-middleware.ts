import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { appLogger } from "@src/configs/app-logger";
import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
    if (res.headersSent) {
        return;
    }

    appLogger.info(err);
    return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);

};