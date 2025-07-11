import { loginHandler } from "@src/axios/handlers/auth-handler";
import { useToastContext } from "@src/components/common/ui/toast/context/toasts-consumer";
import { appRoutes } from "@src/routes/app-routes";
import { loginSchema } from "@src/schemas/auth-schemas";
import { isTrusted } from "@src/utils/common";
import { useRef, useState, type ChangeEvent, type KeyboardEventHandler, type MouseEventHandler, type PointerEventHandler } from "react";
import { useNavigate } from "react-router";


export const useLogin = () => {
    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [emailInputError, setEmailError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<{
        emailRef: HTMLInputElement | null,
        passwordRef: HTMLInputElement | null,
    }>({
        emailRef: null,
        passwordRef: null,
    });

    const showToast = useToastContext();

    const formLoginHandler = async () => {
        try {
            setIsLoading(true);
            const response = await loginHandler(loginFormData);
            console.log(response);
            if (response.status === 200) {
                void navigate(appRoutes.user.absolute);
            } else if (response.status === 400) {
                showToast({ text: "Invalid Username or Password." });
            } else {
                showToast({ text: "Server Error." });
            }
        }
        catch {
            showToast({ text: "Network Error." });
        }
        finally {
            setIsLoading(false);
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
        if (isLoading === true) return;
        if (isTrusted(e) === false || target.tagName !== "BUTTON") return;
        if (loginFormData.password === "" || loginFormData.email === "" || emailInputError !== "") return;

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
            if (isLoading === true) return;
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
        isLoading,
        loginFormData,
        emailInputError,
        isPasswordVisible,
        inputRefs,
        handleInputChange,
        handleLoginClick,
        handleEnter,
        handleEyeClick
    };
};