import { isSecureEnv } from "@src/utils/common";
import path from "node:path";
import pino, { multistream, type Logger } from "pino";
import fs from "node:fs";
import { randomUUID } from "node:crypto";

let appLogger: Logger;

if (isSecureEnv() === true) {
    const logDir = path.join(process.cwd(), "logs");
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
    appLogger = pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    });
}

export { appLogger };