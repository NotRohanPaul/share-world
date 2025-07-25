import { signupHandler } from "@src/axios/handlers/auth-handler";
import { useDebounce } from "@src/components/common/hooks/useDebounce";
import { useToastContext } from "@src/components/common/ui/toast/context/toasts-consumer";
import { useAppDispatch } from "@src/redux/hook";
import { selectSignupState, signupStateActions } from "@src/redux/slices/auth/signup-slice";
import { userStateActions } from "@src/redux/slices/auth/user-slice";
import { appRoutes } from "@src/routes/app-routes";
import { signupInputSchema, signupSchema, userDataSchema } from "@src/schemas/auth-schemas";
import { isTrusted } from "@src/utils/common";
import { useMutation } from "@tanstack/react-query";
import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEventHandler,
    type MouseEventHandler,
    type PointerEventHandler
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const useSignup = () => {
    const navigate = useNavigate();
    const showToast = useToastContext();
    const dispatch = useAppDispatch();

    const [debouncedField, setDebouncedField] = useState<{ name: string, value: string; } | null>(null);

    const {
        name,
        email,
        password,
        confirmPassword,
        isPasswordVisible,
        isConfirmPasswordVisible,
        inputErrors,
    } = useSelector(selectSignupState);

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

    useEffect(() => {
        return () => {
            dispatch(signupStateActions.resetForm());
        };
    }, []);

    useDebounce(() => {
        if (debouncedField === null) return;
        const inputSchema = signupInputSchema.shape[debouncedField.name as keyof typeof signupInputSchema.shape];
        const parsedValueResult = inputSchema.safeParse(debouncedField.value);
        const newErrors = {
            ...inputErrors,
            [debouncedField.name]: debouncedField.value === '' ?
                '' :
                (
                    parsedValueResult.success === true ?
                        '' :
                        parsedValueResult.error.issues[0].message
                )
        };

        dispatch(signupStateActions.setInputErrors(newErrors));
    }, [debouncedField], 600);

    const { mutate: signup, isPending: isLoading } = useMutation({
        mutationFn: signupHandler,
        onSuccess: async (res) => {
            if (res.status === 201) {
                console.log(res.data);
                const result = userDataSchema.safeParse(res.data);
                console.log(result.error);
                if (result.success === true) {
                    dispatch(userStateActions.setNameAndEmail(result.data));
                    await navigate(appRoutes.user.absolute);
                }
                else {
                    showToast({ text: "Server returned invalid data." });
                }
            } else if (res.status === 400) {
                showToast({ text: "Invalid Inputs." });
            } else {
                showToast({ text: "Server Error." });
            }
        },
        onError: () => {
            showToast({ text: "Network Error." });
        }
    });

    const formSignupHandler = () => {
        const data = { name, email, password, confirmPassword };
        const result = signupSchema.safeParse(data);
        if (result.success === true) {
            signup(result.data);
        }
        else {
            showToast({ text: result.error.issues[0].message });
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

        const actionMap = {
            name: signupStateActions.setName,
            email: signupStateActions.setEmail,
            password: signupStateActions.setPassword,
            confirmPassword: signupStateActions.setConfirmPassword
        };
        if (Object.keys(actionMap).includes(name) === false) return;

        dispatch(actionMap[name as keyof typeof actionMap](value));
        setDebouncedField({ name, value });
    };

    const handleSignupClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        const target = e.target as HTMLButtonElement;
        if (isLoading === true) return;
        if (isTrusted(e) === false || target.tagName !== "BUTTON") return;
        const isEveryFieldNotEmpty = [name, email, password, confirmPassword].every((item) => item !== "");
        if (isEveryFieldNotEmpty === false) return;

        formSignupHandler();
    };

    const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter" || isTrusted(e) === false) return;
        const target = e.target as HTMLInputElement;
        if (target.tagName !== "INPUT") return;
        if (target.value === "") return;
        switch (target.name) {
            case "name": {
                inputRefs.current.emailRef?.focus();
                return;
            }
            case "email": {
                inputRefs.current.passwordRef?.focus();
                return;
            }
            case "password": {
                inputRefs.current.confirmPasswordRef?.focus();
                return;
            }
            case "confirm-password": {
                if (isLoading === true) return;
                formSignupHandler();
                return;
            }

        }
    };

    const handleEyeClick: PointerEventHandler<HTMLButtonElement> = (e) => {
        if (isTrusted(e) === false || e.currentTarget.tagName !== "BUTTON") return;
        e.stopPropagation();
        const btnName = e.currentTarget.name;
        let input: HTMLInputElement | null = null;
        if (btnName === "password-eye-btn") {
            dispatch(signupStateActions.setIsPasswordVisible());
            input = inputRefs.current.passwordRef;
        }
        if (btnName === "confirm-password-eye-btn") {
            dispatch(signupStateActions.setIsConfirmPasswordVisible());
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
        name,
        email,
        password,
        confirmPassword,
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