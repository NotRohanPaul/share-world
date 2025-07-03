import { Footer } from "@src/components/common/layout/footer";
import { Navbar } from "@src/components/common/layout/navbar";
import { ShareWorldImgLink } from "@src/components/common/ui/share-world-img-link";
import { appRoutes } from "@src/routes/app-routes";
import { motion } from "motion/react";
import { Link } from "react-router";

export const LandingPage = () => {
    return (
        <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Navbar>
                <ShareWorldImgLink />
                <nav className="font-semibold text-white">
                    <div className="flex gap-2 max-xs:text-sm">
                        <Link
                            to={appRoutes.login.absolute}
                            children={"Login/Signup"}
                        />
                    </div>
                </nav>
            </Navbar>
            <main className="h-full grid justify-items-center content-center gap-5">
                <ShareWorldImgLink className="w-60 max-xs:w-[7rem] h-auto max-sm:w-40 max-sm:h-auto" />
                <motion.h1
                    initial={{ y: -500, opacity: 0 }}
                    animate={{ y: 0, opacity: 100 }}
                    transition={{ type: "spring", stiffness: 80 }}
                    className="w-[80%] max-md:w-full text-4xl text-center font-bold max-sm:text-2xl max-xs:text-pretty max-xs:text-xl p-2">
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
