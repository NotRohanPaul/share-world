import { Footer } from "@src/components/common/layout/footer";
import { Navbar } from "@src/components/common/layout/navbar";
import { ShareWorldImgLink } from "@src/components/common/ui/share-world-img-link";
import { appRoutes } from "@src/routes/app-routes";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

export const LandingPage = () => {
    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>Home</title>
            </Helmet>
            <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto] overflow-auto">
                <Navbar>
                    <ShareWorldImgLink />
                    <nav className="font-semibold">
                        <div className="flex gap-2 max-xs:text-sm">
                            <Link
                                to={appRoutes.login.absolute}
                                children={"Login/Signup"}
                            />
                        </div>
                    </nav>
                </Navbar>
                <main className="h-full grid grid-rows-[30%_auto_1fr] gap-5 p-2 overflow-auto [@media(max-height:40rem)]:grid-rows-none ">
                    <div className="flex flex-col items-center justify-center p-2">
                        <ShareWorldImgLink className="w-60 max-xs:w-[7rem] h-auto max-sm:w-40 max-sm:h-auto" />
                        <h1 className="text-5xl max-sm:text-2xl font-semibold text-black">Share World</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <motion.h1
                            initial={{ y: -500, opacity: 0 }}
                            animate={{ y: 0, opacity: 100 }}
                            transition={{ type: "spring", stiffness: 80 }}
                            className="w-[80%] max-md:w-full text-4xl text-center font-bold max-sm:text-2xl text-pretty max-xs:text-xl p-2">
                            Share Files directly using Peer to Peer tech without sending it to the server.
                        </motion.h1>
                    </div>
                    <div className="features-container">
                        <h2>Features</h2>
                        <div>
                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                No file size limit
                            </motion.p>

                            <motion.p
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                No ram limit
                            </motion.p>

                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Resume support
                            </motion.p>

                            <motion.p
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Share via ID
                            </motion.p>

                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Share via Friends
                            </motion.p>
                        </div>
                    </div>
                </main>
                <Footer />
            </article>
        </>
    );
};
