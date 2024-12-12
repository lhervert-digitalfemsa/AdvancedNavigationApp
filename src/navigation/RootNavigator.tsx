import React, { useContext } from "react";
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from "./AppNavigator";
import AppContext, { AppContextType } from "../hooks/useContext";
import * as eva from '@eva-design/eva';
import { ApplicationProvider as UIKittenAppProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { linkingConfig } from './linkingConfig';

export function RootNavigator() {
  const { isUserLoggedIn, settings } = useContext(AppContext) as AppContextType;
  const theme = settings?.theme === 'light' ? eva.light : eva.dark;
  return (
    <UIKittenAppProvider {...eva} theme={theme}>
      <NavigationContainer linking={linkingConfig}>
        {isUserLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </UIKittenAppProvider>
  )
}