import { useContext } from "react";
import type { ToastContextType } from "../types";
import { ToastsContext } from "./toasts-context";

export const useToastContext = (): ToastContextType => {
    const showToast = useContext(ToastsContext);
    if (showToast === undefined) {
        throw new Error("The useToastContext is not called under a provider");
    }
    return showToast;
};
