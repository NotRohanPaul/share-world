import { it } from "vitest";

it("hello",()=>{})
/* import { loginHandler } from '@src/axios/handlers/auth-handler';
import { LoginForm } from '@src/components/auth/login/login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});



const mockedLoginHandler = vi.mocked(loginHandler);


describe('LoginForm Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should allow typing and call loginHandler on login button click', async () => {
     mockedLoginHandler.mockResolvedValue({ status: 200 });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Test@123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('Test@123');

    await userEvent.click(loginButton);

    expect(loginHandler).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Test@123',
    });

    expect(mockNavigate).toHaveBeenCalledWith('/user'); // match your appRoutes.user path
  });
});
 */