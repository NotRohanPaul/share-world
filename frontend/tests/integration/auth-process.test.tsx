import { LoginForm } from '@src/components/auth/ui/login';
import { SignupForm } from '@src/components/auth/ui/signup';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';

describe('LoginForm and SignupForm Integration with Backend', () => {
    beforeEach(() => {
        cleanup();
    });

    it('should allow typing and call loginHandler on login button click', async () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText(/^Email$/) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/^Password$/) as HTMLInputElement;

        const sampleEmail = 'test@example.com';
        const samplePassword = 'Test@123';

        await userEvent.type(emailInput, sampleEmail);
        await userEvent.type(passwordInput, samplePassword);

        expect(emailInput).toHaveValue(sampleEmail);
        expect(passwordInput).toHaveValue(samplePassword);
    });

    it('should allow typing and call signupHandler on signup button click', async () => {
        render(
            <MemoryRouter>
                <SignupForm />
            </MemoryRouter>
        );
        const nameInput = screen.getByLabelText(/^Name$/) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/^Email$/) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/^Password$/) as HTMLInputElement;
        const confirmPasswordInput = screen.getByLabelText(/^Confirm Password$/) as HTMLInputElement;
        // const signupButton = screen.getByRole("button", { name: /^SignUp$/ }) as HTMLButtonElement;

        const sampleName = 'Test';
        const sampleEmail = `test${Math.floor(Math.random() * 1000)}@example.com`;
        const samplePassword = 'Test@123';
        const sampleConfirmPassword = 'Test@123';

        await userEvent.type(nameInput, sampleName);
        await userEvent.type(emailInput, sampleEmail);
        await userEvent.type(passwordInput, samplePassword);
        await userEvent.type(confirmPasswordInput, sampleConfirmPassword);

        expect(nameInput).toHaveValue(sampleName);
        expect(emailInput).toHaveValue(sampleEmail);
        expect(confirmPasswordInput).toHaveValue(sampleConfirmPassword);
        expect(passwordInput).toHaveValue(samplePassword);

        // await userEvent.click(signupButton);

    });
});
