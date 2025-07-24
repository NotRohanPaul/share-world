import { loginHandler } from "@src/axios/handlers/auth-handler";
import { useDebounce } from "@src/components/common/hooks/useDebounce";
import { useToastContext } from "@src/components/common/ui/toast/context/toasts-consumer";
import { useAppDispatch, useAppSelector } from "@src/redux/hook";
import { loginStateActions, selectLoginState } from "@src/redux/slices/auth/login-slice";
import { userStateActions } from "@src/redux/slices/auth/user-slice";
import { appRoutes } from "@src/routes/app-routes";
import { loginSchema, userDataSchema } from "@src/schemas/auth-schemas";
import { isTrusted } from "@src/utils/common";
import { useMutation } from "@tanstack/react-query";
import {
    useEffect,
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

    useEffect(() => {
        return () => {
            dispatch(loginStateActions.resetForm());
        };
    }, []);

    useDebounce(() => {
        if (email === "") {
            return void dispatch(loginStateActions.setEmailError(''));
        }
        const result = loginSchema.shape.email.safeParse(email);
        dispatch(loginStateActions.setEmailError(result.success === true ? '' : result.error.issues[0].message));
    }, [email], 600);


    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: loginHandler,
        onSuccess: async (res) => {
            if (res.status === 200) {
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
                showToast({ text: "Invalid email or password." });
            } else {
                showToast({ text: "Server error." });
            }
        },
        onError: () => {
            showToast({ text: "Network error." });
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
            dispatch(loginStateActions.setEmail(value));
        }

        if (name === "password") {
            dispatch(loginStateActions.setPassword(value));
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
        dispatch(loginStateActions.setIsPasswordVisible());

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