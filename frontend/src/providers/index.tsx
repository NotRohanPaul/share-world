import type { FC, ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { AppHelmetProvider } from "./helmet-provider";
import { ReduxStoreProvider } from "./redux-store";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";


export const AppProviders: FC<{ children: ReactNode; }> = ({ children }) => (
    <ReduxStoreProvider>
        <ToastsProvider>
            <QueryProvider>
                <AppHelmetProvider>
                    {children}
                </AppHelmetProvider>
            </QueryProvider>
        </ToastsProvider>
    </ReduxStoreProvider>
);