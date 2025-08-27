import { Footer } from "@src/components/common/layout/footer";
import { Navbar } from "@src/components/common/layout/navbar";
import { ShareWorldImgLink } from "@src/components/common/ui/share-world-img-link";
import { UserNavBar } from "@src/components/user/layout/user-navbar";
import { authSelectors } from "@src/redux/slices/auth";
import { useAppSelector } from "@src/redux/utils/hooks";
import { appRoutes } from "@src/routes/app-routes";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";


const introLine = "Share Files directly using Peer to Peer tech without sending it to the server.";

const features = [
    "No file size limit (WIP)",
    "No RAM limit (WIP)",
    "Resume support (WIP)",
    "Share via ID",
    "Share to Friend (WIP)",
];

export const LandingPage = () => {
    const userState = useAppSelector(authSelectors.user);

    return (
        <>
            <Helmet prioritizeSeoTags={true}>
                <title>Home</title>
            </Helmet>
            <article className="h-[100dvh] grid grid-rows-[auto_1fr_auto] overflow-auto">
                <Navbar>
                    {
                        userState.type === "guest" ?
                            <nav className="font-semibold">
                                <div className="flex gap-2 max-xs:text-sm">
                                    <Link
                                        to={appRoutes.login.absolute}
                                        children={"Login/Signup"}
                                    />
                                </div>
                            </nav> :
                            <UserNavBar />

                    }
                </Navbar>
                <main className="h-full grid grid-rows-[25%_auto_auto_1fr] gap-5 p-2 overflow-auto [@media(max-height:40rem)]:grid-rows-none ">
                    <div className="flex flex-col items-center justify-center p-2">
                        <ShareWorldImgLink className="w-60 max-xs:w-[7rem] h-auto max-sm:w-40 max-sm:h-auto" />
                        <h1 className="text-5xl max-sm:text-2xl font-semibold">Share World</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link className="w-[7rem] max-xs:w-[6rem] text-xl max-xs:text-base text-center font-bold p-2  max-xs:py-1.5 rounded-full outline-3 outline-primary transition-shadow shadow-[5px_-5px_0_5px_var(--app-color-primary)] hover:shadow-none" to={"/user"}>
                            Try Now
                        </Link>
                    </div>
                    <div className="flex flex-col items-center">
                        <motion.h1
                            initial={{ y: -200, opacity: 0 }}
                            animate={{ y: 0, opacity: 100 }}
                            transition={{ type: "spring", stiffness: 80 }}
                            className="w-[80%] max-md:w-full text-4xl text-center font-bold max-sm:text-2xl text-pretty max-xs:text-xl p-2">
                            {introLine}
                        </motion.h1>
                    </div>
                    <div className="features-container">
                        <h2>Features</h2>
                        <div>
                            {features.map((feature, index) => (
                                <motion.p
                                    key={feature + index}
                                    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                >
                                    {feature}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </article>
        </>
    );
};
