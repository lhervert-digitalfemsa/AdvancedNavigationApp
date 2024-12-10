import React from "react";
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from "./AppNavigator";
import { BottomTabNavigator } from "./BottomTabNavigator";

const isUserLoggedIn = true;

export function RootNavigator() {
  return isUserLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}