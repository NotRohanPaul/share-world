import { useContext } from "react";
import { DialogBoxContext } from "./dialog-box-context";

export const useDialogBoxConsumer = () => {
    const value = useContext(DialogBoxContext);
    if (value === undefined) {
        throw new Error("The DialogBoxConsumer is not used under the provider");
    }
    return value;
};