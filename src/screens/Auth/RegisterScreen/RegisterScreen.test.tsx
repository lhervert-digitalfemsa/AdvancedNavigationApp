import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { useForm } from '../../../hooks/useForm';

import { fetchData } from '../../../services/ApiService';

import { RegisterScreen } from './RegisterScreen';

const replaceMock = jest.fn();

jest.mock('../../../hooks/useForm', () => ({
  useForm: jest.fn().mockReturnValue({
    formValues: {
      username: '',
      password: '',
    },
    onChangeValue: jest.fn(),
    errors: {},
    setErrors: jest.fn(),
    resetErrors: jest.fn(),
  }),
}));

jest.mock('../../../hooks/useSecureEntry', () => ({
  useSecureEntry: jest.fn().mockReturnValue({
    secureTextEntry: false,
    renderIcon: jest.fn(),
  }),
}));

jest.mock('../../../services/ApiService', () => ({
  fetchData: jest.fn(),
}));

describe('<RegisterScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const params = {
    navigation: {
      replace: replaceMock,
    },
    route: jest.fn(),
  } as any;

  const renderScreen = () =>
    render(
      <ApplicationProvider {...eva} theme={eva.dark}>
        <RegisterScreen {...params} />
      </ApplicationProvider>,
    );

  it('should render the screen', () => {
    const { getByTestId } = renderScreen();

    const screen = getByTestId('register-screen');

    expect(screen).toBeDefined();
  });

  it('should render inputs correctly', () => {
    const { getByTestId } = renderScreen();

    const firstNameInput = getByTestId('@firstName-input/input');
    const lastNameInput = getByTestId('@lastName-input/input');
    const emailInput = getByTestId('@email-input/input');
    const usernameInput = getByTestId('@username-input/input');
    const passwordInput = getByTestId('@password-input/input');

    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('should render buttons correctly', () => {
    const { getByTestId } = renderScreen();

    const registerBtn = getByTestId('register-btn');
    const loginBtn = getByTestId('login-btn');

    expect(registerBtn).toBeDefined();
    expect(loginBtn).toBeDefined();
  });

  it('should handle register action', async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce({
      id: 1,
    });

    (useForm as jest.Mock).mockReturnValueOnce({
      formValues: {
        username: 'fake-username',
        password: 'fake-password',
        email: 'fake@email.com',
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
      },
      resetErrors: jest.fn(),
    });

    const { getByTestId } = renderScreen();

    const registerBtn = getByTestId('register-btn');

    fireEvent.press(registerBtn);

    expect(fetchData).toHaveBeenCalledWith(
      'https://fakestoreapi.com/users',
      {
        username: 'fake-username',
        password: 'fake-password',
        email: 'fake@email.com',
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
      },
      'POST',
    );

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('Login');
    });
  });

  it('should go to login screen', () => {
    const { getByTestId } = renderScreen();

    const loginBtn = getByTestId('login-btn');

    expect(loginBtn).toBeDefined();

    fireEvent.press(loginBtn);

    expect(replaceMock).toHaveBeenCalledWith('Login');
  });
});
