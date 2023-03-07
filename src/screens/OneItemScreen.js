import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';

import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Btn from '../components/Btn';
import Alfarooq from '../functions/Alfarooq';

export default function OneItemScreen({ route, navigation }) {
  const { id, name, money } = route.params;
  const [newName, setNewName] = useState(name);
  const [newMoney, setNewMoney] = useState(money);

  function showToast() {
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
      const result = await Alfarooq.delete(`/income/${id}`);
      if (result.data === 1) {
        showToast();
        navigation.navigate('All Incomes')
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
      const result = await Alfarooq.patch(`/income/${id}`, {name: newName, amount: newMoney}, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
            navigation.navigate('All Incomes');
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
      <View style={styles.contentContainer}>
      <Text style={styles.title}>د بدلون راوستل</Text>
      <TextInput
        keyboardType="default"
        value={newName}
        onChangeText={(text) => setNewName(text)}
        style={styles.input}
      />
      <TextInput
        keyboardType="default"
        value={newMoney}
        onChangeText={(text) => {
          const updated = changeNumbers(text);
          setNewMoney(updated);
        }}
        style={styles.input}
      />
      <View style={styles.btnContainer}>
        <Btn color={colors.light} textColor={colors.dark} width={80} onClick={updateIncome} text="بدلون" />
        <Btn color={colors.light} textColor={colors.dark} width={80} onClick={deleteIncome} text="حذف" />
      </View>
      </View>
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
    backgroundColor: colors.white,
  },
  contentContainer: {
    backgroundColor: colors.darkGray,
    marginTop: perHeight(10),
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 7
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: colors.light,
    borderColor: colors.light,
    borderBottomWidth: 1,
    width: "100%"
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
  btnContainer: {
    display: 'flex',
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
 
});
