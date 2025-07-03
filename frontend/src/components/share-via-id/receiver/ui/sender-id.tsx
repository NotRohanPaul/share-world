

export const SenderId = ({ senderId }: { senderId: string | null; }) => {
    return (
        <>
            {
                senderId === null ?
                    <p className="font-semibold max-xs:text-base">Share this ID with the Sender</p>
                    :
                    <p className="flex gap-2 font-bold max-xs:text-base">
                        <span>Sender User ID:</span>
                        <span className="text-primary">{senderId}</span>
                        <span></span>
                    </p>
            }
        </>
    );
};