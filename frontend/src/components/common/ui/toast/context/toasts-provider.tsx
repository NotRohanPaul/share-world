import { createContext, useCallback, useState, type FC, type ReactElement } from "react";
import type { ToastContextType, ToastOptionsType } from "../types";
import { ToastsContainer } from "../ui/toasts-container";
import { throttlingProvider } from "@src/utils/common";



export const ToastsContext = createContext<ToastContextType | undefined>(undefined);


export const ToastsProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [toastsList, setToastsList] = useState<Array<ToastOptionsType>>([]);
    console.log("Rerender");
    const showToast: ToastContextType = useCallback((options) => {
        const toastId = crypto.randomUUID();
        setToastsList((prev) =>
            [
                ...prev,
                {
                    ...options,
                    id: toastId,
                }
            ]);

        setTimeout(() => {
            setToastsList((prev) => prev.filter((options) => options.id === toastId));
        }, 5e3);
    }, []);

    const throttledShowToast = useCallback(throttlingProvider(showToast, 1e3), []);

    return (
        <>
            <ToastsContext.Provider value={throttledShowToast} children={children} />
            <ToastsContainer toastsList={toastsList} />
        </>
    );
};