import { createContext, useState, type FC, type ReactElement } from "react";
import type { DialogBoxOptionsType, DialogBoxContextType } from "../types";
import { DialogBox } from "../ui/dialog-box";



export const DialogBoxContext = createContext<DialogBoxContextType | undefined>(undefined);

export const DialogBoxProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [dialogBoxOptions, setDialogBoxOptions] = useState<DialogBoxOptionsType | undefined>(undefined);
    const [isDialogBoxVisible, setIsDialogBoxVisible] = useState<boolean>(false);

    const showDialogBox = (options: DialogBoxOptionsType) => {
        setIsDialogBoxVisible(true);
        setDialogBoxOptions(options);
    };

    return (
        <>
            <DialogBoxContext.Provider value={showDialogBox} children={children} />
            {
                isDialogBoxVisible === true &&
                dialogBoxOptions !== undefined &&
                <DialogBox
                    options={dialogBoxOptions}
                    setIsDialogBoxVisible={setIsDialogBoxVisible}
                />
            }
        </>
    );
};