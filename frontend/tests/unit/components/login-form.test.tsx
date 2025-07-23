import { AuthForm } from "@src/components/auth/layout/auth-form";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import { QueryProvider } from "@src/providers/query-provider";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { renderWithProviders } from "tests/config/utils/render-with-redux-provider";
import { beforeEach, describe, expect, it } from "vitest";

const renderLogin = () => renderWithProviders(
  <QueryProvider>
    <ToastsProvider>
      <MemoryRouter>
        <AuthForm authType="login" />
      </MemoryRouter>
    </ToastsProvider>
  </QueryProvider>
);


describe("to render login form and check its inputs", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders login inputs and button when authType is login", () => {
    renderLogin();
    const emailInput = screen.getByLabelText(/^Email$/);
    const passwordInput = screen.getByLabelText(/^Password$/);
    const loginBtn = screen.getByRole("button", { name: /^Login$/ });

    expect(emailInput)
      .toBeInTheDocument();
    expect(passwordInput)
      .toBeInTheDocument();
    expect(loginBtn)
      .toBeInTheDocument();
  });

  it("typing in the inputs in the form", async () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/^Email$/);
    const passwordInput = screen.getByLabelText(/^Password$/);

    const sampleEmail = "test@example.com";
    const samplePassword = "Test@123";

    await userEvent.type(emailInput, sampleEmail);
    await userEvent.type(passwordInput, samplePassword);

    expect(emailInput).toHaveValue(sampleEmail);
    expect(passwordInput).toHaveValue(samplePassword);
  });
});
