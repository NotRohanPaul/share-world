import { motion } from "motion/react";
import type { ToastOptionsType } from "../types";

export const Toast = ({ options }: { options: ToastOptionsType; }) => {
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="w-[10rem] min-h-[4rem] overflow-auto bg-white p-2 rounded-lg outline-1 outline-primary pointer-events-auto"
        >
            <p>{options.text}</p>
        </motion.div>
    );
};