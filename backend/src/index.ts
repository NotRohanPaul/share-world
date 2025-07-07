import fs from "node:fs";
import http, { type RequestListener } from 'node:http';
import https from 'node:https';
import path from "node:path";
import { appLogger } from "./configs/app-logger";
import { connectDB } from "./configs/connect-DB";
import { app } from "./configs/express-app";
import { gracefulShutdown } from "./configs/graceful-shutdown";
import { HOST, IS_SECURE_ENV, NODE_ENV, PORT } from "./constants/env";
import { APP_TIMEOUTS } from "./constants/timeouts";
import { initializeSocket } from './sockets/socket-app';

let server: http.Server | https.Server;
if (NODE_ENV === 'development') {
    try {
        const key = fs.readFileSync(path.resolve(process.cwd(), '../temp/cert/local-network-key.pem'));
        const cert = fs.readFileSync(path.resolve(process.cwd(), '../temp/cert/local-network.pem'));

        server = https.createServer({ key, cert }, app as RequestListener);
    } catch (err) {
        appLogger.error('Failed to read HTTPS cert files:', err);
        process.exit(1);
    }
} else {
    server = http.createServer(app as RequestListener);
}

server.keepAliveTimeout = APP_TIMEOUTS.keepAliveTimeout;
server.headersTimeout = APP_TIMEOUTS.headersTimeout;
server.on('error', (err) => {
    appLogger.error({err},'Server error: \n');
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
    appLogger.error({err},"Failed to start server \n");
    process.exit(1);
}

gracefulShutdown(server);