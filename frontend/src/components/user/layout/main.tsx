import { AppIcons } from "@src/assets";
import { useState } from "react";
import { SendAndReceiveFiles } from "../ui/send-receive-files";
import type { ActionType } from "../types";

export const Main = () => {
    const [action, setAction] = useState<ActionType>(null);

    return (
        <main className="flex flex-col gap-2 items-center justify-center">
            {action === null ? (
                <section className="flex gap-2">
                    <button
                        className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                        onPointerDown={() => setAction("Send")}
                    >
                        <AppIcons.Send className="w-[3rem] h-[3rem]" />
                        Send
                    </button>
                    <button
                        className="w-[10rem] h-[10rem] flex flex-col items-center justify-center text-2xl font-bold border-5 border-primary p-2 rounded-md bg-white text-primary transition-colors hover:bg-primary hover:text-white overflow-hidden"
                        onPointerDown={() => setAction("Receive")}

                    >
                        <AppIcons.Receive className="w-[3rem] h-[3rem]" />
                        Receive
                    </button>
                </section>
            ) : (
                <SendAndReceiveFiles action={action} />
            )}
        </main>
    );
};
