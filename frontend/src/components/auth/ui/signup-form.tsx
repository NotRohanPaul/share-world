import { AppIcons } from "@src/assets/icons";
import { useSignup } from "../hooks/useSignup";
import { AnimatePresence, motion } from "motion/react";

const AnimatedErrorParagarph = ({ text, type }: { text: string, type: "name" | "email" | "password" | "confirmPassword"; }) => {
    return <AnimatePresence mode="wait">
        {text !== '' && (
            <motion.p
                key={type}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="input-error"
            >
                {text}
            </motion.p>
        )}
    </AnimatePresence>;
};

export const SignupForm = () => {
    const {
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
    } = useSignup();

    return (
        <>
            <label htmlFor="signup-name">
                Name
            </label>
            <input
                autoFocus={true}
                type="text"
                name="name"
                id="signup-name"
                autoComplete="off"
                placeholder="John Doe"
                value={name}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.nameRef = elem; }}
            />
            <AnimatedErrorParagarph text={inputErrors.name} type="name" />

            <label htmlFor="signup-email">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="signup-email"
                autoComplete="off"
                placeholder="hello@example.com"
                value={email}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.emailRef = elem; }}
            />
            <AnimatedErrorParagarph text={inputErrors.email} type="email" />

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
                    value={password}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    ref={(elem) => { inputRefs.current.passwordRef = elem; }}
                />

                <button
                    className="password-visibility-btn"
                    title={isPasswordVisible ? "Hide Password" : "Show Password"}
                    aria-label="Toggle password visibility"
                    name="password-eye-btn"
                    onPointerDown={handleEyeClick}
                    type="button"
                >
                    {isPasswordVisible ?
                        <AppIcons.EyeOff width={10} height={10} />
                        :
                        <AppIcons.EyeIcon width={10} height={10} />
                    }
                </button>
            </div>
            <AnimatedErrorParagarph text={inputErrors.password} type="password" />

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
                    value={confirmPassword}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    ref={(elem) => { inputRefs.current.confirmPasswordRef = elem; }}
                />
                <button
                    className="password-visibility-btn"
                    title={isConfirmPasswordVisible ? "Hide Password" : "Show Password"}
                    aria-label="Toggle password visibility"
                    name="confirm-password-eye-btn"
                    onPointerDown={handleEyeClick}
                    type="button"
                >
                    {isConfirmPasswordVisible ?
                        <AppIcons.EyeOff width={10} height={10} />
                        :
                        <AppIcons.EyeIcon width={10} height={10} />
                    }
                </button>
            </div>
            <AnimatedErrorParagarph text={inputErrors.confirmPassword} type="confirmPassword" />

            <button
                type="button"
                className="submit-btn"
                value="signup"
                onClick={handleSignupClick}
            >
                {isLoading === false ?
                    "Signup" :
                    <AppIcons.Loader />
                }
            </button>
        </>
    );
};
