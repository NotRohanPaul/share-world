import type { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";

export const unknownHandler: RequestHandler = (_req, res) => {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
};