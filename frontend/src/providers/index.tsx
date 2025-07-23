import { DialogBoxProvider } from "@src/components/common/ui/dialog-box/context/dialog-box-provider";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import type { PropsWithChildren } from "react";
import { AppHelmetProvider } from "./helmet-provider";
import { QueryProvider } from "./query-provider";
import { ReduxStoreProvider } from "./redux-provider";


export const AppProviders = ({ children }: PropsWithChildren) => (
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