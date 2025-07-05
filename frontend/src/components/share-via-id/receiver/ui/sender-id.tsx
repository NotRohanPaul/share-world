

export const SenderId = ({ senderId }: { senderId: string | null; }) => {
    return (
        <>
            {
                senderId === null ?
                    <p className="font-semibold max-xs:text-xl">Share this ID with the Sender</p>
                    :
                    <p className="flex gap-2 font-bold max-xs:text-xl">
                        <span>Sender User ID:</span>
                        <span className="text-primary tracking-widest">{senderId}</span>
                        <span></span>
                    </p>
            }
        </>
    );
};