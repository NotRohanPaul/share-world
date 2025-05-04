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

authRouteHandler.get('/some-endpoint', async (req, res) => {
    try {
        const result = await new Promise((resolve) => setTimeout(() => resolve("Done"), 12000));
        res.send(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send("An unexpected error occurred");
        }
    }
});
authRouteHandler.post("/signup", signupController);
authRouteHandler.post("/login", loginController);
authRouteHandler.get("/logout", logoutController);
authRouteHandler.get("/refresh-token", refreshController);




export { authRouteHandler };

