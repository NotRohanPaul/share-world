import type { FC, ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { AppHelmetProvider } from "./helmet-provider";
import { ReduxStoreProvider } from "./redux-store";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import { DialogBoxProvider } from "@src/components/common/ui/dialog-box/context/dialog-box-provider";


export const AppProviders: FC<{ children: ReactNode; }> = ({ children }) => (
    <ReduxStoreProvider>
        <DialogBoxProvider>
            <ToastsProvider>
                <QueryProvider>
                    <AppHelmetProvider>
                        {children}
                    </AppHelmetProvider>
                </QueryProvider>
            </ToastsProvider>
        </DialogBoxProvider>
    </ReduxStoreProvider>
);