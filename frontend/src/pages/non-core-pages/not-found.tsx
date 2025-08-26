import { appRoutes } from "@src/routes/app-routes";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";


export const NotFoundPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>Not Found</title>
            </Helmet>
            <main className="h-[100dvh] grid place-content-center gap-2">

                <h1 className="text-5xl font-bold">
                    Page not found.
                </h1>
                <Link to={appRoutes.home.absolute} className="primary-btn justify-self-center text-xl p-2">
                    Home
                </Link>
            </main>
        </>
    );
}; 