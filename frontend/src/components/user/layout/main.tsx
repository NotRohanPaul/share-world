import { AppIcons } from "@src/assets";
import { Outlet, useLocation, useNavigate } from "react-router";

export const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="h-full flex flex-col justify-center items-center overflow-y-auto p-1">
            {location.pathname !== "/user" ?
                <Outlet /> :
                <section className="flex gap-2">
                    <button
                        className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                        onClick={() => void navigate("send")}
                    >
                        <AppIcons.Send className="w-[3rem] h-[3rem]" />
                        Send
                    </button>
                    <button
                        className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                        onClick={() => void navigate("receive")}

                    >
                        <AppIcons.Receive className="w-[3rem] h-[3rem]" />
                        Receive
                    </button>
                </section>
            }
        </main >
    );
};
