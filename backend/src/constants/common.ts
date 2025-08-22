import { encrypt } from "@src/utils/crypto-utils";
import type { CookieOptions } from "express";
import { API_ORIGIN, COOKIE_CRYPTO_SECRET, IS_SECURE_ENV } from "./env";
import { appLogger } from "@src/configs/app-logger";

export const COMMON_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: IS_SECURE_ENV,
    sameSite: IS_SECURE_ENV ? "none" as const : "strict" as const,
    domain: IS_SECURE_ENV ? new URL(API_ORIGIN).hostname : undefined,
    path: "/",
    signed: true,
    encode: (val) => {
        try {
            return encodeURIComponent(encrypt(val, COOKIE_CRYPTO_SECRET));
        } catch (err) {
            appLogger.error(err, "Failed to encrypt cookie: ");
            return "__INVALID__";
        }
    }
};