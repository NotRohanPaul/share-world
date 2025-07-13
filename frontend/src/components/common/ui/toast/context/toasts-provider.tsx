import { createContext, useCallback, useState, type FC, type ReactElement } from "react";
import type { ToastContextType, ToastOptionsType } from "../types";
import { ToastsContainer } from "../ui/toasts-container";



export const ToastsContext = createContext<ToastContextType | undefined>(undefined);


export const ToastsProvider: FC<{ children: ReactElement; }> = ({ children }) => {
    const [toastsList, setToastsList] = useState<Array<ToastOptionsType>>([]);
    console.log("Rerender");
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
        }, 5e3);
    }, []);


    console.log(toastsList);
    return (
        <>
            <ToastsContext.Provider value={showToast} children={children} />
            <ToastsContainer toastsList={toastsList} />
        </>
    );
};