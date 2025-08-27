import { AppIcons } from "@src/assets/icons";
import { motion } from "motion/react";
import type { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import type { DialogBoxOptionsType } from "../types";
import { DialogButton } from "./dialog-btn";

export const DialogBox = ({
    options,
    setIsDialogBoxVisible
}: {
    options: DialogBoxOptionsType;
    setIsDialogBoxVisible: Dispatch<SetStateAction<boolean>>;
}) => {

    return createPortal((
        <section
            className="absolute z-[100] inset-0 w-full h-full flex justify-center items-center bg-black/60 dark:bg-white/10"
        >
            <motion.main
                layout
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.75, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="relative w-[22rem] h-auto max-h-[50%] p-2 outline-2 outline-primary bg-white dark:bg-black rounded-lg overflow-auto"
            >
                <button
                    className="absolute top-2 right-2"
                    aria-label="Close"
                    onClick={() => setIsDialogBoxVisible(false)}
                >
                    <AppIcons.Close />
                </button>
                <section className="h-full flex flex-col justify-between pt-7 pb-2 px-4">
                    {
                        options.type === "text"
                        &&
                        <p className="break-all text-xl max-xs:text-base font-semibold">
                            {options.text}
                        </p>
                    }
                    {
                        options.type === "component"
                        &&
                        options.children
                    }
                    {
                        options.buttons !== undefined &&
                        options.buttons.length > 0 &&
                        <div className="self-end flex gap-2 pt-2">
                            {options.buttons.map(({ value, onClick }) => {
                                return <DialogButton
                                    key={value}
                                    value={value}
                                    onClick={onClick}
                                >
                                    {value}
                                </DialogButton>;
                            })}
                        </div>
                    }
                </section>
            </motion.main>
        </section>
    ), document.body);
};