import ShareWorldIcon from "@src/assets/share-world.png";
import { type FormEventHandler, useState } from "react";
import { Link } from "react-router";


const SignupForm = () => {
    return (
        <>
            <label htmlFor="signupName">Name</label>
            <input type="text" name="name" id="signupName" autoComplete="signupName" />

            <label htmlFor="signupEmail">Email</label>
            <input type="email" name="email" id="signupEmail" autoComplete="signupEmail" />

            <label htmlFor="signupPassword">Password</label>
            <input type="password" name="password" id="signupPassword" autoComplete="signupPassword" />

            <label htmlFor="signupConfirmPassword">ConfirmPassword</label>
            <input type="password" name="confirmPassword" id="signupConfirmPassword" autoComplete="signupConfirmPassword" />

            <button type="submit" value={"signup"}>SignUp</button>
        </>
    );
};
const LoginForm = () => {
    return (
        <>
            <label htmlFor="loginEmail">Email</label>
            <input
                type="email"
                name="email"
                id="loginEmail"
                autoComplete="loginEmail" />

            <label htmlFor="loginPassword">Password</label>
            <input
                type="password"
                name="password"
                id="loginPassword"
                autoComplete="loginPassword" />

            <button
                value={"forgot"}
                className="self-start text-sm text-gray-800 bg-none hover:underline"
            >Forgot Password</button>

            <button
                type="submit"
                value={"login"}
            >Login</button>
        </>
    );
};

export const AuthPage = () => {
    const [authType, setAuthType] = useState<"login" | "signup">("login");

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        if (e.isTrusted === false) return;
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        console.dir(target);
        if (target.value === "login") {

        } else if (target.value === "signup") {

        }
    };

    return (
        <article className="w-full h-screen grid place-content-center gap-4">
            <header className="justify-self-center">
                <Link to={"/"}>
                    <img className="w-50 h-20" src={ShareWorldIcon} alt="Share World" />
                </Link>
            </header>
            <main className="flex flex-col gap-4">
                <header className="self-center text-3xl p-1 rounded-full border-2 border-gray-500 overflow-hidden [&>button]:w-[150px] [&>button]:p-3">
                    <button
                        className={`rounded-l-full ${authType === "login" ? "bg-blue-500 text-white" : "hover:bg-blue-200"}`}
                        onClick={() => setAuthType("login")}
                        children="Login"
                    />
                    <button
                        className={`rounded-r-full ${authType === "signup" ? "bg-blue-500 text-white" : "hover:bg-blue-200"}`}
                        onClick={() => setAuthType("signup")}
                        children="SignUp"
                    />
                </header>
                <main className="text-xl border-2 border-gray-500 rounded-lg">
                    <form
                        className={"flex flex-col gap-2 p-4 c-auth-form"}
                        onSubmit={handleSubmit}
                    >
                        {
                            authType === "signup" ?
                                <SignupForm /> :
                                <LoginForm />
                        }
                    </form>
                </main>
                <div className="h-1 [background-image:repeating-linear-gradient(90deg,transparent_0_3%,gray_3%_7%)] " />
                <footer className="self-center">
                    <button className="p-3 text-white font-semibold bg-blue-500 rounded-sm">
                        {authType === "signup" ?
                            "SignUp with Google" :
                            "Login with Google"}
                    </button>
                </footer>
            </main>
        </article>
    );
};
