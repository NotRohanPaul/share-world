import { authMiddleware } from "@src/middlewares/auth/auth.middleware";
import { Router } from "express";
import { authRouter } from "./auth.router";
import { friendRouter } from "./friend.router";

const publicRouter = Router();
publicRouter.get("/", (_req, res) => {
    res.send("Welcome to Share World");
});
publicRouter.use("/auth", authRouter);

const protectedRouter = Router();
protectedRouter.use("/friend", friendRouter);

const mainRouter = Router();
mainRouter.use(publicRouter);
mainRouter.use(authMiddleware, protectedRouter);

export { mainRouter };
