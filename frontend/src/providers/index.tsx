import type { FC, ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { AppHelmetProvider } from "./helmet-provider";


export const AppProviders: FC<{ children: ReactNode; }> =
    ({ children }) => {
        return (
            <QueryProvider>
                <AppHelmetProvider>
                    {children}
                </AppHelmetProvider>
            </QueryProvider>
        );
    };