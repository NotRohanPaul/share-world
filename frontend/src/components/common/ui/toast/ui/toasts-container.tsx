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
    }, [toastsList]);

    return createPortal(
        isVisible === true && <motion.section layout className="w-[12rem] h-full absolute z-10 top-0 right-0 flex flex-col items-center gap-2 pointer-events-none overflow-hidden p-2">
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
