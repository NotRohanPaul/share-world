import { AppIcons } from "@src/assets/icons";
import { appRoutes } from "@src/routes/app-routes";
import { useNavigate } from "react-router";


export const ShareToFriend = () => {
    const navigate = useNavigate();

    return (
        <section className="flex gap-2">
            <button
                className="w-[10rem] h-[10rem] max-xs:w-[7rem] max-xs:h-[7rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary max-xs:text-base transition-colors hover:bg-primary hover:text-white overflow-hidden"
                onClick={() => void navigate(appRoutes["to-friend"].send.absolute)}
            >
                <AppIcons.Send className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem]" />
                Send
            </button>
            <button
                className="w-[10rem] h-[10rem] max-xs:w-[7rem] max-xs:h-[7rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary  max-xs:text-base transition-colors hover:bg-primary hover:text-white overflow-hidden"
                onClick={() => void navigate(appRoutes["to-friend"].receive.absolute)}
            >
                <AppIcons.Receive className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem]" />
                Receive
            </button>
        </section>
    );
};