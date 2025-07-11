import { createPortal } from "react-dom";
import type { DialogBoxOptionsType } from "../types";
import { AppIcons } from "@src/assets/icons";
import type { Dispatch, SetStateAction } from "react";

export const DialogBox = ({
    options,
    setIsDialogBoxVisible
}: {
    options: DialogBoxOptionsType;
    setIsDialogBoxVisible: Dispatch<SetStateAction<boolean>>;
}) => {

    return createPortal((
        <section className="w-[22rem] min-h-[10rem] absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between p-2 outline-2 outline-primary bg-white rounded-lg">
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
        </section>
    ), document.body);
};