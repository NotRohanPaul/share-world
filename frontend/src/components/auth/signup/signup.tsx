

export const SignupForm = () => {
    return (
        <>
            <label htmlFor="signupName">Name</label>
            <input type="text" name="name" id="signupName" autoComplete="signupName" />

            <label htmlFor="signupEmail">Email</label>
            <input type="email" name="email" id="signupEmail" autoComplete="signupEmail" />

            <label htmlFor="signupPassword">Password</label>
            <input type="password" name="password" id="signupPassword" autoComplete="signupPassword" />

            <label htmlFor="signupConfirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="signupConfirmPassword" autoComplete="signupConfirmPassword" />

            <button type="submit" value={"signup"}>SignUp</button>
        </>
    );
};
