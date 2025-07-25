import { useContext } from "react";
import type { ToastContextType } from "../types";
import { ToastsContext } from "./toasts-context";

export const useToastConsumer = (): ToastContextType => {
    const showToast = useContext(ToastsContext);
    if (showToast === undefined) {
        throw new Error("The useToastConsumer is not called under a provider");
    }
    return showToast;
};
