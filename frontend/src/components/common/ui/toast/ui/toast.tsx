import { motion } from "motion/react";
import type { ToastOptionsType } from "../types";

export const Toast = ({ options }: { options: ToastOptionsType; }) => {
    return (
        <motion.div
            layout
            transition={{
                layout: { duration: 0.15, ease: "easeOut" },
                type: "tween", duration: 0.2, ease: "easeOut"
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="w-[15rem] max-xs:w-[12rem] min-h-[5rem] max-xs:min-h-[4rem] flex flex-col justify-center max-xs:text-sm text-wrap text-center break-words overflow-auto bg-white dark:bg-black dark:text-white p-2 rounded-lg outline-2 outline-primary pointer-events-auto"
        >
            <p>{options.text}</p>
        </motion.div>
    );
};