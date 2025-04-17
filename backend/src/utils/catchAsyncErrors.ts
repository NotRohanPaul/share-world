import type { NextFunction, Request, Response } from "express";

type AsyncRouteHandlerType<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export const catchAsyncErrors =
    <T>(asyncRouteHandler: AsyncRouteHandlerType<T>)
        : AsyncRouteHandlerType<T> => {
        return async (req, res, next) => {
            try {
                await asyncRouteHandler(req, res, next);
            }
            catch (err) {
                console.log(err);
            }
        };
    };