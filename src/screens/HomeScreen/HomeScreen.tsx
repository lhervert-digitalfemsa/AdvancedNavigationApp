import React, { useContext } from 'react';
import { View } from 'react-native';
import ProductList from '../../components/atoms/ProductList/ProductList.component';
import AppContext, { AppContextType } from '../../hooks/useContext';

export function HomeScreen() {
  const { products } = useContext(AppContext) as AppContextType;
  return (
    <View style={{ flex: 1 }}>
      <ProductList products={products} />
    </View>
  );
}
