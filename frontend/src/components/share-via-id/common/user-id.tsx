import { AppIcons } from "@src/assets/icons";
import { useState } from "react";


export const UserId = ({
    userId,
    peerType
}: {
    userId: string | null,
    peerType: "sender" | "receiver";
}) => {
    const [isCopyClicked, setIsCopyClicked] = useState(false);

    const handleCopy = async () => {
        if (peerType !== "receiver" || isCopyClicked === true || userId === null) return;
        if (navigator.clipboard === undefined) return;
        await navigator.clipboard.writeText(userId);
        setIsCopyClicked(true);
        setTimeout(() => {
            setIsCopyClicked(false);
        }, 2e3);
    };

    return (
        <p className="flex items-center gap-2 font-bold max-xs:text-xl">
            <span>Your ID:</span>
            {
                userId === null ?
                    <AppIcons.Loader className="text-primary" />
                    :
                    <span className="text-primary tracking-widest">
                        {userId}
                    </span>
            }
            {
                navigator.clipboard !== undefined
                &&
                peerType === "receiver"
                &&
                userId !== null
                &&
                <button
                    className={`text-primary ${isCopyClicked === true ? "cursor-default" : ""}`}
                    onClick={() => void handleCopy()}
                >
                    {isCopyClicked === false ?
                        <AppIcons.Copy className="w-[2rem] h-[2rem] max-xs:w-[1.5rem] max-xs:h-[1.5rem]" /> :
                        <AppIcons.CopyCheck className="w-[2rem] h-[2rem] max-xs:w-[1.5rem] max-xs:h-[1.5rem]" />
                    }
                </button>
            }
        </p>
    );
};