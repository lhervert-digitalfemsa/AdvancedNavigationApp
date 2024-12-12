import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderOptions,
  waitFor,
} from '@testing-library/react-native';
import { mockContextValues } from '../../utils/test-utils';
import { ApplicationProvider } from '@ui-kitten/components';
import { CartScreen } from './CartScreen';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import AppContext, { AppContextType } from '../../hooks/useContext';
import { ProductT } from '../../types/Product.type';

describe('CartScreen', () => {

  const mockProducts = [
    { id: 1, title: 'Apple', description: 'A red apple', price: 1.0, quantity: 1, image: '' },
    { id: 2, title: 'Banana', description: 'A yellow banana', price: 0.5, quantity: 1, image: '' },
    { id: 3, title: 'Cherry', description: 'A sweet cherry', price: 2.0, quantity: 1, image: '' },
  ];

  const renderWithContext = (products = mockProducts) => {
    return render(
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NavigationContainer>
          <AppContext.Provider value={{
            ...mockContextValues,
            cart: mockProducts
          }}>
            <CartScreen />
          </AppContext.Provider>
        </NavigationContainer>
      </ApplicationProvider>
    );
  };

  it('renders the product list correctly', () => {
    const { getByText, getByPlaceholderText } = renderWithContext();
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Cherry')).toBeTruthy();
    expect(getByText(`Finish let's pay: 3.5`)).toBeTruthy();
  });

});
