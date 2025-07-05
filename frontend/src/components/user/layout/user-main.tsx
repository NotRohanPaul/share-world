import { AppIcons } from "@src/assets/icons";
import { appRoutes } from "@src/routes/app-routes";
import { Outlet, useLocation, useNavigate } from "react-router";

export const UserMain = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="h-full flex flex-col justify-center items-center [@media(max-height:20rem)]:justify-start overflow-y-auto p-1">
            {location.pathname !== "/user" ?
                <Outlet /> :
                <section className="flex flex-col gap-2 text-2xl max-xs:text-base">
                    <div className="w-[20rem] h-[10rem] max-xs:w-[15rem] max-xs:h-[7rem] flex gap-2">
                        <button
                            className="w-full flex flex-col items-center justify-center font-bold border-5 border-primary p-3 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                            onClick={() => void navigate(appRoutes["via-id"].absolute)}
                        >
                            <AppIcons.ShareId className="w-[3.5rem] h-full max-xs:w-[3rem]" />
                            <p>
                                Share via ID
                            </p>
                        </button>
                        <button
                            className="w-full flex flex-col items-center justify-center font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                            onClick={() => void navigate(appRoutes["via-friends"].absolute)}

                        >
                            <AppIcons.Users className="w-[3.5rem] h-full max-xs:w-[3rem]" />
                            <p>Share via Friends</p>
                        </button>
                    </div>
                    <div className="">
                        <button
                            className="w-full h-full flex flex-row gap-2 items-center justify-center font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                            onClick={() => void navigate(appRoutes.friends.absolute)}
                        >
                            <AppIcons.AddUsers className="w-[2.5rem] h-full max-xs:w-[1.5rem]" />
                            <p>View Friends</p>
                        </button>
                    </div>
                </section>
            }
        </main >
    );
};
