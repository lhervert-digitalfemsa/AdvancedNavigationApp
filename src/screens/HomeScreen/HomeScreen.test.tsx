import React from "react";
import { render } from '../../utils/test-utils';

import { HomeScreen } from "./HomeScreen";

describe('HomeScreen', () => {
  const renderWithContext = () => {
    return render(<HomeScreen />);
  };

  it('renders correctly', () => {
    const { getByText } = renderWithContext();
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Cherry')).toBeTruthy();
  });

});