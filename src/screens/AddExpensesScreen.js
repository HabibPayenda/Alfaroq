import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { perHeight, perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'

export default function AddExpenseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>د نوې مصرف معلومات</Text>
      <TextInput placeholder='د مصرف مقدار په افغانیو' style={styles.input} />
      <TextInput placeholder='د مصرف کولو وجه' style={styles.inputArea} />
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
  inputArea: {
    borderColor: colors.darkGray,
    borderWidth: 1,
    width: perWidth(80),
    height: perHeight(10),
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: 'right',
    textAlignVertical: 'top'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
  },
})