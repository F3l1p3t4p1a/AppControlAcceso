import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'


export default function LoadingScreen() {
  return (
    <View style={styles.contScreenLoading}>
    <ActivityIndicator size="large" color="#000" />
    <Text style={styles.textLoading}>Cargando...</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    contScreenLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textLoading: {
        fontSize: 24,
        color: '#000',
      },
})