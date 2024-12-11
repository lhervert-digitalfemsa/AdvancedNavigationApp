import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import AppContext, { AppContextType } from "../../hooks/useContext";
import Header from '../../components/molecules/Header';
import ProductList from '../../components/atoms/ProductList/ProductList.component';
import SearchBar from '../../components/atoms/SearchBar/SearchBar.component';

export function SearchScreen() {
  const { products } = useContext(AppContext) as AppContextType;
  const [search, setSearch] = useState('');
  const [searchedProducts, setSearchProducts] = useState(products);
  const [isLoafing, setLoading] = useState('');

  useEffect(() => {
    if (products) {
      setSearchProducts(products);
    }
  }, [search])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Header title='Products' />
      <View>
        <TextInput
          onChangeText={setSearch}
          value={search}
          placeholder="Search for a product"
        />
        <SearchBar
          onSearch={setSearch}
          isLoading
        />
        <ProductList products={searchedProducts} />
      </View>
    </View>
  );
}
