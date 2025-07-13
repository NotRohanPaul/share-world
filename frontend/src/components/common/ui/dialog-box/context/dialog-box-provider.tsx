import { createContext, useEffect, useState, type FC, type ReactElement } from "react";
import type { DialogBoxOptionsType, DialogBoxContextType } from "../types";
import { DialogBox } from "../ui/dialog-box";
import { AnimatePresence } from "motion/react";



export const DialogBoxContext = createContext<DialogBoxContextType | undefined>(undefined);

export const DialogBoxProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [dialogBoxOptions, setDialogBoxOptions] = useState<DialogBoxOptionsType | undefined>(undefined);
    const [isDialogBoxVisible, setIsDialogBoxVisible] = useState<boolean>(false);

    const showDialogBox = (options: DialogBoxOptionsType) => {
        setIsDialogBoxVisible(true);
        setDialogBoxOptions(options);
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
            <DialogBoxContext.Provider value={showDialogBox} children={children} />
            <AnimatePresence>
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