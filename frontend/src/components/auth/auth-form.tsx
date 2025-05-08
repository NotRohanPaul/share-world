import { LoginForm } from "./login/login";
import { SignupForm } from "./signup/signup";
import type { AuthVariantType } from "./types";


export const AuthForm = ({ authType }: { authType: AuthVariantType; }) => {

    return (
        <form
            className={"flex flex-col gap-2 p-4 auth-form"}
            onSubmit={(e) => e.preventDefault()}
            noValidate={true}
        >
            {
                authType === "signup" ?
                    <SignupForm /> :
                    <LoginForm />
            }
        </form>
    );
};