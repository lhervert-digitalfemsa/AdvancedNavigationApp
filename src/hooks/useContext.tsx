import { createContext, useState } from "react";
import { ProductT } from "../types/Product.type";
import useFetch from "./useFetch";
import { CartT } from "../types/Cart.type";
import { update } from "lodash";
const URL = 'https://fakestoreapi.com/products';
export type AppContextType = {
  products: ProductT[];
  cart?: CartT;
  loading: boolean;
  user?: {
    name: string;
    email: string;
    token: string;
  };
  error?: unknown;
  saveUser?: (user: AppContextType['user']) => void;
  logout?: () => void;
  addToCart: (product: ProductT) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  /// Read products from API
  const { data: products, loading, error } = useFetch<ProductT[]>(URL);
  const [cart, setCart] = useState<CartT>([]);
  const [user, setUser] = useState({} as AppContextType['user']);

  /// User methods
  const saveUser = (user: AppContextType['user']) => {
    setUser(user);
  }

  const logout = () => {
    setUser({} as AppContextType['user']);
  }

  /// Cart methods
  const addToCart = (product: ProductT) => {

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };

        return { ...prevCart, items: updatedItems };
      } else {
        return {
          ...prevCart,
          items: [...prevCart, { product, quantity: 1 }]
        };
      }
    });
  }

  const updateCartItem = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(item => item.id === productId);
      if (itemIndex === -1) return prevCart;

      // If new quantity is zero or less, remove product
      if (quantity <= 0) {
        const updatedItems = prevCart.filter(item => item.id !== productId);
        return { ...prevCart, items: updatedItems };
      }

      // Otherwise, update quantity
      const updatedItems = [...prevCart];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity
      };

      return { ...prevCart, items: updatedItems };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.filter(item => item.id !== productId);
      return { ...prevCart, items: updatedItems };
    });
  }

  const clearCart = () => {
    setCart([]);
  }

  const value = {
    products: products as ProductT[],
    cart,
    loading,
    error,
    user,
    saveUser,
    logout,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};


export default AppContext;