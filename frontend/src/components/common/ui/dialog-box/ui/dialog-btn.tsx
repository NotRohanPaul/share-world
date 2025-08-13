import type { ButtonHTMLAttributes } from "react";

export const DialogButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className={"px-4 py-2 max-xs:px-3 max-xs:py-1 bg-primary text-white rounded-sm " + props.className}
            value={props.value}
            onClick={props.onClick}
            {...props}
        >
            {props.children}
        </button>
    );
};