import { AppIcons } from "@src/assets/icons";
import { appRoutes } from "@src/routes/app-routes";
import { Outlet, useLocation, useNavigate } from "react-router";
import { BoxButton } from "../common/ui/inputs/buttons/box-button";

export const UserMain = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="h-full flex flex-col justify-center items-center [@media(max-height:30rem)]:justify-start overflow-y-auto p-1">
            {location.pathname !== "/user" ?
                <Outlet /> :
                <section className="flex flex-col gap-2 text-2xl max-xs:text-base">
                    <div className="w-[20rem] h-[10rem] max-xs:w-[15rem] max-xs:h-[7rem] flex gap-2">
                        <BoxButton
                            className="p-3"
                            onClick={() => void navigate(appRoutes["via-id"].absolute)}
                        >
                            <AppIcons.ShareId className="w-[3.5rem] h-full max-xs:w-[3rem]" />
                            <p>
                                Share via ID
                            </p>
                        </BoxButton>
                        <BoxButton
                            onClick={() => void navigate(appRoutes["to-friend"].absolute)}

                        >
                            <AppIcons.Users className="w-[3.5rem] h-full max-xs:w-[3rem]" />
                            <p>Share to Friend</p>
                        </BoxButton>
                    </div>
                    <div>
                        <BoxButton
                            className="flex-row gap-2"
                            onClick={() => void navigate(appRoutes.friends.absolute)}
                        >
                            <AppIcons.AddUsers className="w-[2.5rem] h-full max-xs:w-[1.5rem]" />
                            <p>View Friends</p>
                        </BoxButton>
                    </div>
                </section>
            }
        </main >
    );
};
