import http from 'node:http';
import { Server } from "socket.io";
import { connectDB } from "./configs/connect-DB";
import { app } from "./configs/express-app";
import { APP_URL, PORT } from "./constants/env";
import { initializeSocket } from './configs/socket-handler';


const server = http.createServer(app as http.RequestListener);
const io = new Server(server, {
    path: "/socket/v1/socket.io",
    cors: {
        origin: APP_URL,
        credentials: true,
    }
});

initializeSocket(io);

void connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Listening: http://localhost:${PORT}`);
    });
}); 