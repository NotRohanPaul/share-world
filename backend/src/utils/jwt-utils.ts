import { JWT_SECRET, NODE_ENV } from "@src/constants/env";
import type { Response } from "express";
import jwt from "jsonwebtoken";

export const attachAccessAndRefreshTokenCookie = (res: Response, payload: Record<string, unknown>): Response => {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: NODE_ENV !== "DEVELOPMENT",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV !== "DEVELOPMENT",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res;
};