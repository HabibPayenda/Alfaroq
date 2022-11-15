import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../functions/colors'

export default function Logout({setLocal}) {
  const logout = async () => {
    await AsyncStorage.removeItem('token')
    setLocal(false)
  }
  return (
    <TouchableWithoutFeedback
    onPress={() => {
      logout()
    }}
    >
    <View style={styles.container}>
      <Text style={styles.text}> وتل </Text>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.lightGray,
    padding: 8,
    marginBottom: 5
  },
  text: {
    fontSize: 16
  }
})
