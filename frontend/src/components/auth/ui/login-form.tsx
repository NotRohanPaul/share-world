import { AppIcons } from "@src/assets";
import { useLogin } from "../hooks/useLogin";


export const LoginForm = () => {
    const {
        isLoading,
        loginFormData,
        loginError,
        emailInputError,
        isPasswordVisible,
        inputRefs,
        handleInputChange,
        handleLoginClick,
        handleEnter,
        handleEyeClick
    } = useLogin();

    return (
        <>
            {loginError === '' ? null : <p className="input-error text-center">{loginError}</p>}
            <label htmlFor="login-email">Email</label>
            <input
                type="email"
                name="email"
                id="login-email"
                autoComplete="email"
                placeholder="hello@example.com"
                value={loginFormData.email}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={(elem) => { inputRefs.current.emailRef = elem; }}
            />
            {emailInputError !== '' ? <p className="input-error">{emailInputError}</p> : null}

            <label htmlFor="login-password">Password</label>
            <div className="relative">
                <input
                    className="w-full pr-8"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="login-password"
                    autoComplete="current-password"
                    value={loginFormData.password}
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