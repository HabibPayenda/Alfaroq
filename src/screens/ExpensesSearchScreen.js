import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import { perHeight, perWidth } from '../functions/heigthWidth';
import Alfarooq from '../functions/Alfarooq';
import colors from '../functions/colors';
import ExpenseCard from '../components/ExpensesCard';

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
      <Text style={styles.title}>ExpensesSearchScreen</Text>
      <TextInput keyboardType='numeric' style={styles.input} value={name} onChangeText={(text) => setName(text)} />
      <Button title="لټون" onPress={() => searchIncome()} />
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
    padding: perHeight(10),
    height: perHeight(80),
    width: perWidth(100),
  },
  input: {
    borderColor: colors.darkGray,
    borderWidth: 1,
    width: perWidth(80),
    height: perHeight(4),
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
