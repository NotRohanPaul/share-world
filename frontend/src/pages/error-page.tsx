import { appRoutes } from "@src/routes/app-routes";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";


export const ErrorPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>Error</title>
            </Helmet>
            <main className="h-[100dvh] grid place-content-center gap-3">
                <h1 className="text-5xl font-bold">
                    Something went wrong!
                </h1>
                <div className="justify-self-center flex gap-2">
                    <Link
                        to={appRoutes.home.absolute}
                        className="primary-btn justify-self-center text-xl p-2"
                    >
                        Home
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className="primary-btn justify-self-center text-xl p-2"
                    >
                        Reload
                    </button>
                </div>

            </main>
        </>
    );
}; 