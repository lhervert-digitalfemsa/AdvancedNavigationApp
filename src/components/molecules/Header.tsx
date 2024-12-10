import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Header({ title, showGoBack = false }: { title: string, showGoBack?: boolean }) {
  return (
    <View style={styles.container}>
      {showGoBack && <Text style={styles.goBack}>Back</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goBack: {
    fontSize: 16,
    color: 'blue',
  },
})