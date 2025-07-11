import { signupHandler } from "@src/axios/handlers/auth-handler";
import { useToastContext } from "@src/components/common/ui/toast/context/toasts-consumer";
import { appRoutes } from "@src/routes/app-routes";
import { signupInputSchema } from "@src/schemas/auth-schemas";
import { isTrusted } from "@src/utils/common";
import { useRef, useState, type ChangeEvent, type KeyboardEventHandler, type MouseEventHandler, type PointerEventHandler } from "react";
import { useNavigate } from "react-router";

export const useSignup = () => {
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
    const [isLoading, setIsLoading] = useState(false);
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

    const showToast = useToastContext();


    const formSignupHandler = async () => {
        try {
            setIsLoading(true);
            const response = await signupHandler(signupFormData);
            console.log(response);
            if (response.status === 201) {
                void navigate(appRoutes.user.absolute);
            } else if (response.status === 400) {
                showToast({ text: "Invalid Inputs." });
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
        const target = e.target as HTMLInputElement;
        let name = target.name;
        const value = target.value;

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
        if (isLoading === true) return;
        if (isTrusted(e) === false || target.tagName !== "BUTTON") return;
        const isEveryFieldNotEmpty = [signupFormData.name, signupFormData.email, signupFormData.password, signupFormData.confirmPassword].every((item) => item !== "");
        if (isEveryFieldNotEmpty === false) return;

        void formSignupHandler();
    };

    const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter" || isTrusted(e) === false) return;
        const target = e.target as HTMLInputElement;
        if (target.tagName !== "INPUT") return;
        if (target.value === "") return;
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
                if (isLoading === true) return;
                void formSignupHandler();
                return;
            }

        }
    };

    const handleEyeClick: PointerEventHandler<HTMLButtonElement> = (e) => {
        console.log("hello");
        if (isTrusted(e) === false || e.currentTarget.tagName !== "BUTTON") return;
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
        if (e.pointerType === "touch")
            return;
        setTimeout(() => {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }, 0);
    };

    return {
        isLoading,
        signupFormData,
        inputErrors,
        isPasswordVisible,
        isConfirmPasswordVisible,
        inputRefs,
        handleInputChange,
        handleSignupClick,
        handleEnter,
        handleEyeClick,
    };
};