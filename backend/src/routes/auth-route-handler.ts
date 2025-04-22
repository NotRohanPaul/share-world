import { Router } from "express";
import {
    loginController,
    logoutController,
    signupController
} from "@controllers/auth-controllers";


const authRouteHandler = Router();

authRouteHandler.post("/signup", signupController);
authRouteHandler.post("/login", loginController);
authRouteHandler.get("/logout", logoutController);




export { authRouteHandler };

