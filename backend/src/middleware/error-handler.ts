import type { ErrorRequestHandler } from "express";
import { HTTP_STATUS_CODES } from "@constants/error-codes";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (res.headersSent) {
        return;
    }

    console.log(err);
    return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);

};