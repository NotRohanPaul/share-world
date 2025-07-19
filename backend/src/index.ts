import http, { type RequestListener } from "node:http";
import { appLogger } from "./configs/app-logger";
import { connectDB } from "./configs/connect-DB";
import { app } from "./configs/express-app";
import { gracefulShutdown } from "./configs/graceful-shutdown";
import { HOST, IS_SECURE_ENV, NODE_ENV, PORT } from "./constants/env";
import { APP_TIMEOUTS } from "./constants/timeouts";
import { initializeSocket } from "./sockets/socket-app";

const server = http.createServer(app as RequestListener);
server.keepAliveTimeout = APP_TIMEOUTS.keepAliveTimeout;
server.headersTimeout = APP_TIMEOUTS.headersTimeout;
server.on("error", (err) => {
    appLogger.error({ err }, "Server error: \n");
    process.exit(1);
});

initializeSocket(server);

try {
    await connectDB();
    server.listen(PORT, HOST, () => {
        appLogger.info(`Listening on http://${HOST}:${PORT}`);
        appLogger.info(`Enviroment: ${NODE_ENV} and IS_SECURE_ENV value is ${IS_SECURE_ENV}`);
    });
} catch (err) {
    appLogger.error({ err }, "Failed to start server \n");
    process.exit(1);
}

gracefulShutdown(server);