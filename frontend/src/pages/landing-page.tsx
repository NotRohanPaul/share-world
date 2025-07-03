import { AppImages } from "@src/assets/images";
import { Navbar } from "@src/components/common/layout/navbar";
import { Footer } from "@src/components/common/layout/footer";
import { appRoutes } from "@src/routes/app-routes";
import { motion } from "motion/react";
import { Link } from "react-router";

export const LandingPage = () => {
    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Navbar>
                <Link to={appRoutes.home.absolute}>
                    <AppImages.ShareWorldFade className="w-10 h-10 aspect-square object-center object-contain p-1 bg-white rounded-full"
                    />
                </Link>
                <nav className="font-semibold text-white">
                    <div className="flex gap-2">
                        <Link
                            to={appRoutes.login.absolute}
                            children={"Login/Signup"}
                        />
                    </div>
                </nav>
            </Navbar>
            <main className="h-full grid justify-items-center content-center gap-5">
                <Link to={appRoutes.home.absolute}>
                    <AppImages.ShareWorldFade className="w-60 h-auto max-sm:w-40 max-sm:h-auto" />
                </Link>
                <motion.h1
                    initial={{ y: -500, opacity: 0 }}
                    animate={{ y: 0, opacity: 100 }}
                    transition={{ type: "spring", stiffness: 80 }}
                    className="w-[80%] max-md:w-full text-4xl text-center font-bold max-sm:text-2xl">
                    Share Files directly using Peer to Peer tech without sending it to the sever.
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
            <Footer />
        </article>
    );
};
