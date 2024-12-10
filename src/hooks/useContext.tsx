import { createContext, useEffect, useState } from "react";
import { ProductType } from "../types/Product.type";
import useFetch, { FetchReturnValue } from "./useFetch";
const URL = 'https://fakestoreapi.com/products';
export type AppContextType = {
  products: ProductType[];
  cart?: [{}];
  loading: boolean;
  user?: {
    name: string;
    email: string;
  };

  error?: unknown;
  saveUser?: (user: AppContextType['user']) => void;
  logout?: () => void;
}

// const initialState: AppContextType = {
//   // products: [],
// };

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: products, loading, error } = useFetch<ProductType[]>(URL);
  // const [error, setError] = useState('');
  const [user, setUser] = useState({} as AppContextType['user']);
  const saveUser = (user: AppContextType['user']) => {
    setUser(user);
  }

  const logout = () => {
    setUser({} as AppContextType['user']);
  }

  return (
    <AppContext.Provider value={{ products: products as ProductType[], loading, error, user, saveUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};


export default AppContext;