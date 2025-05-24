import {
    loginController,
    logoutController,
    signupController
} from "@controllers/auth-controllers";
import { refreshController } from "@src/controllers/auth-controllers/refresh-controller";
import { timeoutHandler } from "@src/middleware/timeout-handler";
import { Router } from "express";


const authRouteHandler = Router();

authRouteHandler.use(timeoutHandler(10_000));
authRouteHandler.post("/signup", signupController);
authRouteHandler.post("/login", loginController);
authRouteHandler.get("/logout", logoutController);
authRouteHandler.get("/refresh-token", refreshController);




export { authRouteHandler };

