import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View style={styles.loginScreen}>
      <Text style={styles.logo}>الفاروق</Text>
      <View>
        <TextInput style={styles.input} placeholder='Email' />
        <TextInput style={styles.input} placeholder='Password' />
        <Button title='Login'>Login</Button>
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
    fontSize: 18,
    color: 'red'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    width: 200,
  }
})