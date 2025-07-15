import {
    type ImgHTMLAttributes
} from "react";
import ShareWorldImageSrc from "./share-world.png";
import { FadeInImage, type MotionImageProps } from "./containers/fade-in-img";


type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;


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
