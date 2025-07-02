import {
    useState,
    type ImgHTMLAttributes
} from "react";
import ShareWorldImageSrc from "./share-world.png";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "framer-motion";

type MotionImageProps = Omit<HTMLMotionProps<"img">, "src" | "alt">;
type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

const FadeInImage = ({
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
            onLoad={(e) => {
                console.log(e);
                setIsLoaded(true);
            }}
        />
    );
};

export const AppImages = {
    ShareWorld: (props: ImageProps) => (
        <img
            {...props}
            src={ShareWorldImageSrc}
            alt="Share World"
        />
    ),
    ShareWorldFade: (props: MotionImageProps) => (
        <FadeInImage
            {...props}
            src={ShareWorldImageSrc}
            alt="Share World"
        />
    ),
};
