import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider as UIKittenAppProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator, BottomTabNavigator, linkingConfig } from './src/navigation';
import { AppProvider } from './src/hooks/useContext';

function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <UIKittenAppProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <AppProvider>
            <NavigationContainer linking={linkingConfig}>
              <RootNavigator />
            </NavigationContainer>
          </AppProvider>
        </SafeAreaView>
      </UIKittenAppProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
