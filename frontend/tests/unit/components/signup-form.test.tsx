import { AuthForm } from "@src/components/auth/layout/auth-form";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import userEvent from "@testing-library/user-event";

describe("to render signup form and test its input", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders signup inputs and button in the form", () => {
    render(
      <MemoryRouter>
        <ToastsProvider>
          <AuthForm authType="signup" />
        </ToastsProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/^Name$/))
      .toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/))
      .toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/))
      .toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Password$/))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Signup$/ }))
      .toBeInTheDocument();
  });

  it("typing in the inputs in the form", async () => {
    render(
      <MemoryRouter>
        <ToastsProvider>
          <AuthForm authType="signup" />
        </ToastsProvider>
      </MemoryRouter>
    );
    const nameInput = screen.getByLabelText(/^Name$/) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/^Email$/) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^Password$/) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/^Confirm Password$/) as HTMLInputElement;

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
