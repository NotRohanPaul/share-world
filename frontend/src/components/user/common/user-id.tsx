import { AppIcons } from "@src/assets";
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
        await navigator.clipboard.writeText(userId);
        setIsCopyClicked(true);
        setTimeout(() => {
            setIsCopyClicked(false);
        }, 2e3);
    };

    return (
        <p className="flex gap-2 font-bold">
            <span>Your User ID:</span>
            <span className="text-primary">{userId}</span>
            {
                peerType === "receiver"
                &&
                userId !== null
                &&
                <button
                    className={`text-primary ${isCopyClicked === true ? "cursor-default" : ""}`}
                    onClick={void handleCopy}
                >
                    {isCopyClicked === false ?
                        <AppIcons.Copy className="w-[2rem] h-[2rem]" /> :
                        <AppIcons.CopyCheck className="w-[2rem] h-[2rem]" />
                    }
                </button>
            }
        </p>
    );
};