import { loginHandler } from "@src/axios/handlers/auth-handler";
import { useToastContext } from "@src/components/common/ui/toast/context/toasts-consumer";
import { useAppDispatch, useAppSelector } from "@src/redux/hook";
import {
    resetForm,
    selectLoginState,
    setEmail,
    setEmailError,
    setPassword,
    togglePasswordVisible
} from "@src/redux/slices/auth/login-slice";
import { appRoutes } from "@src/routes/app-routes";
import { loginSchema } from "@src/schemas/auth-schemas";
import { isTrusted } from "@src/utils/common";
import { useMutation } from "@tanstack/react-query";
import {
    useRef,
    type ChangeEvent,
    type KeyboardEventHandler,
    type MouseEventHandler,
    type PointerEventHandler
} from "react";
import { useNavigate } from "react-router";


export const useLogin = () => {
    const navigate = useNavigate();
    const showToast = useToastContext();
    const dispatch = useAppDispatch();

    const {
        email,
        password,
        emailError,
        isPasswordVisible
    } = useAppSelector(selectLoginState);

    const inputRefs = useRef<{
        emailRef: HTMLInputElement | null,
        passwordRef: HTMLInputElement | null,
    }>({
        emailRef: null,
        passwordRef: null,
    });


    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: loginHandler,
        onSuccess: async (res) => {
            if (res.status === 200) {
                dispatch(resetForm());
                await navigate(appRoutes.user.absolute);
            } else if (res.status === 400) {
                showToast({ text: "Invalid Email or Password." });
            } else {
                showToast({ text: "Server Error." });
            }
        },
        onError: () => {
            showToast({ text: "Network Error." });
        },
    });

    const formLoginHandler = () => {
        login({ email, password });
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        if (isTrusted(e) === false || e.target.tagName !== "INPUT") return;

        const { name, value } = e.target;
        if (name === "email") {
            dispatch(setEmail(value));

            const emailSchema = loginSchema.shape.email;
            const result = emailSchema.safeParse(value);

            dispatch(setEmailError(result.success === true ? "" : result.error.issues[0].message));
        }

        if (name === "password") {
            dispatch(setPassword(value));
        }
    };

    const handleLoginClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (isTrusted(e) === false || e.currentTarget.tagName !== "BUTTON") return;
        if (isLoading === true || email === "" || password === "" || emailError !== "") return;

        formLoginHandler();
    };

    const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter" || isTrusted(e) === false) return;

        if (e.currentTarget.name === "email") {
            if (email === "") return;
            inputRefs.current.passwordRef?.focus();
        }

        if (e.currentTarget.name === "password") {
            if (password === "") return;
            if (isLoading === true) return;
            formLoginHandler();
        }
    };

    const handleEyeClick: PointerEventHandler<HTMLButtonElement> = (e) => {
        if (isTrusted(e) === false || e.currentTarget.tagName !== "BUTTON") return;
        e.stopPropagation();
        dispatch(togglePasswordVisible());

        if (e.pointerType === "touch") return;

        setTimeout(() => {
            const input = inputRefs.current.passwordRef;
            if (input !== null) {
                input.focus();
                const len = input.value.length;
                input.setSelectionRange(len, len);
            }
        }, 0);
    };

    return {
        isLoading,
        email,
        password,
        emailError,
        isPasswordVisible,
        inputRefs,
        handleInputChange,
        handleLoginClick,
        handleEnter,
        handleEyeClick
    };
};