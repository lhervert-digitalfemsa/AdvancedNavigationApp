import React, { useContext } from "react";
import { createBottomTabNavigator, type BottomTabBarProps, } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, SearchScreen, ProfileScreen, CartScreen, DetailScreen } from "../screens";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconElement,
  type IconProps,
} from '@ui-kitten/components';
import AppContext, { AppContextType } from "../hooks/useContext";
import { RouteProp } from "@react-navigation/native";
import { AppNavigatorT, StackNavigatorT } from "../types/AppNavigator.type";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackNavigatorT>();

const HomeIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="home-outline" />
);

const SearchIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="search-outline" />
);

const ProfileIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="person-outline" />
);

const CartIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="shopping-cart-outline" />
);

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Search" icon={SearchIcon} />
    <BottomNavigationTab title="Profile" icon={ProfileIcon} />
    <BottomNavigationTab title="Cart" icon={CartIcon} />
  </BottomNavigation>
);

export function BottomTabNavigator() {
  const { cart } = useContext(AppContext) as AppContextType;
  const cartItemCount = cart?.length || 0;

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarBadge: route.name === 'Cart' && cartItemCount > 0 ? cartItemCount : undefined,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

