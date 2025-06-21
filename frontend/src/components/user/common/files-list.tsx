
// import { AppIcons } from "@src/assets";
// const fileIconsList = [{ "txt": <AppIcons.Loader /> }];


export const FileList = ({ fileList }: { fileList: Array<Record<string, string>>; }) => {

    return (
        <section className="w-[70%] h-full flex flex-col gap-2 text-base  border-4 border-primary p-2 rounded-sm overflow-auto">
            {
                fileList.map((file) => {

                    return (
                        <div className="flex flex-col rounded-sm bg-primary/50">
                            <div className="flex gap-4 px-2 pt-2">
                                <p className="w-[5rem] h-[5rem] bg-white">image</p>
                                <div className="flex flex-col overflow-ellipsis">
                                    <p>{file.name}</p>
                                    <p>size: {file.size}</p>
                                    <p>type: {file.type}</p>
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