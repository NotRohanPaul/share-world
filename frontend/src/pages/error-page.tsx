import { Link } from "react-router";


export const ErrorPage = () => {
    return (
        <main className="h-[100dvh] grid place-content-center gap-2">

            <h1 className="text-5xl font-bold">
                Something went wrong.
            </h1>
            <Link to="/" className="primary-btn justify-self-center text-xl p-2">
                Home
            </Link>
        </main>
    );
}; 