import type { HTMLAttributes } from "react";


export const BoxButton = (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={"w-full flex flex-col items-center justify-center font-bold border-5 border-primary p-2 rounded-md bg-white dark:bg-black text-primary dark:text-white transition-colors hover:bg-primary hover:text-white hover:dark:bg-secondary hover:dark:text-primary overflow-hidden " + `${props.className ?? ''}`}
        />
    );
};

/* 
w - [10rem] h - [10rem] max - xs: w - [7rem] max - xs: h - [7rem];
text - 2xl;
p - 2 
maxxs base */
