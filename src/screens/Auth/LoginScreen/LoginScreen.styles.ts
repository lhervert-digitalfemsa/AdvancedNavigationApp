import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loggedSuccessfully: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  avoidingContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 50,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
  },
  formContainer: {
    gap: 10,
    backgroundColor: '#fff',
  },
});
