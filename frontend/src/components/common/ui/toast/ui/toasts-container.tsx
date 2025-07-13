import { createPortal } from "react-dom";
import type { ToastOptionsType } from "../types";
import { Toast } from "./toast";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
export const ToastsContainer = ({
    toastsList
}: {
    toastsList: Array<ToastOptionsType>;
}) => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        if (isVisible === false && toastsList.length !== 0) {
            setIsVisible(true);
        }
    }, [toastsList, isVisible]);

    return createPortal(
        isVisible === true && <motion.section className="w-[17rem] max-xs:w-[15rem] h-full absolute z-10 top-0 right-0 flex flex-col items-end gap-4 pointer-events-none overflow-hidden p-4 max-xs:p-2">
            <AnimatePresence
                onExitComplete={() => {
                    if (toastsList.length === 0) {
                        setIsVisible(false);
                    }
                }}
            >
                {toastsList.map((options) => {
                    return (
                        <Toast key={options.id} options={options} />
                    );
                })}
            </AnimatePresence>

        </motion.section >,
        document.body);
};
