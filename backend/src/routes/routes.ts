import { Router } from "express";
import { authRouteHandler } from "./authRouteHandler";
import { fileUploadRouteHandler } from "./fileUploadRouteHandler";

const routesHandler = Router();

//auth 
routesHandler.use("/auth", authRouteHandler);

//file upload 
routesHandler.use("/upload-files", fileUploadRouteHandler);


export { routesHandler };