import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SearchScreen, ProfileScreen } from "../screens";
import { Icon } from "@ui-kitten/components";

const Tab = createBottomTabNavigator();

function getIconName(routeName: string, focused: boolean) {
  if (routeName === 'Home') {
    return focused ? 'home' : 'home-outline';
  }

  if (routeName === 'Search') {
    return focused ? 'search' : 'search-outline';
  }

  if (routeName === 'Profile') {
    return focused ? 'person' : 'person-outline';
  }

  return 'question-mark-outline'
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route.name, focused)
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}