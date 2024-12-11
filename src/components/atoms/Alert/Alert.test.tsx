import React from 'react';
import { render } from '@testing-library/react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import Alert from './Alert';

describe('<Alert />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Alert text="Alert text" />
      </ApplicationProvider>,
    );

  it('should render correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Alert text')).not.toBeNull();
  });

  it('should hide after 3 seconds', () => {
    const { queryByText } = renderComponent();

    jest.advanceTimersByTime(3000);

    expect(queryByText('Alert text')).toBeNull();
  });
});
