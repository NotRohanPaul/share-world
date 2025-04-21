import type { ErrorRequestHandler } from "express";
import { HTTP_STATUS_CODES } from "src/constants/errorCodes";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.log(err);
    return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);

};