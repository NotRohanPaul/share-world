import { AnimatePresence } from "motion/react";
import { useEffect, useState, type PropsWithChildren } from "react";
import type { DialogBoxOptionsType } from "../types";
import { DialogBox } from "../ui/dialog-box";
import { DialogBoxContext } from "./dialog-box-context";

export const DialogBoxProvider = ({ children }: PropsWithChildren) => {
    const [dialogBoxOptions, setDialogBoxOptions] = useState<DialogBoxOptionsType | undefined>(undefined);
    const [isDialogBoxVisible, setIsDialogBoxVisible] = useState<boolean>(false);

    const showDialogBox = (options: DialogBoxOptionsType) => {
        setIsDialogBoxVisible(true);
        setDialogBoxOptions(options);
    };

    const hideDialogBox = () => {
        setIsDialogBoxVisible(false);
        setDialogBoxOptions(undefined);
    };

    useEffect(() => {
        const rootElm = document.getElementById("root");
        if (rootElm === null) return;

        rootElm.inert = isDialogBoxVisible;

        return () => {
            rootElm.inert = false;
        };
    }, [isDialogBoxVisible]);

    return (
        <>
            <DialogBoxContext.Provider value={{ showDialogBox, hideDialogBox }} children={children} />
            <AnimatePresence mode="wait">
                {
                    isDialogBoxVisible === true &&
                    dialogBoxOptions !== undefined &&
                    <DialogBox
                        options={dialogBoxOptions}
                        setIsDialogBoxVisible={setIsDialogBoxVisible}
                    />
                }
            </AnimatePresence>
        </>
    );
};