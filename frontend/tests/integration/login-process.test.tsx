import { AuthForm } from "@src/components/auth/layout/auth-form";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import { QueryProvider } from "@src/providers/query-provider";
import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter, Route, Routes } from "react-router";
import { TEST_ORIGIN } from "tests/config/constants/common";
import { renderWithProviders } from "tests/config/utils/render-with-redux-provider";
import {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
} from "vitest";

const HTTP_ENDPOINT = TEST_ORIGIN + "/api/v1/auth/login";

const sampleInputs = {
    email: "test@test.com",
    password: "Test@123"
};

const renderLoginForm = () => renderWithProviders(
    <QueryProvider>
        <ToastsProvider>
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<AuthForm authType="login" />} />
                    <Route path="/user" element={<h1>User Page</h1>} />
                </Routes>
            </MemoryRouter >
        </ToastsProvider>
    </QueryProvider>
);

const fillLoginForm = async () => {
    const emailInputElm = screen.getByLabelText(/^Email$/);
    const passwordInputElm = screen.getByLabelText(/^Password$/);
    const loginBtnElm = screen.getByRole("button", { name: /^Login$/ });

    await userEvent.type(emailInputElm, sampleInputs.email);
    await userEvent.type(passwordInputElm, sampleInputs.password);
    expect(emailInputElm).toHaveValue(sampleInputs.email);
    expect(passwordInputElm).toHaveValue(sampleInputs.password);
    await userEvent.click(loginBtnElm);
};



describe("LoginForm Integration with API", () => {
    const mockServer = setupServer();
    beforeEach(() => cleanup());
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close());

    it("navigate to user page after successfull signup", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return HttpResponse.json({
                    name: "Test",
                    email: "test@test.com",
                });
            }),
        );

        renderLoginForm();
        await fillLoginForm();
        expect(await screen.findByText(/User Page/i)).toBeInTheDocument();
    });

    it("shows toasts for invalid email or password", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return new HttpResponse(null, { status: 400 });
            }),
        );
        renderLoginForm();
        await fillLoginForm();
        await waitFor(() =>
            expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
        );
    });

    it("shows toasts for server error", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return new HttpResponse(null, { status: 500 });
            }),
        );
        renderLoginForm();
        await fillLoginForm();
        await waitFor(() =>
            expect(screen.getByText(/server error/i)).toBeInTheDocument()
        );
    });

    it("shows toasts for network error", async () => {
        mockServer.use(
            http.post(HTTP_ENDPOINT, () => {
                return HttpResponse.error();
            })
        );

        renderLoginForm();
        await fillLoginForm();
        await waitFor(() =>
            expect(screen.getByText(/network error/i)).toBeInTheDocument()
        );
    });
});
