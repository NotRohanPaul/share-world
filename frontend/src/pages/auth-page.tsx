import { AppImages } from "@src/assets";
import { AuthForm } from "@src/components/auth/auth-form";
import type { AuthVariantType } from "@src/components/auth/types";
import { appRoutes } from "@src/routes/app-routes";
import { motion } from "motion/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";


export const AuthPage = () => {
    const [authType, setAuthType] = useState<AuthVariantType>("login");

    return (<>
        <Helmet prioritizeSeoTags={true}>
            <title>Login/Signup</title>
        </Helmet>
        <article
            className="h-[100dvh] grid place-content-center gap-4 max-xs:justify-normal max-xs:p-3">
            <header
                className="justify-self-center">
                <Link to={appRoutes.home}>
                    <AppImages.ShareWorld width={200} height="auto" className="w-40 h-auto max-sm:w-30 max-sm:h-12" />
                </Link>
            </header>
            <main
                className="w-[450px] flex flex-col gap-4 p-1  max-sm:w-[350px] max-xs:w-full">
                <header className="self-center text-xl p-0.5 rounded-full border-2 border-gray-500 overflow-hidden max-sm:text-xl  [&>button]:w-[100px] [&>button]:p-2 max-sm:[&>button]:p-1 max-sm:[&>button]:w-[80px] max-sm:[&>button]:text-base">
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
                <motion.main
                    key={authType}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="text-xl border-2 border-gray-500 rounded-lg max-sm:text-base">
                    <AuthForm authType={authType} />
                </motion.main>
            </main>
        </article>
    </>

    );
};
