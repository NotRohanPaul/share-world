import {
    loginController,
    logoutController,
    signupController
} from "@controllers/auth-controllers";
import { refreshController } from "@src/controllers/auth-controllers/refresh.controller";
import { timeoutMiddleware } from "@src/middlewares/common/timeout.middleware";
import { Router } from "express";


const authRouter = Router();

authRouter.use(timeoutMiddleware(10_000));
authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.get("/logout", logoutController);
authRouter.get("/refresh-token", refreshController);

export { authRouter };