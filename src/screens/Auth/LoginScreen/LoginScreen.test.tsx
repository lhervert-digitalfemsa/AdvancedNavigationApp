import React from 'react';
import { fireEvent, render } from '../../../utils/test-utils';

import { useForm } from '../../../hooks/useForm';

import { fetchData } from '../../../services/ApiService';

import { LoginScreen } from './LoginScreen';

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

describe('<LoginScreen />', () => {
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
      <LoginScreen {...params} />
    );

  it('should render the screen', () => {
    const { getByTestId } = renderScreen();

    const screen = getByTestId('login-screen');

    expect(screen).toBeDefined();
  });

  it('should render inputs correctly', () => {
    const { getByTestId } = renderScreen();

    const usernameInput = getByTestId('@username-input/input');
    const passwordInput = getByTestId('@password-input/input');

    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('should render buttons correctly', () => {
    const { getByTestId } = renderScreen();

    const loginBtn = getByTestId('login-btn');
    const signoutBtn = getByTestId('signout-btn');

    expect(loginBtn).toBeDefined();
    expect(signoutBtn).toBeDefined();
  });

  it('should save token', () => {
    (fetchData as jest.Mock).mockResolvedValueOnce({
      token: 'fake-token',
    });

    (useForm as jest.Mock).mockReturnValueOnce({
      formValues: {
        username: 'fake-username',
        password: 'fake-password',
      },
      resetErrors: jest.fn(),
    });

    const { getByTestId } = renderScreen();

    const loginBtn = getByTestId('login-btn');

    fireEvent.press(loginBtn);

    expect(fetchData).toHaveBeenCalledWith(
      'https://fakestoreapi.com/auth/login',
      {
        username: 'fake-username',
        password: 'fake-password',
      },
      'POST',
    );
  });

  it('should go to register screen', () => {
    const { getByTestId } = renderScreen();

    const signoutBtn = getByTestId('signout-btn');

    expect(signoutBtn).toBeDefined();

    fireEvent.press(signoutBtn);

    expect(replaceMock).toHaveBeenCalledWith('Register');
  });
});
