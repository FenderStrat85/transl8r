import { fireEvent, render, screen, act } from '@testing-library/react';
import apiService from '../../services/apiService';
import RegisterForm from './RegisterForm';
import userEvent from '@testing-library/user-event';

describe('Register form', () => {
  const customerCredentials = {
    firstName: 'customer',
    lastName: 'test',
    email: 'customer@customer.com',
    password: '123',
    role: 'customer',
  };
  const translatorCredentials = {
    firstName: 'translator',
    lastName: 'test',
    email: 'translator@translator.com',
    password: '123',
    role: 'translator',
    languages: [],
  };

  test('Form should render correctly', () => {
    render(<RegisterForm />);
    screen.getByPlaceholderText(/first name/);
    screen.getByPlaceholderText(/last name/);
    screen.getByPlaceholderText(/email/);
    screen.getByPlaceholderText(/password/);
  });
  //Customer Tests
  test('If the user selects they are a customer, the multiselect should not appear', () => {
    render(<RegisterForm />);
    const radioButtonCustomer = screen.getByTestId(
      'contactChoice1',
    ) as HTMLInputElement;

    //selecting the radio button through fireEvent
    fireEvent.click(radioButtonCustomer, { target: { checked: true } });

    //selecting the radio button through userEvent
    //userEvent.click(radioButtonTranslator);

    expect(radioButtonCustomer.checked);
    const text = screen.queryByText(/Which languages do you speak?/);
    expect(text).toBeNull();
  });
  test('When a customer registers, apiService.register is called with the correct credentials', () => {
    const spyRegister = jest.spyOn(apiService, 'register');

    render(<RegisterForm />);
    const firstNameInput = screen.getByPlaceholderText(/first/);
    const lastNameInput = screen.getByPlaceholderText(/last name/);
    const emailInput = screen.getByPlaceholderText(/email/);
    const passwordInput = screen.getByPlaceholderText(/password/);
    const radioButtonCustomer = screen.getByTestId(
      'contactChoice1',
    ) as HTMLInputElement;
    fireEvent.click(radioButtonCustomer, { target: { checked: true } });

    const submitButton = screen.getByRole('button', { name: 'Register' });

    userEvent.type(firstNameInput, 'customer');
    userEvent.type(lastNameInput, 'test');
    userEvent.type(emailInput, 'customer@customer.com');
    userEvent.type(passwordInput, '123');
    userEvent.click(submitButton);

    expect(spyRegister).toHaveBeenCalledWith(customerCredentials);
    expect(spyRegister).toHaveBeenCalledTimes(1);
  });

  //Translator Tests
  test('If the user selects they are a translator, the multiselect should appear', () => {
    render(<RegisterForm />);
    const radioButtonTranslator = screen.getByTestId(
      'contactChoice2',
    ) as HTMLInputElement;

    //selecting the radio button through fireEvent
    fireEvent.click(radioButtonTranslator, { target: { checked: true } });

    //selecting the radio button through userEvent
    //userEvent.click(radioButtonTranslator);

    expect(radioButtonTranslator.checked);
    screen.getByText(/Which languages do you speak?/);
  });

  test('If the user selects a language from the multi-select, the value should be submitted',
    () => {
      render(<RegisterForm />);
      const radioButtonTranslator = screen.getByTestId(
        'contactChoice2',
      ) as HTMLInputElement;

      //selecting the radio button through fireEvent
      fireEvent.click(radioButtonTranslator, { target: { checked: true } });

      // The text that is rendered inside of the multi-select
      const multiSelect = screen.getByText(/Select.../);

      // This opens the multi select menu
      fireEvent.click(multiSelect);
      const option = screen.getByText('Select All');

      userEvent.click(option);

    });


  test('If the user selects they are a translator, apiService.register is called with the correct credentials', () => {
    const spyRegister = jest.spyOn(apiService, 'register');

    render(<RegisterForm />);
    const radioButtonTranslator = screen.getByTestId(
      'contactChoice2',
    ) as HTMLInputElement;
    fireEvent.click(radioButtonTranslator, { target: { checked: true } });

    const firstNameInput = screen.getByPlaceholderText(/first/);
    const lastNameInput = screen.getByPlaceholderText(/last name/);
    const emailInput = screen.getByPlaceholderText(/email/);
    const passwordInput = screen.getByPlaceholderText(/password/);

    const submitButton = screen.getByRole('button', { name: 'Register' });

    userEvent.type(firstNameInput, 'translator');
    userEvent.type(lastNameInput, 'test');
    userEvent.type(emailInput, 'translator@translator.com');
    userEvent.type(passwordInput, '123');
    userEvent.click(submitButton);

    expect(spyRegister).toHaveBeenCalledWith(translatorCredentials);
    expect(spyRegister).toHaveBeenCalledTimes(1);
  });
});
