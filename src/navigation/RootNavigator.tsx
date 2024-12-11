import React from "react";
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from "./AppNavigator";

const isUserLoggedIn = true;

export function RootNavigator() {
  return isUserLoggedIn ? <AppNavigator /> : <AuthNavigator />;
}