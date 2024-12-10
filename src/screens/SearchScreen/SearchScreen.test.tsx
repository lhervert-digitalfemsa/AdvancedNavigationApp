import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SearchScreen } from './SearchScreen';
import AppContext from '../../hooks/useContext';

describe('SearchScreen', () => {
  const mockProducts = [
    { id: 1, name: 'Apple', description: 'A red apple', price: 1.0 },
    { id: 2, name: 'Banana', description: 'A yellow banana', price: 0.5 },
    { id: 3, name: 'Cherry', description: 'A sweet cherry', price: 2.0 },
  ];

  const renderWithContext = (products = mockProducts) => {
    return render(
      <AppContext.Provider value={{ products }}>
        <SearchScreen />
      </AppContext.Provider>
    );
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
