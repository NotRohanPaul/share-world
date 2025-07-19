import { IS_SECURE_ENV } from "@src/constants/env";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import pino, { multistream, type Logger } from "pino";

let appLogger: Logger;

if (IS_SECURE_ENV === true) {
    const logDir = path.join(import.meta.dirname, "logs");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const shortId = randomUUID().slice(0, 8);
    const logFilePath = path.join(logDir, `app-${timestamp}-${shortId}.log`);

    if (fs.existsSync(logDir) === false) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    appLogger = pino(
        { level: "info" },
        multistream([
            { stream: pino.destination(logFilePath) },
            { stream: process.stdout }
        ])
    );
} else {
    const isTestEnv = process.env.VITEST === "true" || process.env.NODE_ENV === "test";
    appLogger = isTestEnv
        ? pino({ level: "info" })
        : pino({
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true
                }
            }
        });
}

export { appLogger };
