import { IS_SECURE_ENV } from "@src/constants/env";
import type React from "react";

export const isTrusted = (e: React.SyntheticEvent<unknown>): boolean => {
    if (IS_SECURE_ENV === false) return true;

    if (e.isTrusted === true) return true;

    return false;
};

export const testId = (id: string): { "data-testid": string; } | Record<string, never> => {
    if (IS_SECURE_ENV === false) return { "data-testid": id };

    return {};
};

