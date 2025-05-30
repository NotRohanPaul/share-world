import { loginHandler } from "@src/axios/handlers/auth-handler";
import { appRoutes } from "@src/routes/app-routes";
import { loginSchema } from "@src/schemas/authSchemas";
import { isTrusted } from "@src/utils/common";
import { useRef, useState, type ChangeEvent, type KeyboardEventHandler, type MouseEventHandler, type PointerEventHandler } from "react";
import { useNavigate } from "react-router";


export const useLogin = () => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState("");
    const [emailInputError, setEmailError] = useState("");
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
                void navigate(appRoutes.user);
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
        if (isTrusted(e) === false || e.target.tagName !== "INPUT") return;
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
        console.dir(e.constructor);
        if (isTrusted(e) === false || target.tagName !== "BUTTON") return;
        if (loginFormData.password === "" || loginFormData.email === "" || emailInputError !== "") return;

        setLoginError("");
        void formLoginHandler();
    };

    const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter" || isTrusted(e) === false) return;
        const target = e.target as HTMLInputElement;
        if (target.tagName !== "INPUT") return;

        if (target.name === "email") {
            if (target.value === "") return;
            inputRefs.current.passwordRef?.focus();
        }
        if (target.name === "password") {
            if (target.value === "") return;
            void formLoginHandler();
        }
    };

    const handleEyeClick: PointerEventHandler<HTMLButtonElement> = (e) => {
        if (isTrusted(e) === false || e.currentTarget.tagName !== "BUTTON") return;
        e.stopPropagation();
        setIsPasswordVisible(prev => !prev);
        if (e.pointerType === "touch")
            return;
        setTimeout(() => {
            const input = inputRefs.current.passwordRef;
            if (input) {
                input.focus();
                const len = input.value.length;
                input.setSelectionRange(len, len);
            }
        }, 0);
    };

    return {
        loginFormData,
        loginError,
        emailInputError,
        isPasswordVisible,
        inputRefs,
        handleInputChange,
        handleLoginClick,
        handleEnter,
        handleEyeClick
    };
};