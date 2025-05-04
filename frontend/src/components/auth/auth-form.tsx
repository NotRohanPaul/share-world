import type { FormEventHandler } from "react";
import { SignupForm } from "./signup/signup";
import { LoginForm } from "./login/login";
import type { AuthVariantType } from "./types";


export const AuthForm = ({ authType }: { authType: AuthVariantType; }) => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        if (e.isTrusted === false) return;
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        console.dir(target);
        if (target.value === "login") {
            return;

        } else if (target.value === "signup") {
            return;
        }
    };

    return (
        <form
            className={"flex flex-col gap-2 p-4 auth-form"}
            onSubmit={handleSubmit}
        >
            {
                authType === "signup" ?
                    <SignupForm /> :
                    <LoginForm />
            }
        </form>
    );
};