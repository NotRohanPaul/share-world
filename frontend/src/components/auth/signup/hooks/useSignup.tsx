import { signupHandler } from "@src/axios/handlers/auth-handler";
import { appRoutes } from "@src/routes/app-routes";
import { signupInputSchema } from "@src/schemas/authSchemas";
import { useRef, useState, type ChangeEvent, type KeyboardEventHandler, type MouseEventHandler } from "react";
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
               void navigate(appRoutes.user);
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
        if (e.isTrusted === false || target.tagName !== "BUTTON") return;
        const isEveryFieldNotEmpty = [signupFormData.name, signupFormData.email, signupFormData.password, signupFormData.confirmPassword].every((item) => item !== "");
        if (isEveryFieldNotEmpty === false) return;

        setSignupError("");
        void formSignupHandler();
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
                void formSignupHandler();
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
   
    return {
        signupFormData,
        inputErrors,
        signupError,
        isPasswordVisible,
        isConfirmPasswordVisible,
        inputRefs,
        handleInputChange,
        handleSignupClick,
        handleEnter,
        handleEyeClick,
    }
}