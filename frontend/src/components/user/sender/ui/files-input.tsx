import type { ChangeEvent, MouseEvent } from "react";


export const FilesInput = ({
    receiverId,
    handleFileChange,
    handleSendClick
}: {
    receiverId: string | null,
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleSendClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
    return (
        <div className="flex flex-col items-center gap-6 font-bold">
            <p className="flex gap-2">
                <span>
                    Receiver's ID:
                </span>
                <span className="text-primary">{receiverId}</span>
            </p>
            <label
                className="w-[15rem] h-auto flex flex-col gap-2 text-center p-5 outline-dashed outline-4 outline-primary cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white group/label"
                htmlFor={"input-file"}
            >
                <span>Select Files</span>
                <span className="text-primary group-hover/label:text-white">or</span>
                <span>Drag files</span>
            </label>
            <input
                className="w-fit"
                id="input-file"
                type="file"
                multiple
                onChange={handleFileChange}
                hidden
            />
            <button
                className="self-center text-2xl py-2 px-4 rounded-full text-white bg-primary transition-colors duration-300 hover:bg-white hover:text-primary hover:outline-2 hover:outline-primary active:outline-offset-2"
                onClick={handleSendClick}
            >
                Send
            </button>
        </div>
    );
};