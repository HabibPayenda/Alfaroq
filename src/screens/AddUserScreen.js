import { StyleSheet, View, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import Btn from '../components/Btn';
import colors from '../functions/colors';
import Alfarooq from '../functions/Alfarooq';
import { perWidth } from '../functions/heigthWidth';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(null);

  function showToast() {
    ToastAndroid.show('صبر وکړئ!', ToastAndroid.SHORT);
  }

  function showToastSuccess() {
    ToastAndroid.show(`${name} اضافه شو!`, ToastAndroid.SHORT);
  }

  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }

  const handleRegister = async () => {
    try {
      const result = await Alfarooq.post('/register', {name: name, password: password, isAdmin: isAdmin}, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
          }
        },
      });

      if(result.data.user) {
        showToastSuccess()
      }

    } catch (error) {
      console.log(error)
      showToastError();
      return error;
    }
  };

  const registerUser = async () => {
    const user = await Alfarooq.post('/register', {name: name, password: password, isAdmin: isAdmin});
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="نوم"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="پټه کلیمه"
      />
      <Picker
        style={styles.select}
        selectedValue={isAdmin}
        onValueChange={(itemValue, itemIndex) => setIsAdmin(itemValue)}
      >
        <Picker.Item label="کتونکی" value={3} />
        <Picker.Item label="بدلون راوستونکی" value={2} />
      </Picker>
      <Btn color={colors.midGray} text="اضافه کول" onClick={() => handleRegister()} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
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
  select: {
    width: perWidth(80),
    backgroundColor: colors.light,
    elevation: 10,
  },
});
