import {
    listBlockedUsersController,
    listFriendRequestsController,
    listFriendsController
} from "@src/controllers/friend-controllers/list";
import {
    acceptController,
    blockController,
    rejectController,
    sendController
} from "@src/controllers/friend-controllers/request";
import { receiverContextMiddleware } from "@src/middlewares/friends/receiver-context-middleware";
import { Router } from "express";

const requestRouter = Router();
requestRouter.post("/send", sendController);
requestRouter.post("/reject", rejectController);
requestRouter.post("/accept", acceptController);
requestRouter.post("/block", blockController);

const listRouter = Router();
listRouter.get("/friends", listFriendsController);
listRouter.get("/requests", listFriendRequestsController);
listRouter.get("/blocks", listBlockedUsersController);

const friendRouter = Router();
friendRouter.use("/request", receiverContextMiddleware, requestRouter);
friendRouter.use("/list", listRouter);

export { friendRouter };

