
export type FileListType = {
    id: string,
    metadata: {
        name: string,
        type: string,
        size: number,
    },
    state: "done" | "pending" | "processing",
    percentage?: string,
    data?: File,
}[];

type FileItem = FileListType[number];
export type MetadataType = {
    id: FileItem["id"],
    name: FileItem["metadata"]["name"],
    size: FileItem["metadata"]["size"],
    type: FileItem["metadata"]["type"],
}[];