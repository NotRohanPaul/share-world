import { API_ORIGIN, IS_SECURE_ENV } from "./env";

export const COMMON_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: IS_SECURE_ENV,
    sameSite: IS_SECURE_ENV ? "none" as const : "strict" as const,
    domain: IS_SECURE_ENV ? new URL(API_ORIGIN).hostname : undefined,
    path: "/",
};