import { useRef, type ChangeEvent, type MutableRefObject } from "react";

export const FilesInput = ({
    dataChannel
}: {
    dataChannel: MutableRefObject<RTCDataChannel | null>;
}) => {
    const fileReader = useRef<FileReader | null>(null);
    const CHUNK_SIZE = 16 * 1024;
    const handleFilesInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;;
        if (target.files === null || target.files.length === 0) return;

        const file = target.files[0];
        console.log(file);
        if (!dataChannel.current || dataChannel.current.readyState !== 'open') {
            return;
        }

        dataChannel.current.send(
            JSON.stringify({
                type: 'file-meta',
                name: file.name,
                size: file.size,
            })
        );

        let offset = 0;
        fileReader.current = new FileReader();

        fileReader.current.onload = (e) => {
            if (e.target?.result && dataChannel.current) {
                dataChannel.current.send(e.target.result as ArrayBuffer);
                offset += (e.target.result as ArrayBuffer).byteLength;

                if (offset < file.size) {
                    readSlice(offset);
                }
            }
        };

        const readSlice = (o: number) => {
            const slice = file.slice(o, o + CHUNK_SIZE);
            fileReader.current?.readAsArrayBuffer(slice);
        };
        readSlice(0);
    };

    return (
        <label className="w-full h-full bg-gray-600 text-white p-2 flex justify-center items-center text-2xl">
            Select Files
            <input
                type="file"
                name="files-input"
                id="files-input"
                onChange={handleFilesInput}
                multiple
                hidden
            />
        </label>
    );
};