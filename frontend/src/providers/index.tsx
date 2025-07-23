import type { PropsWithChildren } from "react";
import { LibraryProviders } from "./library";
import { UIProviders } from "./ui";

export const AppProviders = ({ children }: PropsWithChildren) => (
    <LibraryProviders>
        <UIProviders>
            {children}
        </UIProviders>
    </LibraryProviders>

);