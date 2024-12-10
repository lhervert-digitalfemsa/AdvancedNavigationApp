import React from 'react';
import { render } from '@testing-library/react-native';
import ProductList from './ProductList.component';

describe('ProductList', () => {
  const mockProducts = [
    { id: 1, title: 'Apple', description: 'A red apple', price: 1.0 },
    { id: 2, title: 'Banana', description: 'A yellow banana', price: 0.5 },
    { id: 3, title: 'Cherry', description: 'A sweet cherry', price: 2.0 }
  ];

  it('renders a list of products', () => {
    const { getByText } = render(<ProductList products={mockProducts} />);

    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Cherry')).toBeTruthy();
  });

  it('renders no products when given an empty array', () => {
    const { queryByText } = render(<ProductList products={[]} />);

    expect(queryByText('Apple')).toBeNull();
    expect(queryByText('Banana')).toBeNull();
    expect(queryByText('Cherry')).toBeNull();
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<ProductList products={mockProducts} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
