import type { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "@constants/error-codes";

export const unknownHandler: RequestHandler = (_req, res) => {
    res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
};