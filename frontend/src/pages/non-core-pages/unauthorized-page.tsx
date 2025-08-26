import { appRoutes } from "@src/routes/app-routes";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";


export const UnauthorizedPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>Unauthorized</title>
            </Helmet>
            <main className="h-[100dvh] grid place-content-center gap-3">
                <h1 className="text-5xl max-sm:text-3xl max-xs:text-base font-bold">
                    Login or Signup to continue
                </h1>
                <div className="justify-self-center flex flex-0 gap-2 text-xl max-xs:text-sm">
                    <Link
                        to={appRoutes.home.absolute}
                        className="primary-btn min-w-[100px] max-xs:min-w-[30px] max-xs:h-[30px] flex items-center justify-center p-3 max-xs:px-5"
                    >
                        Home
                    </Link>
                    <Link
                        to={appRoutes.login.absolute}
                        className="primary-btn min-w-[100px] max-xs:min-w-[30px] max-xs:h-[30px] flex items-center justify-center p-3 max-xs:px-5"
                    >
                        Login/Signup
                    </Link>
                </div>
            </main>
        </>
    );
};