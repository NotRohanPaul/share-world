import { Router } from "express";
import { authRouteHandler } from "./auth-route-handler";
import { friendRouteHandler } from "./friend-route-handler";
import { authHandler } from "@src/middlewares/auth-handler";

const routesHandler = Router();

routesHandler.get("/", (_req, res) => {
    res.send("Welcome to Share World");
});

routesHandler.use("/auth", authRouteHandler);

routesHandler.use("/friend", authHandler, friendRouteHandler);


export { routesHandler };