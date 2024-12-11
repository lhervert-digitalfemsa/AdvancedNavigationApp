import React, { useContext, useMemo } from 'react'
import { View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { Text } from '@ui-kitten/components'
import AppContext, { AppContextType } from '../../hooks/useContext';
import type { RouteProp } from '@react-navigation/native';
import { styles } from './DetailScreen.styles'

export function DetailScreen({ route }: { route: RouteProp<{ Detail: { productId: number } }> }) {

  const idProduct = route.params.productId;
  console.log(idProduct);
  const { products, addToCart } = useContext(AppContext) as AppContextType;

  const clickEventListener = () => {
    if (!product) {
      Alert.alert('Error', 'Product not found');
      return;
    }
    Alert.alert('Success', 'Product has beed added to cart')
    addToCart(product!);
  }

  const product = useMemo(() => products.find((item) => item.id === idProduct), [idProduct]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
          <Image
            style={styles.productImg}
            source={{
              uri: product?.image,
            }}
          />
          <Text style={styles.name}>{product?.title}</Text>
          <Text style={styles.price}>{`$${product?.price}`}</Text>
          <Text style={styles.description}>
            {product?.description}
          </Text>
        </View>
        <View style={styles.starContainer}>
          <Image
            style={styles.star}
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            style={styles.star}
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            style={styles.star}
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            style={styles.star}
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            style={styles.star}
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
        </View>
        <View style={styles.contentColors}>
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#00BFFF' }]}></TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#FF1493' }]}></TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#00CED1' }]}></TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#228B22' }]}></TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#20B2AA' }]}></TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnColor, { backgroundColor: '#FF4500' }]}></TouchableOpacity>
        </View>
        <View style={styles.contentSize}>
          <TouchableOpacity style={styles.btnSize}>
            <Text>S</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>L</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>XL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={() => clickEventListener()}>
            <Text style={styles.shareButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}


