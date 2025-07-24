import { AuthForm } from "@src/components/auth/layout/auth-form";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import { QueryProvider } from "@src/providers/library/query-provider";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { renderWithReduxProviders } from "tests/config/utils/render-with-redux-provider";
import { beforeEach, describe, expect, it } from "vitest";


const renderSignup = () => renderWithReduxProviders(
  <QueryProvider>
    <ToastsProvider>
      <MemoryRouter>
        <AuthForm authType="signup" />
      </MemoryRouter>
    </ToastsProvider>
  </QueryProvider>
);



describe("to render signup form and test its input", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders signup inputs and button in the form", () => {
    renderSignup();
    const nameInput = screen.getByLabelText(/^Name$/);
    const emailInput = screen.getByLabelText(/^Email$/);
    const passwordInput = screen.getByLabelText(/^Password$/);
    const confirmPasswordInput = screen.getByLabelText(/^Confirm Password$/);
    const signupButton = screen.getByRole("button", { name: /^Signup$/ });

    expect(nameInput)
      .toBeInTheDocument();
    expect(emailInput)
      .toBeInTheDocument();
    expect(passwordInput)
      .toBeInTheDocument();
    expect(confirmPasswordInput)
      .toBeInTheDocument();
    expect(signupButton)
      .toBeInTheDocument();
  });

  it("typing in the inputs in the form", async () => {
    renderSignup();
    const nameInput = screen.getByLabelText(/^Name$/);
    const emailInput = screen.getByLabelText(/^Email$/);
    const passwordInput = screen.getByLabelText(/^Password$/);
    const confirmPasswordInput = screen.getByLabelText(/^Confirm Password$/);

    const sampleName = "Test";
    const sampleEmail = `test${Math.floor(Math.random() * 1000)}@example.com`;
    const samplePassword = "Test@123";
    const sampleConfirmPassword = "Test@123";

    await userEvent.type(nameInput, sampleName);
    await userEvent.type(emailInput, sampleEmail);
    await userEvent.type(passwordInput, samplePassword);
    await userEvent.type(confirmPasswordInput, sampleConfirmPassword);

    expect(nameInput).toHaveValue(sampleName);
    expect(emailInput).toHaveValue(sampleEmail);
    expect(confirmPasswordInput).toHaveValue(sampleConfirmPassword);
    expect(passwordInput).toHaveValue(samplePassword);

  });
});
