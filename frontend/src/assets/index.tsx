import ShareWorldImageSrc from "./images/share-world.png";
import type { ImgHTMLAttributes } from "react";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export const AppImages = {
    ShareWorld: (props: ImageProps) => (
        <img {...props} src={ShareWorldImageSrc} alt="Share World" />
    ),
};


import EyeIcon from "./icons/eye.svg";
import EyeOff from "./icons/eye-off.svg";

export const AppIcons = {
    EyeIcon,
    EyeOff,
};