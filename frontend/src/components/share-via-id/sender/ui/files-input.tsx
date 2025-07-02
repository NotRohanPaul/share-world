import { CURRENT_DEVICE_TYPE } from "@src/constants/common";
import { useState, type ChangeEvent } from "react";

export const FilesInput = ({
    handleFileChange,
}: {
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    return (
        <>
            <label
                className={`w-[15rem] h-auto flex flex-col gap-2 font-bold text-center p-5 outline-dashed outline-4 outline-primary cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white group/label ${isDragOver === true ? "shadow-[inset_0_0_50px_0_var(--app-color-primary)] opacity-90" : ""}`}
                htmlFor={"input-file"}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragLeave={(e) => {
                    if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget) === false) {
                        setIsDragOver(false);
                    }
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    const mockEvent = {
                        target: { files: e.dataTransfer.files },
                    } as unknown as ChangeEvent<HTMLInputElement>;

                    handleFileChange(mockEvent);
                }}
            >
                <span>Select Files</span>
                {CURRENT_DEVICE_TYPE !== "mobile" && (
                    <>
                        <span className="text-primary group-hover/label:text-white transition-colors duration-300">or</span>
                        <span>Drag files</span>
                    </>
                )}
            </label>
            <input
                className="w-fit"
                id="input-file"
                type="file"
                multiple
                onChange={handleFileChange}
                hidden
            />
        </>
    );
};