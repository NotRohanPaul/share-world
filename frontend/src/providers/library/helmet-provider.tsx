import { API_ORIGIN, APP_ORIGIN, IS_SECURE_ENV, WS_API_ORIGIN } from "@src/constants/env";
import type { PropsWithChildren } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";


export const AppHelmetProvider = ({ children }: PropsWithChildren) => (
    <HelmetProvider>
        {(IS_SECURE_ENV === false) ? null :
            <Helmet prioritizeSeoTags={true}>
                <meta property="og:url" content={APP_ORIGIN} />
                <meta http-equiv="Content-Security-Policy"
                    content={`default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' ${API_ORIGIN} ${WS_API_ORIGIN}; form-action 'self'; base-uri 'self';`} />
            </Helmet>}
        {children}
    </HelmetProvider>
);