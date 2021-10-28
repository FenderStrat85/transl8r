import { render, screen } from '@testing-library/react';
import apiService from '../../services/apiService';
import LoginForm from './LoginForm';
import userEvent from '@testing-library/user-event';

describe('Login form', () => {
  const credentials = { email: 'test@test.com', password: '123' };

  test('Should render form correctly', () => {
    render(<LoginForm />);
    screen.getByPlaceholderText(/email/);
    screen.getByPlaceholderText(/password/);
  });
  test('Login button should pass correct credentials', () => {
    const spyLogin = jest.spyOn(apiService, 'login');
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email/);
    const passwordInput = screen.getByPlaceholderText(/password/);
    const submitButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123');

    userEvent.click(submitButton);
    //separating these into two separate tests caused unhandled promise rejections
    //currently unsure why, but both tests pass
    expect(spyLogin).toHaveBeenCalledWith(credentials);
    expect(spyLogin).toHaveBeenCalledTimes(1);
  });
});
