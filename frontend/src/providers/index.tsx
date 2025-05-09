import type { FC, ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { HeadTags } from "./head-tags";


export const AppProviders: FC<{ children: ReactNode; }> =
    ({ children }) => {
        return (
            <QueryProvider>
                <HeadTags />
                {children}
            </QueryProvider>
        );
    };