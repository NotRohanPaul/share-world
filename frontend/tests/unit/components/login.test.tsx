import { LoginForm } from '@src/components/auth/login/login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

// inside your test

vi.mock('./hooks/useLogin', () => ({
    useLogin: () => {
        console.log('✅ MOCK useLogin used');
        return {
            loginFormData: { email: 'mock@test.com', password: 'mockpass' },
            loginError: '',
            emailInputError: '',
            isPasswordVisible: false,
            inputRefs: { current: {} },
            handleInputChange: vi.fn(),
            handleLoginClick: vi.fn(),
            handleEnter: vi.fn(),
            handleEyeClick: vi.fn(),
        };
    }
}));

describe('LoginForm', () => {
    it.only('should fill inputs and click login button', async () => {
        const { container } = render(<MemoryRouter>
            <LoginForm />
        </MemoryRouter>);

        const emailInput = container.querySelector("#login-email")!;
        const passwordInput = container.querySelector("#login-password")!;
        // const loginButton = screen.getByRole('button', { name: /login/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'mypassword');
        // fireEvent.click(loginButton);
        screen.debug();
        expect((emailInput as HTMLInputElement).value).toBe('test1@test.com');
        expect((passwordInput as HTMLInputElement).value).toBe('Test@123');

    });
});
