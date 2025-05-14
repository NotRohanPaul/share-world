import { AppIcons } from "@src/assets";
import { signupHandler } from "@src/axios/handlers/auth-handler";
import { appRoutes } from "@src/routes/app-router";
import { signupInputSchema } from "@src/schemas/authSchemas";
import { useRef, useState, type ChangeEvent, type KeyboardEventHandler, type MouseEventHandler } from "react";
import { useNavigate } from "react-router";


export const SignupForm = () => {
    const navigate = useNavigate();
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
    const [signupError, setSignupError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const inputRefs = useRef<{
        nameRef: HTMLInputElement | null,
        emailRef: HTMLInputElement | null,
        passwordRef: HTMLInputElement | null,
        confirmPasswordRef: HTMLInputElement | null,
    }>({
        nameRef: null,
        emailRef: null,
        passwordRef: null,
        confirmPasswordRef: null,
    });

    const formSignupHandler = async () => {
        try {
            const response = await signupHandler(signupFormData);
            console.log(response);
            if (response.status === 201) {
                navigate(appRoutes.user);
            } else if (response.status === 400) {
                setSignupError("Invalid Username or Password.");
            } else {
                setSignupError("Server Error.");
            }
        }
        catch {
            setSignupError("Network Error.");
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.isTrusted === false || e.target.tagName !== "INPUT") return;
        let { name, value } = e.target as HTMLInputElement;
        if (name === "confirm-password")
            name = "confirmPassword";

        if (Object.keys(signupFormData).includes(name) === false) return;

        e.preventDefault();

        setSignupFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

        const inputSchema = signupInputSchema.shape[name as keyof typeof signupFormData];
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

    const handleSignupClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        const target = e.target as HTMLButtonElement;
        if (e.isTrusted === false || target.tagName !== "BUTTON") return;
        const isEveryFieldNotEmpty = [signupFormData.name, signupFormData.email, signupFormData.password, signupFormData.confirmPassword].every((item) => item !== "");
        if (isEveryFieldNotEmpty === false) return;

        setSignupError("");
        formSignupHandler();
    };

    const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter" || e.isTrusted === false) return;
        const target = e.target as HTMLInputElement;
        if (target.tagName !== "INPUT") return;
        if (target.value === "") return;
        console.log("hello");
        switch (target.name) {
            case "name": {
                console.log(target.name);
                inputRefs.current.emailRef?.focus();
                return;
            }
            case "email": {
                console.log(target.name);
                inputRefs.current.passwordRef?.focus();
                return;
            }
            case "password": {
                inputRefs.current.confirmPasswordRef?.focus();
                return;
            }
            case "confirm-password": {
                formSignupHandler();
                return;
            }

        }
    };

    const handleEyeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log("hello");
        if (e.isTrusted === false || e.currentTarget.tagName !== "BUTTON") return;
        e.stopPropagation();
        const btnName = e.currentTarget.name;
        let input: HTMLInputElement | null = null;
        if (btnName === "password-eye-btn") {
            setIsPasswordVisible(prev => !prev);
            input = inputRefs.current.passwordRef;
        }
        if (btnName === "confirm-password-eye-btn") {
            setIsConfirmPasswordVisible(prev => !prev);
            input = inputRefs.current.confirmPasswordRef;
        }
        if (input === null) return;
        setTimeout(() => {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }, 0);
    };

    return (
        <>
            {signupError === '' ? null : <p className="input-error text-center">{signupError}</p>}
            <label htmlFor="signup-name">
                Name
            </label>
            <input
                type="text"
                name="name"
                id="signup-name"
                autoComplete="off"
                placeholder="John Doe"
                value={signupFormData.name}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.nameRef = elem; }}
            />
            {inputErrors.name !== '' ? <p className="input-error">{inputErrors.name}</p> : null}

            <label htmlFor="signup-email">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="signup-email"
                autoComplete="off"
                placeholder="hello@example.com"
                value={signupFormData.email}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.emailRef = elem; }}
            />
            {inputErrors.email !== '' ? <p className="input-error">{inputErrors.email}</p> : null}

            <label htmlFor="signup-password">
                Password
            </label>
            <div className="relative">
                <input
                    className="w-full pr-8"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="signup-password"
                    autoComplete="off"
                    value={signupFormData.password}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    ref={(elem) => { inputRefs.current.passwordRef = elem; }}
                />

                <button
                    className="password-visibility-btn"
                    title={isPasswordVisible ? "Hide Password" : "Show Password"}
                    // aria-label="Toggle password visibility"
                    // name="password-eye-btn"
                    onClick={handleEyeClick}
                >
                    {isPasswordVisible ?
                        <AppIcons.EyeOff width={10} height={10} />
                        :
                        <AppIcons.EyeIcon width={10} height={10} />
                    }
                </button>
            </div>
            {inputErrors.password !== '' ? <p className="input-error">{inputErrors.password}</p> : null}

            <label htmlFor="signup-confirm-password">
                Confirm Password
            </label>
            <div className="relative">
                <input
                    className="w-full pr-8"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name="confirm-password"
                    id="signup-confirm-password"
                    autoComplete="off"
                    value={signupFormData.confirmPassword}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    ref={(elem) => { inputRefs.current.confirmPasswordRef = elem; }}
                />
                <button
                    className="password-visibility-btn"
                    title={isConfirmPasswordVisible ? "Hide Password" : "Show Password"}
                    aria-label="Toggle password visibility"
                    name="confirm-password-eye-btn"
                    onClick={handleEyeClick}
                >
                    {isConfirmPasswordVisible ?
                        <AppIcons.EyeOff width={10} height={10} />
                        :
                        <AppIcons.EyeIcon width={10} height={10} />
                    }
                </button>
            </div>
            {inputErrors.confirmPassword !== '' ? <p className="input-error">{inputErrors.confirmPassword}</p> : null}

            <button
                type="button"
                className="submit-btn"
                value="signup"
                onClick={handleSignupClick}
            >
                SignUp
            </button>
        </>
    );
};
