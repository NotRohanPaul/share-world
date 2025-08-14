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
                <h1 className="text-5xl max-sm:text-2xl font-bold">
                    Something went wrong!
                </h1>
                <div className="justify-self-center flex gap-2">
                    <Link
                        to={appRoutes.home.absolute}
                        className="primary-btn w-[100px] max-sm:w-[70px] flex items-center justify-center text-xl px-4 py-3 max-sm:text-base max-sm:p-2"
                    >
                        Home
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className="primary-btn w-[100px] max-sm:w-[70px] flex items-center justify-center text-xl px-4 py-3 max-sm:text-base max-sm:p-2"
                    >
                        Reload
                    </button>
                </div>

            </main>
        </>
    );
}; 