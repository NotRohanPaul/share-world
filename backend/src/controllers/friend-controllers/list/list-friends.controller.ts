import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { UsersModel } from "@src/models/core-models/users.model";
import type { AuthContextHandlerType } from "@src/types/express-types";

export const listFriendsController: AuthContextHandlerType = async (_req, res) => {
    try {
        const userEmail = res.locals.context?.auth?.email;

        if (userEmail === undefined) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No email in context");
        }

        const usersDoc = await UsersModel.findOne({
            email: userEmail
        }, {
            _id: 0,
            friendsEmailList: 1,
        });

        if (usersDoc === null) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No email in context");
        }

        const friendsEmails = usersDoc.friendsEmailList;

        const users = await UsersModel.find(
            { email: { $in: friendsEmails.slice(0, 50) } },
            { name: 1, email: 1, _id: 0 }
        );
        console.log(users);
        if (users === null) {
            return void res.status(HTTP_STATUS_CODES.OK).send([]);
        }
        return void res.status(HTTP_STATUS_CODES.OK).send(users);
    }
    catch (err) {
        appLogger.error(err);
        return void res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};