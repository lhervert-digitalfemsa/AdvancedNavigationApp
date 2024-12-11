import React, { useContext } from "react";
import { View, Text, FlatList, TextInput } from 'react-native';
import Product from "../Product/Product.component";
import { AppContextType } from "../../../hooks/useContext";
import { styles } from "./ProductList.styles";

const ProductList = ({ products, isCart = false }: { products: AppContextType["products"], isCart?: boolean }) => {

  return (
    <View>
      <FlatList
        data={products}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => <Product {...item} isCart={isCart} />}
        keyExtractor={item => item.id + ''}
      />
    </View>
  );
}

export default ProductList;