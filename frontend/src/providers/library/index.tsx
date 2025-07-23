import type { PropsWithChildren } from "react";
import { ReduxStoreProvider } from "./redux-provider";
import { QueryProvider } from "./query-provider";
import { AppHelmetProvider } from "./helmet-provider";



export const LibraryProviders = ({ children }: PropsWithChildren) => (
    <ReduxStoreProvider>
        <QueryProvider>
            <AppHelmetProvider>
                {children}
            </AppHelmetProvider>
        </QueryProvider>
    </ReduxStoreProvider>
);