import { useCallback, useState, type FC, type ReactElement } from "react";
import type { ToastContextType, ToastOptionsType } from "../types";
import { ToastsContainer } from "../ui/toasts-container";
import { ToastsContext } from "./toasts-context";


export const ToastsProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [toastsList, setToastsList] = useState<Array<ToastOptionsType>>([]);
    const showToast: ToastContextType = useCallback((options) => {
        const toastId = crypto.randomUUID();
        setToastsList((prev) =>
            [
                {
                    ...options,
                    id: toastId,
                },
                ...prev,
            ]);

        setTimeout(() => {
            console.log(toastsList, toastId);
            setToastsList((prev) => prev.filter((options) => options.id !== toastId));
        }, options.exitDelay ?? 3e3);
    }, []);


    return (
        <>
            <ToastsContext.Provider value={showToast} children={children} />
            <ToastsContainer toastsList={toastsList} />
        </>
    );
};