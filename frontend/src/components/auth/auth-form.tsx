import { LoginForm } from "./login/login";
import { SignupForm } from "./signup/signup";
import type { AuthVariantType } from "./types";


export const AuthForm = ({ authType }: { authType: AuthVariantType; }) => {

    return (
        <div className={"flex flex-col gap-2 p-4 auth-form"}>
            {
                authType === "signup" ?
                    <SignupForm /> :
                    <LoginForm />
            }
        </div>
    );
};