import type { FC, ReactNode } from "react";
import { QueryProvider } from "./query-provider";


export const AppProviders: FC<{ children: ReactNode; }> =
    ({ children }) => {
        return (
            <QueryProvider>
                {children}
            </QueryProvider>

        );
    };