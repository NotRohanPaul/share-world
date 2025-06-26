import {
    forwardRef,
    type ImgHTMLAttributes
} from "react";
import ShareWorldImageSrc from "./images/share-world.png";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

export const AppImages = {
    ShareWorld: (props: ImageProps) => (
        <img {...props} src={ShareWorldImageSrc} alt="Share World" />
    ),
};

import {
    Check,
    CircleUser,
    ClipboardCopy,
    ClockFading,
    EyeIcon,
    EyeOff,
    File,
    FileImage,
    FileText,
    HardDriveDownload,
    LoaderCircle,
    Send,
    type LucideProps,
} from "lucide-react";


export const AppIcons = {
    EyeIcon,
    EyeOff,
    Avatar: CircleUser,
    Send,
    Receive: forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
        <Send transform="rotate(180)" ref={ref} {...props} />
    )),
    Copy: ClipboardCopy,
    CopyCheck: Check,
    Loader: forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
        <LoaderCircle className="animate-spin" ref={ref} {...props} />
    )),
    FileIcons: {
        txt: FileText,
        png: FileImage,
        jpg: FileImage,
        jpeg: FileImage,
        unknown: File,
    },
    SaveToDisk: HardDriveDownload,
    Pending: ClockFading,
};