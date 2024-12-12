import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import SearchBar from './SearchBar.component';
import _ from 'lodash';

jest.mock('lodash', () => {
  const original = jest.requireActual('lodash');
  return {
    ...original,
    debounce: (fn, delay) => {
      let timer;
      const debounced = (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
      debounced.cancel = () => {
        if (timer) clearTimeout(timer);
      };
      return debounced;
    },
  };
});

jest.useFakeTimers();

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search bar and input', () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} isLoading={false} />
    );
    expect(getByText('Search')).toBeTruthy();
    expect(getByPlaceholderText('Type here to search')).toBeTruthy();
  });

  it('does not show ActivityIndicator when isLoading is false', () => {
    const { queryByTestId } = render(
      <SearchBar onSearch={mockOnSearch} isLoading={false} />
    );
    expect(queryByTestId('loadingIndicator')).toBeNull();
  });

  it('debounces onSearch calls', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} isLoading={false} />
    );
    const input = getByPlaceholderText('Type here to search');

    fireEvent.changeText(input, 'test');

    expect(mockOnSearch).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('resets debounce timer when user keeps typing', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} isLoading={false} />
    );
    const input = getByPlaceholderText('Type here to search');

    fireEvent.changeText(input, 't');
    fireEvent.changeText(input, 'te');
    fireEvent.changeText(input, 'tes');
    fireEvent.changeText(input, 'test');

    act(() => {
      jest.runAllTimers();
    });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});
