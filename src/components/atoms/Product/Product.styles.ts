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
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityContainer: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantity: {
    fontSize: 20
  },
  button: {
    backgroundColor: 'transparent',
    fontSize: 10
  }
});