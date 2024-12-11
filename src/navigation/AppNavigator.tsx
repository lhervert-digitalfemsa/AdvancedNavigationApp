import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ProfileScreen, SettingsScreen, DetailScreen } from '../screens';

import type { AppNavigatorT, StackNavigatorT } from '../types/AppNavigator.type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator<AppNavigatorT>();
const Stack = createNativeStackNavigator<StackNavigatorT>();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{
        headerShown: false,
      }} name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitle: '',
        headerBackground: () => <></>,
      }} />
    </Stack.Navigator>
  );
}


export function AppNavigator() {

  return (
    <Drawer.Navigator initialRouteName="Landing">
      <Drawer.Screen
        name="Landing"
        component={MainStackNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}