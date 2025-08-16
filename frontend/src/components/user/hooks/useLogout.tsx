import { useDialogBoxConsumer } from "@src/components/common/ui/dialog-box/context/dialog-box-consumer";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";
import { appRoutes } from "@src/routes/app-routes";
import { useMutation } from "@tanstack/react-query";
import { useRef, type MouseEvent } from "react";
import { useNavigate } from "react-router";
import { LogoutDialog } from "../ui/logout-dialog";
import { apiHandlers } from "@src/axios/handlers/api-handlers";


export const useLogout = () => {
    const navigate = useNavigate();
    const showToast = useToastConsumer();
    const { showDialogBox, hideDialogBox } = useDialogBoxConsumer();
    const controllerRef = useRef<AbortController>(new AbortController());

    const { mutate: logout, } = useMutation({
        mutationFn: () => {
            return apiHandlers.auth.logout({ signal: controllerRef.current.signal });
        },
        onSuccess: async (res) => {
            if (res.status === 200 || res.status === 304) {
                await navigate(appRoutes.login.absolute);
                hideDialogBox();
            }
            else {
                hideDialogBox();
                showToast({ text: "Server error" });
            }
        },
        onError: () => {
            hideDialogBox();
            showToast({ text: "Network error" });
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