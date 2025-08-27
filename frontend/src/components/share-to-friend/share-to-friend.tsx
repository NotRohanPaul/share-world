import { AppIcons } from "@src/assets/icons";
import { appRoutes } from "@src/routes/app-routes";
import { useNavigate } from "react-router";
import { BoxButton } from "../common/ui/inputs/buttons/box-button";


export const ShareToFriend = () => {
    const navigate = useNavigate();

    return (
        <section className="w-[20rem] h-[10rem] max-xs:w-[15rem] max-xs:h-[7rem] flex gap-2 text-2xl max-xs:text-base">
            <BoxButton
                onClick={() => void navigate(appRoutes["to-friend"].send.absolute)}
            >
                <AppIcons.Send className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem]" />
                Send
            </BoxButton>
            <BoxButton
                onClick={() => void navigate(appRoutes["to-friend"].receive.absolute)}
            >
                <AppIcons.Receive className="w-[3rem] h-[3rem] max-xs:w-[2rem] max-xs:h-[2rem]" />
                Receive
            </BoxButton>
        </section>
    );
};