import { DialogBoxProvider } from "@src/components/common/ui/dialog-box/context/dialog-box-provider";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import { UserNavbarMenu } from "@src/components/user/layout/user-navbar-menu";
import { QueryProvider } from "@src/providers/library/query-provider";
import { authActions } from "@src/redux/slices/auth";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter, Route, Routes } from "react-router";
import { TEST_ORIGIN } from "tests/config/constants/common";
import { renderWithReduxProviders } from "tests/config/utils/render-with-redux-provider";
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
} from "vitest";

const HTTP_ENDPOINT = TEST_ORIGIN + "/api/v1/auth/logout";

const menuRef = { current: null as HTMLDivElement | null };

const renderMenu = () =>
    renderWithReduxProviders(
        <QueryProvider>
            <DialogBoxProvider>
                <ToastsProvider>
                    <MemoryRouter initialEntries={["/"]}>
                        <Routes>
                            <Route
                                path="/"
                                element={<UserNavbarMenu menuRef={menuRef} setIsMenuVisible={() => { }} />}
                            />
                            <Route path="/login" element={<div>Login Page</div>} />
                        </Routes>
                    </MemoryRouter>
                </ToastsProvider>
            </DialogBoxProvider>
        </QueryProvider>
    );

const mockServer = setupServer();

const setupLogoutHandler = (statusCode: number, responseDelayMs = 500) => {
    mockServer.use(
        http.get(HTTP_ENDPOINT, async () => {
            await delay(responseDelayMs);
            return new HttpResponse(null, { status: statusCode });
        })
    );
};

const runLogoutTest = async (statusCode: number) => {
    setupLogoutHandler(statusCode);

    const { store } = renderMenu();
    store.dispatch(authActions.user.setNameAndEmail({
        name: "Test",
        email: "test@test.com"
    }));

    const logoutBtn = screen.getByRole("button", { name: /^Logout$/ });
    expect(logoutBtn).toBeInTheDocument();

    await userEvent.click(logoutBtn);

    const logoutDialog = await screen.findByText("Logging Out");
    expect(logoutDialog).toBeInTheDocument();

    const logoutAbortBtn = screen.getByRole("button", { name: /^Abort$/ });
    expect(logoutAbortBtn).toBeInTheDocument();

    expect(await screen.findByText(/login page/i)).toBeInTheDocument();
};

describe("Logout button behavior", () => {
    beforeAll(() => mockServer.listen());
    afterEach(() => {
        mockServer.resetHandlers();
        cleanup();
    });
    afterAll(() => mockServer.close());

    it("renders logout button and navigates to login page direcly if the user is guest", async () => {
        renderMenu();

        const logoutBtn = screen.getByRole("button", { name: /^Logout$/ });
        expect(logoutBtn).toBeInTheDocument();

        await userEvent.click(logoutBtn);
        expect(await screen.findByText(/login page/i)).toBeInTheDocument();
    });

    it("renders logout button and handles 200 response correctly", async () => {
        await runLogoutTest(200);
    });

    it("renders logout button and handles 304 response correctly", async () => {
        await runLogoutTest(304);
    });
});
