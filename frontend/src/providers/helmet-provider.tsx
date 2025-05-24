import { APP_DOMAIN } from "@src/constants/env";
import { isSecureEnv } from "@src/utils/common";
import type { FC, ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";


export const AppHelmetProvider: FC<{ children: ReactNode; }> = ({ children }) => {

    return (
        <HelmetProvider>
            {(isSecureEnv() === false) ? null :
                <Helmet prioritizeSeoTags={true}>
                    <meta property="og:url" content={APP_DOMAIN} />
                    <meta http-equiv="Content-Security-Policy"
                        content="default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self';" />
                </Helmet>}
            {children}
        </HelmetProvider>
    );
};