import type React from "react";
import { APP_ENV } from "@src/constants/env";

export const isSecureEnv = (): boolean => {
    const insecureEnvs = ['development', 'test'];
    const isSecure = insecureEnvs.includes(APP_ENV) === false;

    return isSecure;
};

export const isTrusted = (e: React.SyntheticEvent<unknown>): boolean => {
    if (isSecureEnv() === false) return true;

    if (e.isTrusted === true) return true;

    return false;
};

export const testId = (id: string): { "data-testid": string; } | Record<string, never> => {
    if (isSecureEnv() === false) return { "data-testid": id };

    return {};
};

