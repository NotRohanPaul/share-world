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


export const debounceProvider = <T extends any[]>(
    fn: (...args: T) => any,
    delay: number
) => {
    let timerId: number | null = null;
    return (...params: T) => {
        if (timerId !== null) clearTimeout(timerId);
        timerId = setTimeout(fn, delay, ...params);
    };
};