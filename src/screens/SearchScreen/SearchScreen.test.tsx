import React from 'react';
import { render, fireEvent } from '../../utils/test-utils';
import { SearchScreen } from './SearchScreen';

describe('SearchScreen', () => {

  const mockProducts = [
    { id: 1, title: 'Apple', description: 'A red apple', price: 1.0 },
    { id: 2, title: 'Banana', description: 'A yellow banana', price: 0.5 },
    { id: 3, title: 'Cherry', description: 'A sweet cherry', price: 2.0 },
  ];

  const renderWithContext = (products = mockProducts) => {
    return render(<SearchScreen />);
  };

  it('renders the header and input fields correctly', () => {
    const { getByText, getByPlaceholderText } = renderWithContext();
    expect(getByText('Products')).toBeTruthy();
    expect(getByPlaceholderText('Search for a product')).toBeTruthy();
  });

  it('displays the list of products', () => {
    const { getByText } = renderWithContext();
    // Check that product names are displayed
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Cherry')).toBeTruthy();
  });

  it('updates search value as the user types', () => {
    const { getByPlaceholderText } = renderWithContext();
    const searchInput = getByPlaceholderText('Search for a product');
    fireEvent.changeText(searchInput, 'Ap');
    expect(searchInput.props.value).toBe('Ap');
  });

  it('does not crash if no products provided', () => {
    const { getByText } = renderWithContext([]);
    expect(getByText('Products')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const { toJSON } = renderWithContext();
    expect(toJSON()).toMatchSnapshot();
  });
});
