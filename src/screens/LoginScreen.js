import { StyleSheet, Text, Image, View, TextInput, Button, ToastAndroid, AsyncStorageStatic } from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'
import Btn from '../components/Btn'
import Alfarooq from '../functions/Alfarooq'

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function showToast() {
    ToastAndroid.show('صبر وکړئ!', ToastAndroid.SHORT);
  }

  function showToastDelete() {
    ToastAndroid.show('معلومات حذف شول!', ToastAndroid.SHORT);
  }

  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }

  const handleLogin = async () => {
    try {
      const result = await Alfarooq.post('/login', {name: name, password: password}, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
          }
        },
      });
      console.log(result)
      console.log(result.data)
      await AsyncStorage.setItem('token', result.data.token);
      await AsyncStorage.setItem('userId', JSON.stringify(result.data.user.id))

    } catch (error) {
      showToastError();
      return error;
    }
  };


  return (
    <View style={styles.loginScreen}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <View style={styles.form}>
        <TextInput style={styles.input} value={name} onChangeText={(text) => setName(text)} placeholder='نوم' />
        <TextInput style={styles.input} value={password} onChangeText={(text) => setPassword(text)} placeholder='پټه کلیمه' />
        <Btn color={colors.midGray} text="ننوتل" onClick={() => handleLogin()}/>
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
