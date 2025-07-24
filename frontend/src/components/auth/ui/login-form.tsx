import { AppIcons } from "@src/assets/icons";
import { useLogin } from "../hooks/useLogin";
import { AnimatePresence, motion } from "motion/react";


export const LoginForm = () => {
    const {
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
    } = useLogin();

    return (
        <>
            <label htmlFor="login-email">Email</label>
            <input
                autoFocus={true}
                type="email"
                name="email"
                id="login-email"
                autoComplete="email"
                placeholder="hello@example.com"
                value={email}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.emailRef = elem; }}
            />
            <AnimatePresence mode="wait">
                {emailError !== '' && (
                    <motion.p
                        key="email-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="input-error"
                    >
                        {emailError}
                    </motion.p>
                )}
            </AnimatePresence>


            <label htmlFor="login-password">Password</label>
            <div className="relative">
                <input
                    className="w-full pr-8"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="login-password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleInputChange}
                    onKeyDown={handleEnter}
                    ref={(elem) => { inputRefs.current.passwordRef = elem; }}
                />

                <button
                    className="password-visibility-btn"
                    title={isPasswordVisible ? "Hide Password" : "Show Password"}
                    aria-label="Toggle password visibility"
                    type="button"
                    onPointerDown={handleEyeClick}
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
                {
                    isLoading === false ?
                        "Login" :
                        <AppIcons.Loader />
                }
            </button>

        </>
    );
};