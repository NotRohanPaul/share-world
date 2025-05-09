import { Helmet } from "react-helmet";
import { APP_DOMAIN, APP_ENV } from "@src/constants/env";


export const HeadTags = () => {
    return APP_ENV !== "development" ?
        <Helmet>
            <meta property="og:url" content={APP_DOMAIN} />
            <meta name="theme-color" content="#ffffff" />
        </Helmet> :
        null;
};