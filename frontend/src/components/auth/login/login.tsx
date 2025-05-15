import { AppIcons } from "@src/assets";
import { loginHandler } from "@src/axios/handlers/auth-handler";
import { appRoutes } from "@src/routes/app-router";
import { loginSchema } from "@src/schemas/authSchemas";
import {
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEventHandler,
    type MouseEventHandler
} from "react";
import { useNavigate } from "react-router";


export const LoginForm = () => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputRefs = useRef<{
        emailRef: HTMLInputElement | null,
        passwordRef: HTMLInputElement | null,
    }>({
        emailRef: null,
        passwordRef: null,
    });

    const formLoginHandler = async () => {
        try {
            const response = await loginHandler(loginFormData);
            console.log(response);
            if (response.status === 200) {
                navigate(appRoutes.user);
            } else if (response.status === 400) {
                setLoginError("Invalid Username or Password.");
            } else {
                setLoginError("Server Error.");
            }
        }
        catch {
            setLoginError("Network Error.");
        }
    };

    const handleInputChange = (
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

    const handleLoginClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        const target = e.target as HTMLButtonElement;
        if (e.isTrusted === false || target.tagName !== "BUTTON") return;
        if (loginFormData.password === "" || loginFormData.email === "" || emailError !== "") return;

        setLoginError("");
        formLoginHandler();
    };

    const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter" || e.isTrusted === false) return;
        const target = e.target as HTMLInputElement;
        if (target.tagName !== "INPUT") return;

        if (target.name === "email") {
            if (target.value === "") return;
            inputRefs.current.passwordRef?.focus();
        }
        if (target.name === "password") {
            if (target.value === "") return;
            formLoginHandler();
        }
    };

    const handleEyeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (e.isTrusted === false || e.currentTarget.tagName !== "BUTTON") return;
        e.stopPropagation();
        setIsPasswordVisible(prev => !prev);
        setTimeout(() => {
            const input = inputRefs.current.passwordRef;
            if (input) {
                input.focus();
                const len = input.value.length;
                input.setSelectionRange(len, len);
            }
        }, 0);
    };


    return (
        <>
            {loginError === '' ? null : <p className="input-error text-center">{loginError}</p>}
            <label htmlFor="login-email">Email</label>
            <input
                type="email"
                name="email"
                id="login-email"
                autoComplete="email"
                placeholder="hello@example.com"
                value={loginFormData.email}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.emailRef = elem; }}
            />
            {emailError !== '' ? <p className="input-error">{emailError}</p> : null}

            <label htmlFor="login-password">Password</label>
            <div className="relative">
                <input
                    className="w-full pr-8"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="login-password"
                    autoComplete="current-password"
                    value={loginFormData.password}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    ref={(elem) => { inputRefs.current.passwordRef = elem; }}
                />

                <button
                    className="password-visibility-btn"
                    title={isPasswordVisible ? "Hide Password" : "Show Password"}
                    aria-label="Toggle password visibility"
                    type="button"
                    onClick={handleEyeClick}
                >
                    {isPasswordVisible ?
                        <AppIcons.EyeOff width={10} height={10} />
                        :
                        <AppIcons.EyeIcon width={10} height={10} />
                    }
                </button>
            </div>
            <button
                type="button"
                className="submit-btn"
                value="login"
                onClick={handleLoginClick}
            >
                Login
            </button>

        </>
    );
};