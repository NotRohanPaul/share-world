import type React from "react";
import { APP_ENV } from "@src/constants/env";


export const isTrusted = (e: React.SyntheticEvent<any>): boolean => {
    if (APP_ENV === "development" || APP_ENV === "test") return true;

    if (e.isTrusted === true) return true;

    return false;
};