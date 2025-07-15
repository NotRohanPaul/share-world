import { motion, type HTMLMotionProps } from "motion/react";
import { useState } from "react";

export type MotionImageProps = Omit<HTMLMotionProps<"img">, "src" | "alt">;

export const FadeInImage = ({
    src,
    alt,
    ...props
}: {
    src: string,
    alt: string,
} & MotionImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <motion.img
            {...props}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded === true ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            src={src}
            alt={alt}
            onLoad={() => {
                setIsLoaded(true);
            }}
        />
    );
};
