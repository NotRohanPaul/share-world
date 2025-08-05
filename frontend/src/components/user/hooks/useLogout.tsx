import { logoutHandler } from "@src/axios/handlers/auth-handler";
import { useDialogBoxConsumer } from "@src/components/common/ui/dialog-box/context/dialog-box-consumer";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";
import { appRoutes } from "@src/routes/app-routes";
import { useMutation } from "@tanstack/react-query";
import { useRef, type MouseEvent } from "react";
import { useNavigate } from "react-router";
import { LogoutDialog } from "../ui/logout-dialog";


export const useLogout = () => {
    const navigate = useNavigate();
    const showToast = useToastConsumer();
    const { showDialogBox, hideDialogBox } = useDialogBoxConsumer();
    const controllerRef = useRef<AbortController>(new AbortController());

    const { mutate: logout, } = useMutation({
        mutationFn: () => {
            return logoutHandler(controllerRef.current.signal);
        },
        onSuccess: async () => {
            await navigate(appRoutes.login.absolute);
            hideDialogBox();
        },
        onError: () => {
            hideDialogBox();
            showToast({ text: "Network error." });
        },
    });

    const handleAbortButtonClick = () => {
        controllerRef.current?.abort("Logout dialog abort is clicked");
    };

    const handleMenuButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.name === "Logout") {
            showDialogBox({
                type: "component",
                children: <LogoutDialog />,
                buttons: [
                    {
                        value: "Abort",
                        onClick: handleAbortButtonClick
                    }
                ]
            });
            logout();
        }
    };
    return {
        handleMenuButtonClick,
    };
};