import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';


import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Btn from '../components/Btn';
import Alfarooq from '../functions/Alfarooq';
import { removeExpence, updateExpence } from '../Redux/Expences/expencesSlice';
import { useDispatch } from 'react-redux';
import ToastMaker from '../functions/ToastMaker';

export default function ExpensesEditScreen({ route, navigation }) {
  const { id, discription, money } = route.params;
  const [newDiscription, setNewDiscription] = useState(discription);
  const [newMoney, setNewMoney] = useState(money);

  const dispatch = useDispatch();
  

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
      dispatch(removeExpence(id));
      navigation.navigate('All Expenses');
      return 1;
    } catch (error) {
      console.log(error)
      return error;
    }
  };

  const updateIncome = async () => {
    const data = {id: id, discription: newDiscription, amount: newMoney}
   try {
    dispatch(updateExpence(data));
    navigation.navigate('All Expenses');
    return 1;
   } catch (error) {
    return error;
  }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>د بدلون راوستل</Text>
        </View>
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
        multiline
      />
      <View style={styles.btnContainer}>
        <Btn icon={<FontAwesome name="edit" size={24} color={colors.darkGray} />} color={colors.light} textColor={colors.dark} width={80} onClick={updateIncome} text="بدلون" />
        <Btn icon={<FontAwesome name="remove" size={24} color={colors.darkGray} />} color={colors.light} textColor={colors.dark} width={80} onClick={deleteIncome} text="حذف" />
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
    position: 'relative'
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
  },
  input: {
    width: perWidth(80),
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    elevation: 10,
  },
  btnContainer: {
    display: 'flex',
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputArea: {
    width: perWidth(80),
    height: 100,
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    elevation: 10,
    textAlign: 'right',
    textAlignVertical: 'top'
  }, 
});
