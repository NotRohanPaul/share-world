import { useDialogBoxConsumer } from "@src/components/common/ui/dialog-box/context/dialog-box-consumer";
import { SendRequestDialog } from "./send-request-dialog";
import type { ButtonHTMLAttributes } from "react";


export const SendRequestBtn = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { showDialogBox } = useDialogBoxConsumer();

    const handleSendRequest = () => {
        showDialogBox({
            type: "component",
            children: <SendRequestDialog />,
        });
    };

    return (
        <button
            {...props}
            className={"primary-btn p-2 rounded-sm " + props.className}
            onClick={handleSendRequest}
        >
            Send Request
        </button >
    );
};