import { AuthForm } from "@src/components/auth/layout/auth-form";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { ToastsProvider } from "@src/components/common/ui/toast/context/toasts-provider";

describe("test the render of AuthForm UI", () => {
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

  it("renders signup inputs and button when authType is signup", () => {
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
});
