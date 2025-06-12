import type { RequestHandler } from "express";


export const timeoutHandler = (duration: number): RequestHandler => {
    if (typeof duration !== "number" || duration < 1_000 || duration > 100_000) {
        const handler: RequestHandler = (_req, _res, next) => {
            next(new Error("Duration is not between [1000,100000] miliseconds"));
        };

        return handler;
    }

    const handler: RequestHandler = (_req, res, next) => {
        const timeoutId = setTimeout(() => {
            const error = new Error("Request timed out");
            next(error);
        }, duration);

        res.on('finish', () => clearTimeout(timeoutId));

        next();
    };
    return handler;
};