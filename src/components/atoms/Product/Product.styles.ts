import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  body: {
    flexShrink: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  price: {
    paddingTop: 20,
  }
});