import { LoginForm } from "./login";
import { SignupForm } from "./signup";
import type { AuthVariantType } from "./types";


export const AuthForm = ({ authType }: { authType: AuthVariantType; }) => {

    return (
        <form
            noValidate={true}
            onSubmit={(e) => e.preventDefault()} className={"flex flex-col gap-2 p-4 auth-form"}>
            {
                authType === "signup" ?
                    <SignupForm /> :
                    <LoginForm />
            }
        </form>
    );
};