import { Router } from "express";
import { authRouteHandler } from "./auth-route-handler";
import { fileUploadRouteHandler } from "./file-upload-router-handler";

const routesHandler = Router();

routesHandler.get("/", (_req, res) => {
    res.send("Welcome to Share World");
});

routesHandler.use("/auth", authRouteHandler);

routesHandler.use("/upload-files", fileUploadRouteHandler);


export { routesHandler };