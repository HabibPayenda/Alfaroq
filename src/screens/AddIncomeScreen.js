import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { perHeight, perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'

export default function AddIncomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>د نوې مرستې معلومات</Text>
      <TextInput placeholder='د مرستې کونکي نوم' style={styles.input} />
      <TextInput placeholder='د مرستې مقدار په افغانیو' style={styles.input} />
      <Button title='ذخیره' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: perHeight(78),
    paddingVertical: 30
  }, 
  input: {
    borderColor: colors.darkGray,
    borderWidth: 1,
    width: perWidth(80),
    height: perHeight(4),
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
  }
})