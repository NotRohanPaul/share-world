import { AppIcons } from "@src/assets";
import { appRoutes } from "@src/routes/app-routes";
import { useNavigate } from "react-router";


export const ShareViaId = () => {
    const navigate = useNavigate();

    return (
        <section className="flex gap-2">
            <button
                className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                onClick={() => void navigate(appRoutes["via-id"].send.absolute)}
            >
                <AppIcons.Send className="w-[3rem] h-[3rem]" />
                Send
            </button>
            <button
                className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                onClick={() => void navigate(appRoutes["via-id"].receive.absolute)}

            >
                <AppIcons.Receive className="w-[3rem] h-[3rem]" />
                Receive
            </button>
        </section>
    );
};