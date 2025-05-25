import http from 'node:http';
import { Server } from "socket.io";
import { connectDB } from "./configs/connect-DB";
import { app } from "./configs/express-app";
import { initializeSocket } from './configs/socket-handler';
import { APP_ORIGIN, PORT } from "./constants/env";


const server = http.createServer(app as http.RequestListener);
const io = new Server(server, {
    path: "/socket/v1/socket.io",
    cors: {
        origin: APP_ORIGIN,
        credentials: true,
    }
});

initializeSocket(io);

void connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Listening: http://localhost:${PORT}`);
    });
}); 