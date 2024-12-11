import React, {View, FlatList, StyleSheet, Pressable} from 'react-native';
import {Layout} from '@ui-kitten/components';
import SettingsItem from '../../components/atoms/SettingsItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorT} from '../../types/AppNavigator.type';

export function SettingsScreen() {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppNavigatorT, any>>();

  const AvailableSettings = [
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

  return (
    <Layout level="4" style={styles.mothershipContainer}>
      <View style={styles.settingsItemsContainer}>
        <FlatList
          data={AvailableSettings}
          ListHeaderComponent={
            <Pressable
              onPress={() => {
                navigate('Profile');
                console.log('Hola');
              }}>
              <SettingsItem title={'Profile'} />
            </Pressable>
          }
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <SettingsItem title={item.label} showDivider={true} />
              </View>
            );
          }}
        />
        <View>
          <SettingsItem title={'SIGN OUT'} />
        </View>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  mothershipContainer: {flex: 1},
  settingsItemsContainer: {flex: 1},
});
