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

  var afghanNumbers = ['۰', '۱', /۲/g, /۳/g, /٤/g, /۴/g, /۵/g, /٦/g, /۶/g, /۷/g, /۸/g, /۹/g],
  englishNumbers = [0, 1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9],

    changeNumbers = function (str) {
      if (typeof str === 'string') {
        for (var i = 0; i < 13; i++) {
          str = str.replace(afghanNumbers[i], englishNumbers[i]);
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
    height: '100%',
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