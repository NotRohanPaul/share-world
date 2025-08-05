import { AppIcons } from "@src/assets/icons";

export const LogoutDialog = () => {
    return (
        <div className="flex items-center gap-2 text-2xl">
            <AppIcons.Loader />
            Logging Out
        </div>
    );
};
