import http, { type RequestListener } from 'node:http';
import { appLogger } from "./configs/app-logger";
import { connectDB } from "./configs/connect-DB";
import { app } from "./configs/express-app";
import { gracefulShutdown } from "./configs/graceful-shutdown";
import { initializeSocket } from './sockets/socket-app';
import { HOST, NODE_ENV, PORT } from "./constants/env";
import { isSecureEnv } from "./utils/common";
import { APP_TIMEOUTS } from "./constants/timeouts";

const server = http.createServer(app as RequestListener);
server.keepAliveTimeout = APP_TIMEOUTS.keepAliveTimeout;
server.headersTimeout = APP_TIMEOUTS.headersTimeout;
server.on('error', (err) => {
    appLogger.error('Server error: \n', err);
    process.exit(1);
});

initializeSocket(server);

try {
    await connectDB();
    server.listen(PORT, HOST, () => {
        appLogger.info(`Listening on http://${HOST}:${PORT}`);
        appLogger.info(`Enviroment: ${NODE_ENV} and isSecureEnv() value is ${isSecureEnv()}`);
    });
} catch (err) {
    appLogger.error("Failed to start server \n", err);
    process.exit(1);
}

gracefulShutdown(server);