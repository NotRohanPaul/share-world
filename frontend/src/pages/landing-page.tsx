import { AppImages } from "@src/assets";
import { appRoutes } from "@src/routes/app-routes";
import { motion } from "motion/react";
import { Link } from "react-router";

export const LandingPage = () => {

    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <header className="h-15 flex justify-between items-center p-1 bg-primary">
                <Link to={appRoutes.home.absolute}>
                    <AppImages.ShareWorld width={50} height="auto" className="w-10 h-auto aspect-square object-center object-contain p-1 bg-white rounded-full"
                    />
                </Link>
                <nav className="font-semibold text-white">
                    <div className="flex gap-2">
                        <Link
                            to={appRoutes.login.absolute}
                            children={"Login/Signup"}
                        />
                        <Link
                            to={appRoutes.contact.absolute}
                            children={"Contact"}
                        />
                    </div>
                </nav>
            </header>
            <main className="h-full grid justify-items-center content-center gap-5">
                <Link to={appRoutes.home.absolute}>
                    <AppImages.ShareWorld width={200} height="auto" className="w-60 h-auto max-sm:w-40 max-sm:h-auto" />
                </Link>
                <motion.h1
                    initial={{ y: -500, opacity: 0 }}
                    animate={{ y: 0, opacity: 100 }}
                    transition={{ type: "spring", stiffness: 80 }}
                    className="w-[80%] text-4xl text-center font-bold max-sm:text-2xl">
                    Share Files directly using Peer to Peer without sending it to the sever.
                </motion.h1>
                <div className="features-container">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >No file size limit
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >No ram limit</motion.div>
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >Resume support</motion.div>
                </div>
            </main>
            <footer className="h-10 grid place-content-center text-center bg-primary text-white">
                @Copyright Share World
            </footer>
        </article>
    );
};
