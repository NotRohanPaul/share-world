import { AppIcons } from "@src/assets";
import { useSignup } from "./hooks/useSignup";


export const SignupForm = () => {
    const {
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
    } = useSignup();

    return (
        <>
            {signupError === '' ? null : <p className="input-error text-center">{signupError}</p>}
            <label htmlFor="signup-name">
                Name
            </label>
            <input
                type="text"
                name="name"
                id="signup-name"
                autoComplete="off"
                placeholder="John Doe"
                value={signupFormData.name}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.nameRef = elem; }}
            />
            {inputErrors.name !== '' ? <p className="input-error">{inputErrors.name}</p> : null}

            <label htmlFor="signup-email">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="signup-email"
                autoComplete="off"
                placeholder="hello@example.com"
                value={signupFormData.email}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.emailRef = elem; }}
            />
            {inputErrors.email !== '' ? <p className="input-error">{inputErrors.email}</p> : null}

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
                    value={signupFormData.password}
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
            {inputErrors.password !== '' ? <p className="input-error">{inputErrors.password}</p> : null}

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
                    value={signupFormData.confirmPassword}
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
            {inputErrors.confirmPassword !== '' ? <p className="input-error">{inputErrors.confirmPassword}</p> : null}

            <button
                type="button"
                className="submit-btn"
                value="signup"
                onClick={handleSignupClick}
            >
                SignUp
            </button>
        </>
    );
};
