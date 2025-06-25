import { AppIcons } from "@src/assets";
import { convertBytesToUnits } from "@src/utils/math";
import type { FileListType } from "../types";

const fileIconsProvider = (fileName: string) => {
    const extensionIndex = fileName.lastIndexOf(".");
    if (extensionIndex === -1) return AppIcons.FileIcons.unknown;

    const extension = fileName.slice(extensionIndex + 1);
    return AppIcons.FileIcons[extension as keyof typeof AppIcons.FileIcons] ?? AppIcons.FileIcons.unknown;
};


export const FileList = ({ fileList }: { fileList: FileListType; }) => {

    return (
        <section className="w-[70%] h-fit flex flex-col gap-2 text-base border-4 border-primary p-2 rounded-sm ">
            <div className="flex gap-2 rounded-sm bg-primary/80 text-white p-2">
                <p>
                    Files: {fileList.length}
                </p>
                <p>
                    Size: {convertBytesToUnits(fileList.reduce((acc, file) => acc + file.metadata.size, 0))}
                </p>
            </div>
            <div className="h-full flex flex-col gap-2">
                {
                    fileList.map((file) => {
                        const Icon = fileIconsProvider(file.metadata.name);

                        return (
                            <div key={file.id} className="flex flex-col rounded-sm bg-primary/50">
                                <div className="flex gap-2 px-2 pt-2">
                                    <div
                                        className="w-[5rem] h-[5rem]  bg-white rounded-full p-2"
                                    >
                                        <Icon className="w-full h-full text-primary" />
                                    </div>
                                    <div className="flex flex-col overflow-ellipsis">
                                        <p>{file.metadata.name}</p>
                                        <p>{convertBytesToUnits(file.metadata.size)}</p>
                                        <p>{file.metadata.type}</p>
                                    </div>
                                    <div>
                                        {file.state}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-2">
                                    <div className="w-full h-[.5rem] bg-white rounded-full"></div>
                                    <p>{file.percentage}%</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};