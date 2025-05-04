import type { RequestHandler } from "express";


export const timeoutHandler = (duration: number) => {
    if (typeof duration !== "number" && duration < 1_000 || duration > 100_000) {
        const handler: RequestHandler = (_req, _res, next) => {
            next(new Error("Duration is not between [1,100] seconds"));
        };

        return handler;
    }

    const handler: RequestHandler = (req, res, next) => {
        const timeoutId = setTimeout(() => {
            const error = new Error("Request timed out");
            // error.status = 408;
            next(error);
        }, duration);

        res.on('finish', () => clearTimeout(timeoutId));

        next();
    };
    return handler;
};