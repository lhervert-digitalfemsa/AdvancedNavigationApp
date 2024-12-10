import React from 'react';
import { render } from '@testing-library/react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { RegisterScreen } from './RegisterScreen';

const navigateMock = jest.fn();

describe('<RegisterScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const params = {
    navigation: {
      navigate: navigateMock,
    }
    route: jest.fn(),
  }

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

    const firstNameInput = getByTestId('firstName-input');
    const lastNameInput = getByTestId('lastName-input');
    const emailInput = getByTestId('email-input');
    const usernameInput = getByTestId('username-input');
    const passwordInput = getByTestId('password-input');
    const secureTouchable = getByTestId('secure-touchable');

    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(secureTouchable).toBeDefined();
  });

  it('should render buttons correctly', () => {
    const { getByTestId } = renderScreen();

    const registerBtn = getByTestId('register-btn');
    const loginBtn = getByTestId('login-btn');

    expect(registerBtn).toBeDefined();
    expect(loginBtn).toBeDefined();
  });

  it('should go to login screen', () => {
    const { getByTestId } = renderScreen();

    const loginBtn = getByTestId('login-btn');

    expect(loginBtn).toBeDefined();

    fireEvent.press(loginBtn);

    expect(navigateMock).toHaveBeenCalledWith('Login');
  });
});