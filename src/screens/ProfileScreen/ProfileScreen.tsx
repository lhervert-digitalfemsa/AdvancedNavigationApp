import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/molecules/Header';

export function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Header title='Profile' />
    </View>
  );
}