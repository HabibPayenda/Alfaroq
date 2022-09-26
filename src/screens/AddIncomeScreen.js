import { StyleSheet, Text, ToastAndroid, TextInput, SafeAreaView, Button } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Alfarooq from '../functions/Alfarooq';
import Btn from '../components/Btn';

export default function AddIncomeScreen() {
  const [name, setName] = useState('');
  const [money, setMoney] = useState('');

  var date = new Date();
  var current_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

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

    

  const data = {
    name: name,
    amount: money,
    date: current_date,
  };

  function showToast() {
    ToastAndroid.show('معلومات ذخیره شول!', ToastAndroid.SHORT);
  }
  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }

  const AddIncome = async () => {
    try {
      console.log(money);

      const result = await Alfarooq.post('/income', data, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
            setName('');
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
      <Text style={styles.title}>د نوې مرستې معلومات</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="د مرستې کونکي نوم"
        style={styles.input}
      />
      <TextInput
        keyboardType="number-pad"
        value={money}
        onChangeText={(text) => {
          const newValu = changeNumbers(text);
          setMoney(newValu);
        }}
        placeholder="د مرستې مقدار په افغانیو"
        style={styles.input}
      />
      <Btn onClick={AddIncome} text="ذخیره" />
    </SafeAreaView>
  );
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: colors.darkGray
  },
  btn: {
    backgroundColor: colors.green,
    width: perWidth(30)
  }
});
