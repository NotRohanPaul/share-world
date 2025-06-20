import { AppIcons } from "@src/assets";
import { useState } from "react";


export const UserId = ({ userId, peerType }: { userId: string | null, peerType: "sender" | "receiver"; }) => {
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
        <p className="flex gap-2 text-lg font-bold">
            <span>Your User ID:</span>
            <span className="text-primary">{userId}</span>
            {
                peerType === "receiver"
                &&
                userId !== null
                &&
                <button
                    className="text-primary"
                    onClick={handleCopy}
                >
                    {isCopyClicked === false ?
                        <AppIcons.Copy className="w-5" /> :
                        <AppIcons.CopyCheck className="w-5" />
                    }
                </button>
            }
        </p>
    );
};