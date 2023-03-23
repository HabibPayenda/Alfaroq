import { StyleSheet, Text, ToastAndroid, TextInput, SafeAreaView, View } from 'react-native'
import React, {useState} from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import { perHeight, perWidth } from '../functions/heigthWidth'
import colors from '../functions/colors'
import Btn from '../components/Btn'
import { useNavigation } from '@react-navigation/native';
import { addExpence } from '../Redux/Expences/expencesSlice';
import { useDispatch } from 'react-redux';

export default function AddExpenseScreen() {
  const [desc, setDesc] = useState('');
  const [money, setMoney] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const AddExpense = async () => {
    try {
      const params = {
        data: data,
        setDesc: setDesc,
        setMoney: setMoney
      }

      dispatch(addExpence(params));
      navigation.navigate('All Expenses')

    } catch (error) {
      console.log(error);
      return error
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenttContainer}>
        <View style={styles.titleContainer}>
           <Text style={styles.title}>د نوې لګونې معلومات</Text>
        </View>
          <TextInput keyboardType='number-pad' value={money} onChangeText={ (text) => {
            const newValu = changeNumbers(text);
            setMoney(newValu);
          } } placeholder='د لګونې مقدار په افغانیو' style={styles.input} />
          <TextInput multiline value={desc} onChangeText={(text) => setDesc(text)} placeholder='د لګونې معلومات' style={styles.inputArea} />
          <Btn icon={<FontAwesome5 name="check-circle" size={24} color={colors.darkGray} />}  text="ذخیره" color={colors.light} textColor={colors.dark} width={90} onClick={AddExpense} />
      </View>
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
  inputArea: {
    width: perWidth(80),
    height: 80,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    elevation: 10,
    textAlignVertical: 'top'
  }
})