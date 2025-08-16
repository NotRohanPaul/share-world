import { COMMON_COOKIE_OPTIONS } from "@src/constants/common";
import { JWT_SECRET } from "@src/constants/env";
import type { Response } from "express";
import jwt from "jsonwebtoken";

export const attachAccessAndRefreshTokenCookie = (res: Response, payload: Record<string, unknown>): Response => {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.cookie("accessToken", accessToken, {
        ...COMMON_COOKIE_OPTIONS,
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        ...COMMON_COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res;
};

export const attachNewAccessToken = (res: Response, payload: Record<string, unknown>): Response => {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });

    res.cookie("accessToken", accessToken, {
        ...COMMON_COOKIE_OPTIONS,
        maxAge: 15 * 60 * 1000,
    });

    return res;
};