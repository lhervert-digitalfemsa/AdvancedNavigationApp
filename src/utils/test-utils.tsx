import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderOptions,
  waitFor,
} from '@testing-library/react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import React, { ReactElement, ReactNode } from 'react';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import AppContext, { AppContextType } from '../hooks/useContext';
import { ProductT } from '../types/Product.type';

export const mockContextValues = {
  products: [
    { id: 1, title: 'Apple', description: 'A red apple', price: 1.0 },
    { id: 2, title: 'Banana', description: 'A yellow banana', price: 0.5 },
    { id: 3, title: 'Cherry', description: 'A sweet cherry', price: 2.0 },
  ],
  cart: [],
  loading: false,
  isUserLoggedIn: true,
  user: {
    name: 'John Doe',
    token: '1234',
  },
  error: undefined,
  settings: {
    theme: 'light' as 'light' | 'dark',
  },
  saveSettings: (settings: AppContextType['settings']) => {

  },
  login: (user: AppContextType['user']) => {

  },
  logout: () => {

  },
  addToCart: (product: ProductT) => { },
  removeFromCart: (productId: number) => { },
  updateCartItem: (productId: number, quantity: number) => { },
  clearCart: () => { },
}


const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <AppContext.Provider value={mockContextValues}>
          {children}
        </AppContext.Provider>
      </NavigationContainer>
    </ApplicationProvider>
  )
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render, fireEvent, act, waitFor, cleanup };
