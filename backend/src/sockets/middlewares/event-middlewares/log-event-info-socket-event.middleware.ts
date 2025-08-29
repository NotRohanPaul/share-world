import { appLogger } from "@src/configs/app-logger";
import type { EventMiddlewareType } from "../../types/socket-generic-types";

export const logEventInfoSocketEventMiddleware: EventMiddlewareType = (event, next) => {
    appLogger.info({ args: event.slice(1) }, `Event received: ${event[0]}`);
    next();
};