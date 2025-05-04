

export const LoginForm = () => {
    return (
        <>
            <label htmlFor="loginEmail">Email</label>
            <input
                type="email"
                name="email"
                id="loginEmail"
                autoComplete="loginEmail" />

            <label htmlFor="loginPassword">Password</label>
            <input
                type="password"
                name="password"
                id="loginPassword"
                autoComplete="loginPassword" />

            <button
                value={"forgot"}
                className="self-start text-sm text-gray-800 bg-none hover:underline"
            >Forgot Password</button>

            <button
                type="submit"
                value={"login"}
            >Login</button>
        </>
    );
};