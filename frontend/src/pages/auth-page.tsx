import { AppImages } from "@src/assets";
import { AuthForm } from "@src/components/auth/auth-form";
import type { AuthVariantType } from "@src/components/auth/types";
import { appRoutes } from "@src/routes/app-routes";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";


export const AuthPage = () => {
    const [authType, setAuthType] = useState<AuthVariantType>("login");

    return (<>
        <Helmet prioritizeSeoTags={true}>
            <title>Login/Signup</title>
        </Helmet>
        <article className="h-[100dvh] grid place-content-center gap-4">
            <header className="justify-self-center">
                <Link to={appRoutes.home}>
                    <AppImages.ShareWorld width={200} height="auto" className="w-40 h-auto max-sm:w-30 max-sm:h-12" />
                </Link>
            </header>
            <main className="w-[450px] max-sm:w-[350px] flex flex-col gap-4 p-1">
                <header className="self-center text-2xl p-0.5 rounded-full border-2 border-gray-500 overflow-hidden max-sm:text-xl  [&>button]:w-[150px] [&>button]:p-3 max-sm:[&>button]:p-1 max-sm:[&>button]:w-[100px]">
                    <button
                        className={`rounded-l-full ${authType === "login" ? "bg-primary text-white" : "hover:bg-blue-200"}`}
                        onClick={() => setAuthType("login")}
                        children="Login"
                    />
                    <button
                        className={`rounded-r-full ${authType === "signup" ? "bg-primary text-white" : "hover:bg-blue-200"}`}
                        onClick={() => setAuthType("signup")}
                        children="SignUp"
                    />
                </header>
                <main className="text-xl max-sm:text-base border-2 border-gray-500 rounded-lg">
                    <AuthForm authType={authType} />
                </main>
                <div className="h-1 [background-image:repeating-linear-gradient(90deg,transparent_0_3%,gray_3%_7%)] " />
                <footer className="self-center">
                    <button className="p-3 max-sm:p-2 max-sm:text-sm text-white font-semibold bg-primary rounded-sm">
                        {authType === "signup" ?
                            "SignUp with Google" :
                            "Login with Google"}
                    </button>
                </footer>
            </main>
        </article>
    </>

    );
};
