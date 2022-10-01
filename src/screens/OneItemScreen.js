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
        onChangeText={(text) => setNewMoney(text)}
        style={styles.input}
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
 
});
