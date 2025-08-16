import { AppIcons } from "@src/assets/icons";
import type { UseQueryResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { motion } from "motion/react";
import { UserInfo, type UserInfoListType } from "../users/user-info";


export const FriendPaneQueryResult = ({
    queryResult,
}: {
    queryResult: UseQueryResult<{
        key?: string;
        response: AxiosResponse<UserInfoListType>;
    }>,
}) => {
    const { data, isLoading, error } = queryResult;
    const queryData = data?.response?.data;
    const queryKey = queryResult.data?.key;

    return (
        <section className="h-full flex flex-col overflow-auto p-1">
            {isLoading === true && <AppIcons.Loader className="self-center w-[3rem] h-auto text-primary" />}
            {
                queryData !== undefined
                &&
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    className="h-full flex flex-col gap-2"
                >
                    {
                        (
                            Array.isArray(queryData) === true &&
                            queryData.length > 0
                        ) ?
                            <UserInfo
                                userInfoList={queryData}
                                queryKey={queryKey}
                            /> :
                            <p className="text-xl text-center">
                                Not Found
                            </p>
                    }
                </motion.div>
            }
            {
                error !== null
                &&
                <p className="text-xl text-center">
                    Something went wrong
                </p>
            }
        </section >
    );
};
