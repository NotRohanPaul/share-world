import {
    listBlockedUsersController,
    listFriendRequestsController,
    listFriendsController
} from "@src/controllers/friend-controllers/list";
import { receiverContextHandler } from "@src/controllers/friend-controllers/middlewares/receiver-checks-handler";
import {
    acceptController,
    blockController,
    rejectController,
    sendController
} from "@src/controllers/friend-controllers/request";
import { Router } from "express";

const requestRouteHandler = Router();
requestRouteHandler.use("/send", sendController);
requestRouteHandler.use("/reject", rejectController);
requestRouteHandler.use("/accept", acceptController);
requestRouteHandler.use("/block", blockController);

const listRouteHandler = Router();
listRouteHandler.use("/friends", listFriendsController);
listRouteHandler.use("/requests", listFriendRequestsController);
listRouteHandler.use("/blocks", listBlockedUsersController);

const friendRouteHandler = Router();
friendRouteHandler.use("/request", receiverContextHandler, requestRouteHandler);
friendRouteHandler.use("/list", listRouteHandler);

export { friendRouteHandler };

