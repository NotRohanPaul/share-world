import { createPortal } from "react-dom";
import type { DialogBoxOptionsType } from "../types";
import { AppIcons } from "@src/assets/icons";
import type { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

export const DialogBox = ({
    options,
    setIsDialogBoxVisible
}: {
    options: DialogBoxOptionsType;
    setIsDialogBoxVisible: Dispatch<SetStateAction<boolean>>;
}) => {

    return createPortal((
        <motion.section
            layout
            className="absolute z-[100] inset-0 w-full h-full flex justify-center items-center bg-black/60"
        >
            <motion.main
                layout
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.75, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="relative w-[22rem] min-h-[10rem] flex flex-col justify-between p-2 outline-2 outline-primary bg-white rounded-lg">
                <div className="flex justify-between break-all pt-6 px-4">
                    <p className="text-xl max-xs:text-base font-semibold">
                        {options.text}
                    </p>
                </div>
                <button
                    className="absolute top-2 right-2"
                    aria-label="Close"
                    onClick={() => setIsDialogBoxVisible(false)}
                >
                    <AppIcons.Close />
                </button>
                <div className="self-end flex gap-2 pt-2">
                    <button
                        className="px-4 py-2 max-xs:px-3 max-xs:py-0 bg-primary text-white rounded-sm"
                    >
                        OK
                    </button>
                    <button
                        className="px-4 py-2 bg-primary text-white rounded-sm"
                        onClick={() => setIsDialogBoxVisible(false)}
                    >
                        Cancel
                    </button>
                </div>
            </motion.main>
        </motion.section>
    ), document.body);
};