import React from "react";
import { render } from '../../utils/test-utils';

import { SettingsScreen } from "./SettingsScreen";

describe('SettingsScreen', () => {

  const renderWithContext = () => {
    return render(<SettingsScreen />);
  };

  it('renders correctly', () => {
    const { getByText } = renderWithContext();
    expect(getByText('Dark Mode')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Address book')).toBeTruthy();
    expect(getByText('Manage account')).toBeTruthy();
    expect(getByText('Location')).toBeTruthy();
    expect(getByText('Currency')).toBeTruthy();
    expect(getByText('Language')).toBeTruthy();
    expect(getByText('Notifications')).toBeTruthy();
    expect(getByText('Privacy')).toBeTruthy();
    expect(getByText('Security')).toBeTruthy();
    expect(getByText('Switch account')).toBeTruthy();
    expect(getByText('SIGN OUT')).toBeTruthy();
  });

});