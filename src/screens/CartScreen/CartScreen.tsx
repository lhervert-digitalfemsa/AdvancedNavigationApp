import { Button } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import ProductList from '../../components/atoms/ProductList/ProductList.component';
import AppContext, { AppContextType } from '../../hooks/useContext';

export function CartScreen() {
  const { cart, clearCart } = useContext(AppContext) as AppContextType;
  const [totalAmount, setTotalAmount] = useState(0)


  const calculateTotalAmount = () => {
    if (!cart || !cart) {
      setTotalAmount(0)
      return;
    };
    const amount = cart.reduce((sum, { price, quantity }) => {
      return sum + price * quantity;
    }, 0).toFixed(2);
    setTotalAmount(Number(amount));
  };
  useEffect(() => { calculateTotalAmount() }, []);

  return (
    <View style={{ flex: 1 }}>
      <ProductList products={cart!} isCart={true} />
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => { }}
        >
          {`Finish let's pay: ${totalAmount}`}
        </Button>
        <Button
          onPress={() => clearCart()}
        >
          I already regretted it
        </Button>
      </View>
    </View >
  );
}
