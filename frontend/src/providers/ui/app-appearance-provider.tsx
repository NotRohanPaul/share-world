import { useAppSelector } from "@src/redux/utils/hooks";
import { settingsSelectors } from "@src/redux/slices/settings";
import { type PropsWithChildren, useEffect } from "react";
import { MotionGlobalConfig } from "motion/react";


export const AppAppearanceProvider = ({ children }: PropsWithChildren) => {
    const { theme, disableAnimations } = useAppSelector(settingsSelectors.appearance);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    MotionGlobalConfig.skipAnimations = disableAnimations;

    return (
        <>
            {children}
        </>
    );
};
