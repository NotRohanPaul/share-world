import type { SocketMiddlewareType } from "@src/sockets/types/socket-types";

export const userIdSocketMiddleware: SocketMiddlewareType = (socket, next) => {
  socket.data.userId = socket.id.slice(0, 5);
  next();
};