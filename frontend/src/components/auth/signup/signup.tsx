import { singupInputSchema } from "@src/schemas/authSchemas";
import { useState, type ChangeEvent } from "react";


export const SignupForm = () => {
    const [signupFormData, setSignupFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [inputErrors, setInputErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        console.log(e);
        if (e.isTrusted === false || e.target.tagName !== "INPUT") return;
        if (Object.keys(signupFormData).includes(e.target.name) === false) return;

        e.preventDefault();
        const { name, value } = e.target as HTMLInputElement & { name: keyof typeof signupFormData; };

        setSignupFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

        const inputSchema = singupInputSchema.shape[name];
        const parsedValueResult = inputSchema.safeParse(value);

        setInputErrors((prev) => {
            if (value === "") return {
                ...prev,
                [name]: ""
            };

            if (parsedValueResult.success === false) {
                return {
                    ...prev,
                    [name]: parsedValueResult.error.issues[0].message
                };
            }

            return {
                ...prev,
                [name]: ''
            };
        });
    };

    return (
        <>
            <label htmlFor="signupName">
                Name
            </label>
            <input
                type="text"
                name="name"
                id="signupName"
                autoComplete="off"
                placeholder="John Doe"
                value={signupFormData.name}
                onChange={handleChange}
            />
            {inputErrors.name !== '' ? <p className="input-error">{inputErrors.name}</p> : null}

            <label htmlFor="signupEmail">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="signupEmail"
                autoComplete="off"
                placeholder="hello@example.com"
                value={signupFormData.email}
                onChange={handleChange}
            />
            {inputErrors.email !== '' ? <p className="input-error">{inputErrors.email}</p> : null}

            <label htmlFor="signupPassword">
                Password
            </label>
            <input
                type="password"
                name="password"
                id="signupPassword"
                autoComplete="off"
                value={signupFormData.password}
                onChange={handleChange}
            />
            {inputErrors.password !== '' ? <p className="input-error">{inputErrors.password}</p> : null}

            <label htmlFor="signupConfirmPassword">
                Confirm Password
            </label>
            <input
                type="password"
                name="confirmPassword"
                id="signupConfirmPassword"
                autoComplete="off"
                value={signupFormData.confirmPassword}
                onChange={handleChange}
            />
            {inputErrors.confirmPassword !== '' ? <p className="input-error">{inputErrors.confirmPassword}</p> : null}

            <button
                type="submit"
                value={"signup"}
            >
                SignUp
            </button>
        </>
    );
};
