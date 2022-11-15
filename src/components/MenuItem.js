import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import colors from '../functions/colors'

export default function MenuItem({navigation, path, name}) {
  return (
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate(path)}
    >
    <View style={styles.container}>
      <Text style={styles.text}> {name} </Text>
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
