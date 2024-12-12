import React from "react";
import { render } from "../../../utils/test-utils";

import Product from "./Product.component";

const productMock = {
  id: 1,
  title: 'Apple',
  description: 'A red apple',
  price: 1,
}

describe('Product', () => {

  const renderWithContext = () => {
    return render(<Product {...productMock} />);
  };

  it('renders correctly', () => {
    const { getByText } = renderWithContext();
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('$1')).toBeTruthy();
    expect(getByText('Add to cart')).toBeTruthy();
  });

});