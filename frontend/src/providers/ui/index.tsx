import { DialogBoxProvider } from "@src/components/common/ui/dialog-box/context/dialog-box-provider";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import type { PropsWithChildren } from "react";
import { AppContextProvider } from "./app-context-provider";



export const UIProviders = ({ children }: PropsWithChildren) => (
    <DialogBoxProvider>
        <ToastsProvider>
            <AppContextProvider>
                {children}
            </AppContextProvider>
        </ToastsProvider>
    </DialogBoxProvider >
);