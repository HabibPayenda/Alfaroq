import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';

import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Btn from '../components/Btn';
import Alfarooq from '../functions/Alfarooq';

export default function ExpensesEditScreen({ route, navigation }) {
  const { id, discription, money } = route.params;
  const [newDiscription, setNewDiscription] = useState(discription);
  const [newMoney, setNewMoney] = useState(money);

  function showToast() {
    ToastAndroid.show('معلومات ذخیره شول!', ToastAndroid.SHORT);
  }

  function showToastDelete() {
    ToastAndroid.show('معلومات حذف شول!', ToastAndroid.SHORT);
  }

  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }

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

  const deleteIncome = async () => {
    try {
      const result = await Alfarooq.delete(`/expence/${id}`);
      if (result.data === 1) {
        showToastDelete();
        navigation.navigate('All Expenses')
      }
      return result;
    } catch (error) {
      console.log(error)
      showToastError();
      return error;
    }
  };

  const updateIncome = async () => {
    try {
      const result = await Alfarooq.patch(`/expence/${id}`, {discription: newDiscription, amount: newMoney}, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
            navigation.navigate('All Expenses');
          }
        },
      });
      return result;
    } catch (error) {
      showToastError();
      return error;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>د بدلون راوستل</Text>
      <TextInput
        keyboardType="default"
        value={newMoney}
        onChangeText={(text) => {
          const updated = changeNumbers(text);
          setNewMoney(updated);
        }}
        style={styles.input}
      />
      <TextInput
        keyboardType="default"
        value={newDiscription}
        onChangeText={(text) => setNewDiscription(text)}
        style={styles.inputArea}
      />
      <Btn color={colors.yellow} onClick={updateIncome} text="بدلون" />
      <Btn color={colors.red} onClick={deleteIncome} text="حذف" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: perHeight(90),
    paddingVertical: 30,
    backgroundColor: colors.lightGray,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: colors.darkGray,
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
});
