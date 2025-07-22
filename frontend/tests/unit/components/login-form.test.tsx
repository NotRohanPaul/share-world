import { AuthForm } from "@src/components/auth/layout/auth-form";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";
import userEvent from "@testing-library/user-event";

describe("to render login form and check its inputs", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders login inputs and button when authType is login", () => {
    render(
      <MemoryRouter>
        <ToastsProvider>
          <AuthForm authType="login" />
        </ToastsProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/^Email$/))
      .toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Login$/ }))
      .toBeInTheDocument();
  });

  it("typing in the inputs in the form", async () => {
    render(
      <MemoryRouter>
        <ToastsProvider>
          <AuthForm authType="login" />
        </ToastsProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/^Email$/) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^Password$/) as HTMLInputElement;

    const sampleEmail = "test@example.com";
    const samplePassword = "Test@123";

    await userEvent.type(emailInput, sampleEmail);
    await userEvent.type(passwordInput, samplePassword);

    expect(emailInput).toHaveValue(sampleEmail);
    expect(passwordInput).toHaveValue(samplePassword);
  });
});
