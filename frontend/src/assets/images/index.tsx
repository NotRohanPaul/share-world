import {
    type ImgHTMLAttributes
} from "react";
import ShareWorldImageSrc from "./share-world.png";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export const AppImages = {
    ShareWorld: (props: ImageProps) => (
        <img {...props} src={ShareWorldImageSrc} alt="Share World" />
    ),
};
