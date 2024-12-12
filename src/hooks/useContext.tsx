import { createContext, useEffect, useState } from "react";
import { ProductT } from "../types/Product.type";
import useFetch from "./useFetch";
import { CartProductT, CartT } from "../types/Cart.type";
import { deleteData, getData, storeData } from "../services/StorageService";
import { UserT } from "../types/User.type";
import { SettingsT } from "../types/Settings.type";
const URL = 'https://fakestoreapi.com/products';
export type AppContextType = {
  products: ProductT[];
  cart?: CartT;
  loading?: boolean;
  isUserLoggedIn: boolean;
  user?: UserT;
  error?: unknown;
  settings?: {
    theme: 'light' | 'dark';
  };
  saveSettings: (settings: AppContextType['settings']) => void;
  login: (user: AppContextType['user']) => void;
  logout: () => void;
  addToCart: (product: ProductT) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const getUser = () => {
  const user = getData<UserT>('user');
  return user;
}

const getSettings = async () => {
  const settings = await getData<SettingsT>('settings');
  return settings;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  /// Read products from API
  const { data: products, loading, error } = useFetch<ProductT[]>(URL);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartT>([]);
  const [user, setUser] = useState({} as AppContextType['user']);
  const [settings, setSettings] = useState({} as AppContextType['settings']);

  /// Save Settings
  const saveSettings = (settings: AppContextType['settings']) => {
    storeData('settings', settings);
    setSettings(settings);
  }

  /// User methods
  const login = (user: AppContextType['user']) => {
    storeData('user', user);
    setUser(user as UserT);
    setIsUserLoggedIn(true);
  }

  const logout = () => {
    deleteData('user');
    setUser({} as UserT);
    setIsUserLoggedIn(false);
  }

  /// Cart methods
  const addToCart = (product: ProductT) => {
    const newProduct = { ...product, quantity: 1 } as CartProductT;
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return [...updatedItems];
      } else {
        return [...prevCart, newProduct];
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
        return [...updatedItems];
      }

      // Otherwise, update quantity
      const updatedItems = [...prevCart];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity
      };

      return [...updatedItems];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.filter(item => item.id !== productId);
      return [...updatedItems];
    });
  }

  const clearCart = () => {
    setCart([]);
  }

  useEffect(() => {
    getUser().then(user => {
      if (user) {
        setUser(user);
        setIsUserLoggedIn(true);
      }
    });
    getSettings().then(settings => {
      if (settings) setSettings(settings);
    });
  }, [])

  const value = {
    products: products as ProductT[],
    isUserLoggedIn,
    cart,
    loading,
    error,
    user,
    settings,
    login,
    logout,
    saveSettings,
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