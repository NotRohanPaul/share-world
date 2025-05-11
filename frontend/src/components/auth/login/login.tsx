import { AppIcons } from "@src/assets";
import { loginHandler } from "@src/axios/handlers/auth-handler";
import { loginSchema } from "@src/schemas/authSchemas";
import { useState, type ChangeEvent, type MouseEventHandler } from "react";
import { useNavigate } from "react-router";


export const LoginForm = () => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const [formError, setFormError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        const target = e.target as HTMLButtonElement;
        if (e.isTrusted === false || target.tagName !== "BUTTON") return;
        const response = await loginHandler(loginFormData);
        if (response.status === 200) {
            navigate("/user");
        } else if (response.status === 400) {
            setFormError("Invalid Username or Password.");
        } else {
            setFormError("Server Error.");
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
            <div className="relative">
                <input
                    className="w-full pr-8"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="loginPassword"
                    autoComplete="current-password"
                    value={loginFormData.password}
                    onChange={handleChange}
                />

                <button
                    className="password-visibility-btn"
                    title={isPasswordVisible ? "Hide Password" : "Show Password"}
                    aria-label="Toggle password visibility"
                    type="button"
                    onClick={() => setIsPasswordVisible(prev => !prev)}
                >
                    {isPasswordVisible ?
                        <AppIcons.EyeOff width={10} height={10} />
                        :
                        <AppIcons.EyeIcon width={10} height={10} />
                    }
                </button>
            </div>
            <button
                value="forgot"
                className="self-start text-sm text-gray-800 bg-none hover:underline"
                type="button">
                Forgot Password
            </button>

            <button
                type="button"
                className="submit"
                value={"login"}
                onClick={handleClick}
            >
                Login
            </button>
            {formError === '' ? null : <p className="input-error">{formError}</p>}
        </>
    );
};