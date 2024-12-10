import React from "react";
import { Image, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { ProductType } from "../../../types/Product.type";
import { styles } from "./Product.styles";


const Product = ({ id, title, price, image }: ProductType) => {

  return (
    <Card style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View key={id} style={styles.body}>
          <Text category="s1">{title}</Text>
          <Text style={styles.price}>{`$${price}`}</Text>
        </View>
      </View>
    </Card>
  );
}

export default Product;