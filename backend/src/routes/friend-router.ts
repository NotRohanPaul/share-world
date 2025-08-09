import {
    listBlockedUsersController,
    listFriendsController,
    listReceivedRequestsController,
    listSentRequestsController
} from "@src/controllers/friend-controllers/list";
import {
    acceptController,
    blockController,
    deleteController,
    rejectController,
    sendController
} from "@src/controllers/friend-controllers/request";
import { receiverContextMiddleware } from "@src/middlewares/friends/receiver-context-middleware";
import { senderReceiverChecksMiddleware } from "@src/middlewares/friends/sender-receiver-checks-middleware";
import { Router } from "express";

const requestRouter = Router();
requestRouter.post("/send", sendController);
requestRouter.post("/delete", deleteController);
requestRouter.post("/reject", rejectController);
requestRouter.post("/accept", acceptController);
requestRouter.post("/block", blockController);

const listRouter = Router();
listRouter.get("/friends", listFriendsController);
listRouter.get("/received-requests", listReceivedRequestsController);
listRouter.get("/received-requests", listSentRequestsController);
listRouter.get("/blocks", listBlockedUsersController);

const friendRouter = Router();
friendRouter.use("/request", receiverContextMiddleware, senderReceiverChecksMiddleware, requestRouter);
friendRouter.use("/list", listRouter);

export { friendRouter };

