import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../functions/colors'
import { perWidth } from '../functions/heigthWidth'

export default function Btn({onClick, text, color, width, height, borderWidth, borderColor, textColor, icon, marginVertical }) {
  return (
    <TouchableOpacity onPress={onClick}>
    <View style={[styles.container, {backgroundColor: color ? color : colors.green, width: width ? width : perWidth(40), height: height ? height : 40, borderWidth: borderWidth ? borderWidth : 0, borderColor: borderColor ? borderColor : 'white', marginVertical: marginVertical ? marginVertical : 10 }]}>
      {icon && icon}
      <Text style={[styles.title, {color: textColor, marginLeft: icon ? 5 : 0}]}>{text}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    margin: 0
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.light
  }
})