import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { LoginScreen } from './LoginScreen';

const navigateMock = jest.fn();

describe('<LoginScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  const params = {
    navigation: {
      navigate: navigateMock,
    }
    route: jest.fn(),
  }

  const renderScreen = () =>
    render(
      <ApplicationProvider {...eva} theme={eva.dark}>
        <LoginScreen {...params} />
      </ApplicationProvider>,
    );

  it('should render the screen', () => {
    const { getByTestId } = renderScreen();

    const screen = getByTestId('login-screen');

    expect(screen).toBeDefined();
  });

  it('should render inputs correctly', () => {
    const { getByTestId } = renderScreen();

    const usernameInput = getByTestId('username-input');
    const passwordInput = getByTestId('password-input');
    const secureTouchable = getByTestId('secure-touchable');

    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(secureTouchable).toBeDefined();
  });

  it('should render buttons correctly', () => {
    const { getByTestId } = renderScreen();

    const loginBtn = getByTestId('login-btn');
    const signoutBtn = getByTestId('signout-btn');

    expect(loginBtn).toBeDefined();
    expect(signoutBtn).toBeDefined();
  });

  it('should go to register screen', () => {
    const { getByTestId } = renderScreen();

    const signoutBtn = getByTestId('signout-btn');

    expect(signoutBtn).toBeDefined();

    fireEvent.press(signoutBtn);

    expect(navigateMock).toHaveBeenCalledWith('Register');
  });
});