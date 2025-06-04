import http from 'node:http';
import { Server } from "socket.io";
import { connectDB } from "./configs/connect-DB";
import { app } from "./configs/express-app";
import { initializeSocket } from './configs/socket-handler';
import { APP_ORIGIN, HOST, PORT } from "./constants/env";
import { isSecureEnv } from './utils/common';


const server = http.createServer(app as http.RequestListener);
const io = new Server(server, {
    path: "/socket/v1",
    cors: {
        origin: isSecureEnv() ? APP_ORIGIN : true,
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

initializeSocket(io);

void connectDB().then(() => {
    server.listen(PORT, HOST, () => {
        console.log(`Listening: http://${HOST}:${PORT}`);
    });
}); 