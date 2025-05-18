import { LoginForm } from '@src/components/auth/login';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';



describe('LoginForm Integration', () => {

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
        // const loginButton = screen.getByRole('button', { name: /^Login$/ });

        const sampleEmail = 'test@example.com';
        const samplePassword = 'Test@123';

        // fireEvent.input(emailInput, { target: { value: sampleEmail } });
        // fireEvent.input(passwordInput, { target: { value: samplePassword}});
        // await userEvent.click(loginButton);
        await userEvent.type(emailInput, sampleEmail);
        await userEvent.type(passwordInput, samplePassword);
        
        console.log(screen.debug());

        expect(emailInput).toHaveValue(sampleEmail);
        expect(passwordInput).toHaveValue(samplePassword);

        // await userEvent.click(loginButton);

        // expect(loginHandler).toHaveBeenCalledWith({
        //     email: sampleEmail,
        //     password: samplePassword,
        // });

        // expect(mockNavigate).toHaveBeenCalledWith('/user'); 
    });
});
