import type { ImgHTMLAttributes } from "react";
import ShareWorldImageSrc from "./images/share-world.png";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export const AppImages = {
    ShareWorld: (props: ImageProps) => (
        <img {...props} src={ShareWorldImageSrc} alt="Share World" />
    ),
};

import { EyeIcon, EyeOff, CircleUser, Send, type LucideProps } from "lucide-react";

export const AppIcons = {
    EyeIcon,
    EyeOff,
    Avatar: CircleUser,
    Send,
    Receive: (props: LucideProps) => <Send transform={" rotate(180)"} {...props} />
};