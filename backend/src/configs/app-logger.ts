import { isSecureEnv } from "@src/utils/common";
import path from "node:path";
import pino, { multistream, type Logger } from "pino";
import fs from "node:fs";

let appLogger: Logger;

if (isSecureEnv() === true) {
    const logDir = path.join(process.cwd(), "logs");
    const logFilePath = path.join(logDir, "app.log");

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