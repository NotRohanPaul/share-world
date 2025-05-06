import { loginSchema } from "@src/schemas/authSchemas";
import { useState, type ChangeEvent } from "react";


export const LoginForm = () => {
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const [emailError, setEmailError] = useState<string>("");


    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.isTrusted === false || e.target.tagName !== "INPUT") return;
        if (Object.keys(loginFormData).includes(e.target.name) === false) return;

        e.preventDefault();
        const { name, value } = e.target as HTMLInputElement & { name: keyof typeof loginFormData; };
        setLoginFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

        if (name === "email") {
            const emailSchema = loginSchema.shape.email;
            const parsedEmailResult = emailSchema.safeParse(value);

            setEmailError(() => {
                if (parsedEmailResult.success === false) {
                    return parsedEmailResult.error.issues[0].message;
                }
                return '';
            });
        }
    };


    return (
        <>
            <label htmlFor="loginEmail">Email</label>
            <input
                type="email"
                name="email"
                id="loginEmail"
                autoComplete="email"
                placeholder="hello@example.com"
                value={loginFormData.email}
                onChange={handleChange}
            />
            {emailError !== '' ? <p className="input-error">{emailError}</p> : null}

            <label htmlFor="loginPassword">Password</label>
            <input
                type="password"
                name="password"
                id="loginPassword"
                autoComplete="current-password"
                value={loginFormData.password}
                onChange={handleChange}
            />

            <button
                value="forgot"
                className="self-start text-sm text-gray-800 bg-none hover:underline"
                type="button">
                Forgot Password
            </button>

            <button
                type="submit"
                value={"login"}
            >
                Login
            </button>
        </>
    );
};