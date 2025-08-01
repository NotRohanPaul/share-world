import type { ErrorRequestHandler, RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { appLogger } from "@src/configs/app-logger";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (res.headersSent) {
        return;
    }

    appLogger.info(err);
    return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
};

export const unknownHandler: RequestHandler = (_req, res) => {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
};


