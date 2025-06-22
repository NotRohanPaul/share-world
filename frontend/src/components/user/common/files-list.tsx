import { AppIcons } from "@src/assets";
import { convertBytesToUnits } from "@src/utils/math";

const fileIconsProvider = (fileName: string) => {
    const extensionIndex = fileName.lastIndexOf(".");
    if (extensionIndex === -1) return AppIcons.FileIcons.unknown;

    const extension = fileName.slice(extensionIndex + 1);
    console.log(extension);
    return AppIcons.FileIcons[extension as keyof typeof AppIcons.FileIcons] ?? AppIcons.FileIcons.unknown;
};


export const FileList = ({ fileList }: { fileList: FileList; }) => {

    return (
        <section className="w-[70%] h-full flex flex-col gap-2 text-base  border-4 border-primary p-2 rounded-sm overflow-auto">
            {
                [...fileList].map((file) => {
                    const Icon = fileIconsProvider(file.name);

                    return (
                        <div key={file.name} className="flex flex-col rounded-sm bg-primary/50">
                            <div className="flex gap-2 px-2 pt-2">
                                <div
                                    className="w-[5rem] h-[5rem]  bg-white rounded-full p-2"
                                >
                                    <Icon className="w-full h-full text-primary" />
                                </div>
                                <div className="flex flex-col overflow-ellipsis">
                                    <p>{file.name}</p>
                                    <p>{convertBytesToUnits(file.size)}</p>
                                    <p>{file.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-2">
                                <div className="w-full h-[.5rem] bg-white rounded-full"></div>
                                <p>{"0%"}</p>
                            </div>
                        </div>
                    );
                })
            }
        </section>
    );
};