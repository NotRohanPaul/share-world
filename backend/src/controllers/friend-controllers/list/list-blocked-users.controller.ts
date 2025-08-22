import { appLogger } from "@src/configs/app-logger";
import { HTTP_STATUS_CODES } from "@src/constants/http-status-codes";
import { UsersModel } from "@src/models/core-models";
import type { AuthContextHandlerType } from "@src/types/context";


export const listBlockedUsersController: AuthContextHandlerType<{
    reqQuery: {
        limit?: string,
    };
}> = async (req, res) => {
    try {
        const userEmail = res.locals.context?.auth?.email;
        if (userEmail === undefined) {
            return void res.status(HTTP_STATUS_CODES.BAD_REQUEST).send("No user mail in context");
        }
        let limit = Number(req.query?.limit);
        if (isNaN(limit) || limit <= 0 || limit > 50) {
            limit = 50;
        }

        const blockedEmailListDoc = await UsersModel.findOne(
            { email: userEmail },
            { blockedEmailList: 1, _id: 0 }
        );

        if (blockedEmailListDoc === null) {
            return void res.status(HTTP_STATUS_CODES.OK).send([]);
        }

        const blockedEmails = blockedEmailListDoc.blockedEmailList;

        const users = await UsersModel.find(
            { email: { $in: blockedEmails.slice(0, limit) } },
            { name: 1, email: 1, _id: 0 }
        );

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