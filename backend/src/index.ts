import http, { type RequestListener } from 'node:http';
import { appLogger } from "./configs/app-logger";
import { connectDB } from "./configs/connect-DB";
import { app } from "./configs/express-app";
import { gracefulShutdown } from "./configs/graceful-shutdown";
import { initializeSocket } from './configs/socket-handler';
import { HOST, PORT } from "./constants/env";

const server = http.createServer(app as RequestListener);
server.keepAliveTimeout = 30000;
server.headersTimeout = 35000;
server.on('error', (err) => {
    appLogger.error('Server error: \n', err);
    process.exit(1);
});

initializeSocket(server);

try {
    await connectDB();
    server.listen(PORT, HOST, () => {
        appLogger.info(`Listening on http://${HOST}:${PORT}`);
    });
} catch (err) {
    appLogger.error("Failed to start server \n", err);
    process.exit(1);
}

gracefulShutdown(server);