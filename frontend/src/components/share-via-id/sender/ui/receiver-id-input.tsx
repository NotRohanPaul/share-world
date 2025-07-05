import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";



export const ReceiverIdInput = ({
    receiverIdInput,
    handleReceiverIdInput,
    handleInputEnter,
    handleConnectClick
}: {
    receiverIdInput: string | null,
    handleReceiverIdInput: (e: ChangeEvent<HTMLInputElement>) => void,
    handleInputEnter: (e: KeyboardEvent<HTMLInputElement>) => void,
    handleConnectClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
    return (
        <>
            <div className="w-fit flex flex-wrap gap-2 max-xs:text-xl">
                <label
                    htmlFor="receiver-input"
                    className="font-bold"
                >
                    Enter Receiver's ID:
                </label>
                <input
                    className="outline-2 outline-primary rounded-sm caret-primary px-3 py-1 max-md:p-1 max-xs:px-1 max-xs:py-0 focus:outline-4 tracking-widest"
                    id="receiver-input"
                    size={5}
                    type="text"
                    name="receiver"
                    value={receiverIdInput ?? ""}
                    onChange={handleReceiverIdInput}
                    onKeyDown={handleInputEnter}
                />
            </div>
            <button
                className="self-center text-2xl max-xs:text-xl py-2 px-4 max-xs:px-2 max-xs:py-1 rounded-full text-white bg-primary transition-colors duration-300 hover:bg-white hover:text-primary hover:outline-2 hover:outline-primary active:outline-offset-2"
                onClick={handleConnectClick}
            >
                Connect
            </button>
        </>
    );
};