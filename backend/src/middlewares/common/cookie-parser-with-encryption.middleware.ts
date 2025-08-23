import { appLogger } from "@src/configs/app-logger";
import { COOKIE_CRYPTO_SECRET, COOKIE_SIGN_SECRET } from "@src/constants/env";
import { decrypt } from "@src/utils/crypto-utils";
import cookieParser from "cookie-parser";

export const cookiePraserWithEncryptionMiddleware = cookieParser(COOKIE_SIGN_SECRET, {
    decode: (val) => {
        try {
            return decrypt(decodeURIComponent(val), COOKIE_CRYPTO_SECRET);
        } catch (err) {
            appLogger.error(err, "Failed to decrypt cookie: ");
            return "__INVALID__";
        }
    }
})