import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const root = render(<App />);
  expect(root).toBeDefined();
});
