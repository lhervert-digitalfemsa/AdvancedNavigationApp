import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabNavigator } from './BottomTabNavigator';
import { HomeScreen, ProfileScreen, SettingsScreen, DetailScreen } from '../screens';

import type { AppNavigatorT } from '../types/AppNavigator.type';

const Drawer = createDrawerNavigator<AppNavigatorT>();

export function AppNavigator() {
  return (
    <Drawer.Navigator initialRouteName="BottomNavigator">
      <Drawer.Screen
        name="BottomNavigator"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Detail" component={DetailScreen} />
    </Drawer.Navigator>
  )
}