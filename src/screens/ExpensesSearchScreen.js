import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import { perHeight, perWidth } from '../functions/heigthWidth';
import Alfarooq from '../functions/Alfarooq';
import colors from '../functions/colors';
import ExpenseCard from '../components/ExpensesCard';
import Btn from '../components/Btn';

export default function ExpensesSearchScreen() {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  function showToast() {
    ToastAndroid.show('معلومات ذخیره شول!', ToastAndroid.SHORT);
  }
  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }


  const searchIncome = async () => {
    try {
      const response = await Alfarooq.get(`/expence/search/${name}`, null , {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
          }
        },
      });
      console.log(data)
      setData(response.data);
    } catch (error) {
      console.log(error);
      showToastError();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>د مصارفو لټون</Text>
      <TextInput placeholder='د مصرف تاریخ دننه کړئ!' keyboardType='numeric' style={styles.input} value={name} onChangeText={(text) => setName(text)} />
      <Btn text="لټون" onClick={searchIncome} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.discription}
        renderItem={({ item }) => {
          return <ExpenseCard discription={item.discription} money={item.amount} date={item.date} />;
        }}
        refreshing={refreshing}
        onRefresh={() => searchIncome()}
        style={{ width: perWidth(100), height: perHeight(50) }}
        contentContainerStyle={styles.screen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 30,
    height: perHeight(80),
    width: perWidth(100),
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
  },
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: perHeight(1),
  },
});
