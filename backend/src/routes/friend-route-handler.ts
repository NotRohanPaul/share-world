import { acceptController, blockController, rejectController, sendController } from "@src/controllers/friend-controllers";
import { Router } from "express";

const friendRouteHandler = Router();

friendRouteHandler.use("/send-request", sendController);
friendRouteHandler.use("/reject-request", rejectController);
friendRouteHandler.use("/accept-request", acceptController);
friendRouteHandler.use("/block-request", blockController);

export { friendRouteHandler };
