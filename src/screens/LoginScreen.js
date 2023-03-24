import { StyleSheet, Text, Image, View, TextInput, Button, ToastAndroid, AsyncStorageStatic } from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { perHeight, perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'
import Btn from '../components/Btn'
import AlfarooqLogin from '../functions/AlfarooqLogin';

import { signIn } from '../Redux/User/userSlice';
import { useDispatch } from 'react-redux';

export default function LoginScreen({setLocal}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function showToast() {
    ToastAndroid.show('صبر وکړئ!', ToastAndroid.SHORT);
  }

  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const data = {name: name, password: password};
    try {
     dispatch(signIn(data));
     return 1;
    } catch (error) {
      return error;
    }
  };


  return (
    <View style={styles.loginScreen}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} value={name} onChangeText={(text) => setName(text)} placeholder='نوم' />
        <TextInput secureTextEntry style={styles.input} value={password} onChangeText={(text) => setPassword(text)} placeholder='پټه کلیمه' />
        <Btn color={colors.darkGray} textColor={colors.light} text="ننوتل" onClick={() => handleLogin()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.white
   },
   logoContainer: {
    backgroundColor: colors.white,
    marginBottom: perHeight(5),
    borderColor: colors.darkGray,
    borderWidth: 2,
    height: perHeight(15),
    width: perHeight(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 5
   },
  logo: {
    height: perHeight(14),
    width: perHeight(14),
    borderRadius: 100,
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
    borderRadius: 5,
    backgroundColor: colors.white,
    elevation: 5
  },
})
