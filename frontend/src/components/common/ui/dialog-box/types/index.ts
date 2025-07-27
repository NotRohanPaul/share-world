import type { MouseEvent, ReactNode } from "react";

type DialogBoxTextOption = {
    type: "text";
    text: string;
    buttons?: {
        value: string;
        onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    }[];
};

type DialogBoxComponentOption = {
    type: "component";
    children: ReactNode;
    buttons?: {
        value: string;
        onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    }[];
};

export type DialogBoxOptionsType = DialogBoxTextOption | DialogBoxComponentOption;

export type DialogBoxContextType = {
    showDialogBox: (options: DialogBoxOptionsType) => void,
    hideDialogBox: () => void,
};