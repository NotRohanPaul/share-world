import { AppIcons } from "@src/assets/icons";
import { logoutHandler } from "@src/axios/handlers/auth-handler";
import { useDialogBoxConsumer } from "@src/components/common/ui/dialog-box/context/dialog-box-consumer";
import { useToastConsumer } from "@src/components/common/ui/toast/context/toasts-consumer";
import { appRoutes } from "@src/routes/app-routes";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const menuOptions = [{
    name: "Home",
    to: appRoutes.user.absolute,
    Icon: AppIcons.Home
}, {
    name: "Settings",
    to: appRoutes.settings.absolute,
    Icon: AppIcons.Settings
}, {
    name: "Logout",
    to: null,
    Icon: AppIcons.Logout
}];

const LogginOutDialog = () => {
    return (
        <div className="flex items-center gap-2 text-2xl">
            <AppIcons.Loader />
            LoggingOut
        </div>
    );
};

export const UserNavbarMenu = ({
    setIsMenuVisible,
    menuRef
}: {
    setIsMenuVisible: Dispatch<SetStateAction<boolean>>,
    menuRef: RefObject<HTMLDivElement>;
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const showToast = useToastConsumer();
    const { showDialogBox, hideDialogBox } = useDialogBoxConsumer();

    const { mutate: logout } = useMutation({
        mutationFn: logoutHandler,
        onSuccess: async () => {
            await navigate(appRoutes.login.absolute);
            hideDialogBox();
        },
        onError: () => {
            hideDialogBox();
            showToast({ text: "Network error." });
        },
    });

    const handleMenuButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        if (target.name === "Logout") {
            showDialogBox({
                type: "component",
                children: <LogginOutDialog />,
            });
            logout();
        }
    };

    return (
        <div className="absolute -right-1 max-xs:-right-[1px] top-12 max-xs:top-10 z-10 min-w-[8rem] max-xs:min-w-[6rem] overflow-hidden">
            <motion.div
                layout
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{
                    y: -100, opacity: 0
                }}
                className="flex flex-col text-center p-1 bg-primary [&>*]:p-2 [&>*:hover]:bg-white [&>*:hover]:text-primary"
                onClick={() => setIsMenuVisible(false)}
                ref={menuRef}
            >
                {menuOptions.map(({ name, to, Icon }) => {
                    if (location.pathname === to)
                        return null;
                    if (to === null) {
                        return (
                            <button
                                key={name}
                                name={name}
                                className="flex items-center gap-1 max-xs:text-sm"
                                onClick={(e) => void handleMenuButtonClick(e)}
                            >
                                <Icon className="w-[1.5rem] h-[1.5rem] max-xs:w-[1.25rem] max-xs:h-[1.25rem]" />
                                {name}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={name}
                            to={to}
                            className="flex items-center gap-1 max-xs:text-sm"
                        >
                            <Icon className="w-[1.5rem] h-[1.5rem] max-xs:w-[1.25rem] max-xs:h-[1.25rem]" />
                            {name}
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
};