import React from "react";
import { fireEvent, render } from '../../utils/test-utils';
import type { RouteProp } from '@react-navigation/native';

import { DetailScreen } from "./DetailScreen";

describe('DetailScreen', () => {
  const params = {
    route: {
      params: {
        productId: 1,
      }
    }
  } as any;

  const renderWithContext = () => {
    return render(<DetailScreen {...params} />);
  };

  it('renders the product correctly', () => {
    const { getByText } = renderWithContext();
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('A red apple')).toBeTruthy();
    expect(getByText('$1')).toBeTruthy();
  });

});