import { IS_SECURE_ENV } from "@src/constants/env";
import type { SyntheticEvent } from "react";

export const isTrusted = (e: SyntheticEvent<unknown>): boolean => {
    if (IS_SECURE_ENV === false) return true;

    if (e.isTrusted === true) return true;

    return false;
};

export const testId = (id: string): { "data-testid": string; } | Record<string, never> => {
    if (IS_SECURE_ENV === false) return { "data-testid": id };

    return {};
};


export const debounceProvider = <T extends unknown[]>(
    fn: (...args: T) => unknown,
    delay: number
): ((...params: T) => void) => {
    let timerId: number | null = null;
    return (...params: T): void => {
        if (timerId !== null) clearTimeout(timerId);
        timerId = setTimeout(fn, delay, ...params);
    };
};

export const throttlingProvider = <T extends unknown[]>(
    fn: (...args: T) => unknown,
    delay: number
): ((...params: T) => void) => {
    let timerId: number | null = null;
    let lastArgs: T | null = null;

    return (...params: T): void => {
        if (timerId === null) {
            fn(...params);
            timerId = window.setTimeout(() => {
                timerId = null;

                if (lastArgs) {
                    fn(...lastArgs);
                    lastArgs = null;

                    timerId = window.setTimeout(() => {
                        timerId = null;
                    }, delay);
                }

            }, delay);
        } else {
            lastArgs = params;
        }
    };
};
