import { IS_SECURE_ENV, JWT_SECRET } from "@src/constants/env";
import type { Response } from "express";
import jwt from "jsonwebtoken";

export const attachAccessAndRefreshTokenCookie = (res: Response, payload: Record<string, unknown>): Response => {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: IS_SECURE_ENV,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: IS_SECURE_ENV,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res;
};

export const attachNewAccessToken = (res: Response, payload: Record<string, unknown>): Response => {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: IS_SECURE_ENV,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    return res;
};