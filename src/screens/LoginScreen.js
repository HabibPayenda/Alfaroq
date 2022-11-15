import { StyleSheet, Text, Image, View, TextInput, Button } from 'react-native'
import React from 'react'
import { perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'
import Btn from '../components/Btn'

export default function LoginScreen() {
  return (
    <View style={styles.loginScreen}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Email' />
        <TextInput style={styles.input} placeholder='Password' />
        <Btn color={colors.midGray} text="ننوتل" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
   },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 30
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: perWidth(80),
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: colors.light,
    elevation: 10,
  },
})
