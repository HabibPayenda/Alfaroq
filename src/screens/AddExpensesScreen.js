import { StyleSheet, Text, ToastAndroid, TextInput, SafeAreaView, Button } from 'react-native'
import React, {useState} from 'react'

import Alfarooq from '../functions/Alfarooq'
import { perHeight, perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'

export default function AddExpenseScreen() {
  const [desc, setDesc] = useState('');
  const [money, setMoney] = useState('');

  var date = new Date();
  var current_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  const data = {
    discription: desc,
    amount: money,
    date: current_date,
  };

  function showToast() {
    ToastAndroid.show('معلومات ذخیره شول!', ToastAndroid.SHORT);
  }
  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }

  const AddExpense = async () => {
    try {
      console.log(money);

      const result = await Alfarooq.post('/expence', data, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
            setDesc('');
            setMoney('');
          }
        },
      });

      console.log(result);
      return result;
    } catch (error) {
      showToastError();
      return error;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>د نوي مصرف معلومات</Text>
      <TextInput keyboardType='number-pad' value={money} onChangeText={ (text) => setMoney(text)} placeholder='د مصرف مقدار په افغانیو' style={styles.input} />
      <TextInput value={desc} onChangeText={(text) => setDesc(text)} placeholder='د مصرف کولو وجه' style={styles.inputArea} />
      <Button title='ذخیره' onPress={AddExpense} />
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
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputArea: {
    borderColor: colors.darkGray,
    borderWidth: 1,
    width: perWidth(80),
    height: 100,
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