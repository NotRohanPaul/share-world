import {
    listBlockedUsersController,
    listFriendsController,
    listReceivedRequestsController,
    listSentRequestsController
} from "@src/controllers/friend-controllers/list";
import {
    acceptRequestController,
    blockRequestController,
    deleteRequestController,
    rejectRequestController,
    sendRequestController
} from "@src/controllers/friend-controllers/request";
import { receiverContextMiddleware } from "@src/middlewares/friends/receiver-context-middleware";
import { senderReceiverChecksMiddleware } from "@src/middlewares/friends/sender-receiver-checks-middleware";
import { Router } from "express";

const requestRouter = Router();
requestRouter.post("/send", sendRequestController);
requestRouter.delete("/delete", deleteRequestController);
requestRouter.post("/reject", rejectRequestController);
requestRouter.post("/accept", acceptRequestController);
requestRouter.post("/block", blockRequestController);

const listRouter = Router();
listRouter.get("/friends", listFriendsController);
listRouter.get("/received-requests", listReceivedRequestsController);
listRouter.get("/sent-requests", listSentRequestsController);
listRouter.get("/blocks", listBlockedUsersController);

const friendRouter = Router();
friendRouter.use("/request", receiverContextMiddleware, senderReceiverChecksMiddleware, requestRouter);
friendRouter.use("/list", listRouter);

export { friendRouter };

