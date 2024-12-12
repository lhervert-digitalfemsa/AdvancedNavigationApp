import React, { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Layout, Toggle } from '@ui-kitten/components';
import SettingsItem from '../../components/atoms/SettingsItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorT } from '../../types/AppNavigator.type';
import { useContext, useState } from 'react';
import AppContext, { AppContextType } from '../../hooks/useContext';
import { styles } from './SettingsScreen.styles';

export function SettingsScreen() {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppNavigatorT, any>>();
  const { logout } = useContext(AppContext) as AppContextType;
  const { settings, saveSettings } = useContext(AppContext) as AppContextType;
  const [checked, setChecked] = useState(settings?.theme === 'dark');
  const AvailableSettings = [
    {
      label: 'Profile',
    },
    {
      label: 'Address book',
    },
    {
      label: 'Manage account',
    },
    {
      label: 'Location',
    },
    {
      label: 'Currency',
    },
    {
      label: 'Language',
    },
    {
      label: 'Notifications',
    },
    {
      label: 'Privacy',
    },
    {
      label: 'Security',
    },
    {
      label: 'Switch account',
    },
    {
      label: 'About us',
    },
  ];
  const onCheckedChange = (isDark: boolean) => {
    setChecked(isDark);
    saveSettings({ theme: isDark ? 'dark' : 'light' });
  }
  return (
    <Layout level="4" style={styles.mothershipContainer}>
      <View style={styles.settingsItemsContainer}>
        <View style={styles.toggleContainer}>
          <Toggle
            checked={checked}
            onChange={onCheckedChange}
          >
            Dark Mode
          </Toggle>
        </View>
        <FlatList
          data={AvailableSettings}
          renderItem={({ item, index }) => {
            return (
              <View key={index}>
                <SettingsItem title={item.label} showDivider={true}
                  onPress={item.label === 'Profile' ? () => navigate('Profile') : () => { }}
                />
              </View>
            );
          }}
        />
        <View>
          <SettingsItem title={'SIGN OUT'} onPress={logout} />
        </View>
      </View>
    </Layout>
  );
}
