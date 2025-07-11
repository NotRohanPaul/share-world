import { createPortal } from "react-dom";
import type { ToastOptionsType } from "../types";
import { Toast } from "./toast";
import { AnimatePresence } from "motion/react";
export const ToastsContainer = ({
    toastsList
}: {
    toastsList: Array<ToastOptionsType>;
}) => {
    return createPortal(
        toastsList.length !== 0 && <section className="w-[12rem] h-full absolute z-10 top-0 right-0 flex flex-col items-center gap-2 pointer-events-none overflow-hidden p-2">
            <AnimatePresence>
                {toastsList.map((options) => {
                    return (
                        <Toast key={options.id} options={options} />
                    );
                })}
            </AnimatePresence>

        </section>,
        document.body);
};
