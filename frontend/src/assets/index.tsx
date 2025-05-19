import type { ImgHTMLAttributes } from "react";
import ShareWorldImageSrc from "./images/share-world.png";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export const AppImages = {
    ShareWorld: (props: ImageProps) => (
        <img {...props} src={ShareWorldImageSrc} alt="Share World" />
    ),
};

import EyeOff from "./icons/eye-off.svg";
import EyeIcon from "./icons/eye.svg";
import Avatar from "./icons/avatar.svg";

export const AppIcons = {
    EyeIcon,
    EyeOff,
    Avatar
};