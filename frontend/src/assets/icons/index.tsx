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
    GitCompareArrows,
    HardDriveDownload,
    LoaderCircle,
    Send,
    UserPlus,
    Users,
    type LucideProps,
} from "lucide-react";
import { forwardRef } from "react";


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
    ShareId: GitCompareArrows,
    Users,
    AddUsers: UserPlus,
};