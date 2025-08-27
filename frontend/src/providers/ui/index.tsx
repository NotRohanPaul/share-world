import { DialogBoxProvider } from "@src/components/common/ui/dialog-box/context/dialog-box-provider";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import type { PropsWithChildren } from "react";
import { AppAppearanceProvider } from "./app-appearance-provider";



export const UIProviders = ({ children }: PropsWithChildren) => (
    <DialogBoxProvider>
        <ToastsProvider>
            <AppAppearanceProvider>
                {children}
            </AppAppearanceProvider>
        </ToastsProvider>
    </DialogBoxProvider >
);