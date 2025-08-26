import { motion } from "motion/react";
import { forwardRef, type HTMLAttributes } from "react";


export const RoundedToggleButton = forwardRef<
    HTMLDivElement,
    {
        isSelected: boolean,
        onToggle: () => void;
    } & HTMLAttributes<HTMLDivElement>
>(({
    isSelected,
    onToggle,
    ...props
}, ref) => {
    return (
        <div
            {...props}
            tabIndex={props.tabIndex ?? 0}
            className={`w-[40px] h-[20px] flex ${isSelected === true ?
                "justify-end" :
                "justify-start"
                } outline-2 outline-primary cursor-pointer rounded-full p-0.5 focus:outline-3 ${props.className ?? ''}`}
            onClick={(e) => {
                onToggle();
                props.onClick?.(e);
            }}
            onKeyDown={(e) => {
                if (["Enter", " "].includes(e.key) === true)
                    onToggle();

                props.onKeyDown?.(e);
            }}
            ref={ref}
        >
            <motion.span
                layout
                transition={{
                    duration: 0.15
                }}
                className={`w-[50%] h-full rounded-full ${isSelected === true ? "bg-primary" : "bg-primary/40"}`} />
        </div>
    );
});