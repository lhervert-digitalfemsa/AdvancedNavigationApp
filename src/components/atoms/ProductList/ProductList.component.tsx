import React, { useContext } from "react";
import { View, Text, FlatList, TextInput } from 'react-native';
import Product from "../Product/Product.component";
import { AppContextType } from "../../../hooks/useContext";
import { styles } from "./ProductList.styles";

const ProductList = ({ products }: { products: AppContextType["products"] }) => {

  return (
    <View>
      <FlatList
        data={products}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => <Product {...item} />}
        keyExtractor={item => item.id + ''}
      />
    </View>
  );
}

export default ProductList;