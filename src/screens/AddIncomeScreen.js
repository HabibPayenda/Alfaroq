import { StyleSheet, Text, TextInput, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Btn from '../components/Btn';
import { addIncome } from '../Redux/Income/incomeSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function AddIncomeScreen() {

  const [name, setName] = useState('');
  const [money, setMoney] = useState('');

  const navigation = useNavigation();

  const dispatch = useDispatch();

  var date = new Date();
  var current_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

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

    

  const data = {
    name: name,
    amount: money,
    date: current_date,
  };

  const AddIncome = async () => {
    try {
      dispatch(addIncome(data));
      setName('');
      setMoney('');
      navigation.navigate('All Incomes')
    } catch (error) {
      return error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenttContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>د نوې مرستې معلومات</Text>
        </View>
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
      <Btn icon={<FontAwesome5 name="check-circle" size={24} color={colors.darkGray} />} onClick={AddIncome} text="ذخیره" color={colors.light} textColor={colors.dark} width={90} />
      </View>
    </SafeAreaView>
  );
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
  contenttContainer: {
    backgroundColor: colors.darkGray,
    marginTop: perHeight(5),
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 7,
    marginBottom: perHeight(1)
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
    elevation: 10
  },
});
