import { LoginForm } from "@src/components/auth/login/login";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, it } from "vitest";


it("should have hello world", () => {
    render(<MemoryRouter>
        <LoginForm />
    </MemoryRouter>);
  const button = screen.getByRole('button', { name: /login/i });
  expect(button).toBeEnabled();
});