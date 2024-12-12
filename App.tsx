import React from 'react';
import { SafeAreaView, StyleSheet, } from 'react-native';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { RootNavigator } from './src/navigation';
import { AppProvider } from './src/hooks/useContext';

function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaView style={styles.container}>
        <AppProvider>
          <RootNavigator />
        </AppProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
