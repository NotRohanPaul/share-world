import { AuthForm } from "@src/components/auth/auth-form";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";

describe('AuthForm UI', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders login inputs and button when authType is "login"', () => {
    render(
      <MemoryRouter>
        <AuthForm authType="login" />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/^Email$/))
      .toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Login$/ }))
      .toBeInTheDocument();
  });

  it('renders signup inputs and button when authType is "signup"', () => {
    render(
      <MemoryRouter>
        <AuthForm authType="signup" />
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
    expect(screen.getByRole('button', { name: /^SignUp$/ }))
      .toBeInTheDocument();
  });
});
