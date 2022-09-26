import { StyleSheet, Text, ToastAndroid, TextInput, SafeAreaView, Button } from 'react-native'
import React, {useState} from 'react'

import Alfarooq from '../functions/Alfarooq'
import { perHeight, perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'
import Btn from '../components/Btn'

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

  var afghanNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g],

  changeNumbers = function (str) {
    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str.replace(afghanNumbers[i], i).replace(englishNumbers[i], i);
      }
    }
    return str;
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
      <TextInput keyboardType='number-pad' value={money} onChangeText={ (text) => {
         const newValu = changeNumbers(text);
         setMoney(newValu);
      } } placeholder='د مصرف مقدار په افغانیو' style={styles.input} />
      <TextInput value={desc} onChangeText={(text) => setDesc(text)} placeholder='د مصرف کولو وجه' style={styles.inputArea} />
      <Btn text='ذخیره' onClick={AddExpense} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: perHeight(78),
    paddingVertical: 30,
    backgroundColor: colors.lightGray
  }, 
  input: {
    width: perWidth(80),
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: colors.light,
    elevation: 10
  },
  inputArea: {
    width: perWidth(80),
    height: 100,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors.light,
    elevation: 10,
    textAlign: 'right',
    textAlignVertical: 'top'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
  },
})