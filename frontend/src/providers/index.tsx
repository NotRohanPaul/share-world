import type { FC, ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { AppHelmetProvider } from "./helmet-provider";
import { ReduxStoreProvider } from "./redux-store";


export const AppProviders: FC<{ children: ReactNode; }> =
    ({ children }) => {
        return (
            <ReduxStoreProvider>
                <QueryProvider>
                    <AppHelmetProvider>
                        {children}
                    </AppHelmetProvider>
                </QueryProvider>
            </ReduxStoreProvider>
        );
    };