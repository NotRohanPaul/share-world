import { AuthForm } from "@src/components/auth/layout/auth-form";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import { QueryProvider } from "@src/providers/library/query-provider";
import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter, Route, Routes } from "react-router";
import { TEST_ORIGIN } from "tests/config/constants/common";
import { renderWithReduxProviders } from "tests/config/utils/render-with-redux-provider";
import {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it
} from "vitest";

const HTTP_ENDPOINT = TEST_ORIGIN + "/api/v1/auth/signup";

const sampleInputs = {
    name: "Test",
    email: "test@test.com",
    password: "Test@123",
    confirmPassword: "Test@123"
};

const renderSignupForm = () => renderWithReduxProviders(
    <QueryProvider>
        <ToastsProvider>
            <MemoryRouter initialEntries={["/signup"]}>
                <Routes>
                    <Route path="/signup" element={<AuthForm authType="signup" />} />
                    <Route path="/user" element={<h1>User Page</h1>} />
                </Routes>
            </MemoryRouter >
        </ToastsProvider>
    </QueryProvider>
);

const fillSignupForm = async () => {
    const nameInput = screen.getByLabelText(/^Name$/);
    const emailInput = screen.getByLabelText(/^Email$/);
    const passwordInput = screen.getByLabelText(/^Password$/);
    const confirmPasswordInput = screen.getByLabelText(/^Confirm Password$/);
    const signupButton = screen.getByRole("button", { name: /^Signup$/ });

    await userEvent.type(nameInput, sampleInputs.name);
    await userEvent.type(emailInput, sampleInputs.email);
    await userEvent.type(passwordInput, sampleInputs.password);
    await userEvent.type(confirmPasswordInput, sampleInputs.confirmPassword);

    expect(nameInput).toHaveValue(sampleInputs.name);
    expect(emailInput).toHaveValue(sampleInputs.email);
    expect(passwordInput).toHaveValue(sampleInputs.password);
    expect(confirmPasswordInput).toHaveValue(sampleInputs.confirmPassword);

    await userEvent.click(signupButton);
};


describe("SignupForm Integration with API", () => {
    const mockServer = setupServer();

    beforeEach(() => cleanup());
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close());

    it("navigates to user page after successful signup", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return HttpResponse.json({
                    name: "Test",
                    email: "test@test.com"
                }, { status: 201 });
            }),
        );

        renderSignupForm();
        await fillSignupForm();
        expect(await screen.findByText(/User Page/i)).toBeInTheDocument();
    });

    it("shows toasts for invalid email or password", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return new HttpResponse(null, { status: 400 });
            }),
        );
        renderSignupForm();
        await fillSignupForm();
        await waitFor(() =>
            expect(screen.getByText(/invalid inputs/i)).toBeInTheDocument()
        );
    });

    it("shows toast for server error", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return new HttpResponse(null, { status: 500 });
            }),
        );
        renderSignupForm();
        await fillSignupForm();
        await waitFor(() =>
            expect(screen.getByText(/server error/i)).toBeInTheDocument()
        );
    });

    it("shows toast for network error", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return HttpResponse.error();
            })
        );
        renderSignupForm();
        await fillSignupForm();
        await waitFor(() =>
            expect(screen.getByText(/network error/i)).toBeInTheDocument()
        );
    });
});
