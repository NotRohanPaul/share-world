import { AppIcons } from "@src/assets/icons";
import { convertBytesToUnits } from "@src/utils/math";
import type { FileListType } from "../types";
import { motion } from "motion/react";

const fileIconsProvider = (fileName: string) => {
    const extensionIndex = fileName.lastIndexOf(".");
    if (extensionIndex === -1) return AppIcons.FileIcons.unknown;

    const extension = fileName.slice(extensionIndex + 1);
    return AppIcons.FileIcons[extension as keyof typeof AppIcons.FileIcons] ?? AppIcons.FileIcons.unknown;
};


export const FileList = ({ fileList }: { fileList: FileListType; }) => {
    const totalSizeInUnits = convertBytesToUnits(fileList.reduce((acc, file) => acc + file.metadata.size, 0));

    const handleFileDownload = (data?: File) => {
        if (data === undefined) return;
        const anchor = document.createElement("a");
        const url = URL.createObjectURL(data);
        console.log(url);
        anchor.href = url;
        anchor.download = data.name;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    };

    return (
        <section className="w-fit max-md:w-full h-fit flex flex-col gap-2 text-base max-md:text-sm border-4 border-primary p-2 rounded-sm ">
            <header className="flex gap-2 rounded-sm bg-primary text-white p-2">
                <p>
                    Files: {fileList.length}
                </p>
                <p>
                    Size: {totalSizeInUnits}
                </p>
            </header>
            <main className="h-full flex flex-col gap-2">
                {
                    fileList.map((file) => {
                        const Icon = fileIconsProvider(file.metadata.name);
                        const sizeInUnits = convertBytesToUnits(file.metadata.size);
                        return (
                            <section key={file.id} className="flex flex-col rounded-sm text-primary outline-2">
                                <div className="flex items-center justify-between gap-2 px-2 p-2">
                                    <div className="flex">
                                        <div className="w-[4rem] h-[4rem] max-md:w-[3rem] max-md:h-[3rem] p-1.5">
                                            <Icon className="w-full h-full text-primary" />
                                        </div>
                                        <div className="flex flex-col overflow-ellipsis">
                                            <p>{file.metadata.name}</p>
                                            <p>{sizeInUnits}</p>
                                            <p>{file.metadata.type}</p>
                                        </div>
                                    </div>
                                    <div className="w-[4rem] h-[4rem] max-md:w-[3rem] max-md:h-[3rem] p-1.5">
                                        {
                                            file.state === "done" &&
                                            <button
                                                onClick={() => handleFileDownload(file.data)}
                                                className="w-full h-full"

                                            >
                                                <AppIcons.SaveToDisk className="w-full h-full text-primary" />
                                            </button>
                                        }
                                        {
                                            file.state === "pending" &&
                                            <AppIcons.Pending className="w-full h-full text-primary" />
                                        }
                                    </div>
                                </div>
                                {file.state === "processing" && <div className="flex items-center gap-2 px-2">
                                    <p className="flex w-full h-[0.5rem] bg-primary rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${file.percentage ?? 0}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </p>
                                    <p>{file.percentage}%</p>
                                </div>}
                            </section>
                        );
                    })
                }
            </main>
        </section>
    );
};