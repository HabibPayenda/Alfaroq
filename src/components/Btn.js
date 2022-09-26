import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../functions/colors'
import { perWidth } from '../functions/heigthWidth'

export default function Btn({onClick, text, color, width }) {
  return (
    <TouchableOpacity onPress={onClick}>
    <View style={[styles.container, {backgroundColor: color ? color : colors.green, width: width ? width : perWidth(40) }]}>
      <Text style={styles.title}>{text}</Text>
    </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    width: perWidth(40),
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.light,
  }
})