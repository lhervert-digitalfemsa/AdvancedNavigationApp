import React from 'react';

import {Layout, Text} from '@ui-kitten/components';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default function Loading() {
  return (
    <Layout level="4" style={styles.container}>
      <ActivityIndicator size="large" />
      <Text category="h4">Loading</Text>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
