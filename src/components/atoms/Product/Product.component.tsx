import React, { useContext } from "react";
import { Image, View } from "react-native";
import { Button } from '@ui-kitten/components';
import { Card, Text } from "@ui-kitten/components";
import { ProductT } from "../../../types/Product.type";
import { styles } from "./Product.styles";
import AppContext, { AppContextType } from '../../../hooks/useContext';
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigatorT } from "../../../types/AppNavigator.type";
type AppNavigatorProps = DrawerNavigationProp<StackNavigatorT, 'Detail'>;

const Product = ({ id, title, price, image, quantity }: ProductT & { quantity?: number }) => {
  const { removeFromCart, updateCartItem, addToCart } = useContext(AppContext) as AppContextType;
  const navigation = useNavigation<AppNavigatorProps>();
  const handlePress = () => {
    navigation.navigate("Detail", { productId: id });
  }
  return (
    <Card style={styles.container} onPress={handlePress} >
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View key={id} style={styles.body}>
          <Text category="s1">{title}</Text>
          <Text style={styles.price}>{`$${price}`}</Text>
          <View style={styles.buttons}>
            {
              !quantity ? (
                <>
                  <Button
                    onPress={() => addToCart({
                      id,
                      title,
                      price,
                      image,
                    })}
                  >
                    Add to cart
                  </Button>
                </>
              ) :
                (<>
                  <Button
                    onPress={() => updateCartItem(id, quantity + 1)}
                    style={styles.button}
                  >
                    ⬆️
                  </Button>
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantity}>{!quantity ? 0 : quantity}</Text>
                  </View>
                  {
                    quantity !== 1 ? (
                      <Button
                        onPress={() => updateCartItem(id, quantity - 1)}
                        style={styles.button}
                      >
                        ⬇️
                      </Button>
                    ) : (
                      <Button
                        onPress={() => removeFromCart(id)}
                        style={styles.button}
                      >
                        🗑️
                      </Button>
                    )
                  }
                </>
                )
            }
          </View>
        </View>

      </View>
    </Card >
  );
}

export default Product;