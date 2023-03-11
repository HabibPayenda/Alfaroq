import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { perHeight, perWidth } from '../functions/heigthWidth';
import Alfarooq from '../functions/Alfarooq';
import colors from '../functions/colors';
import IncomeCard from '../components/IncomeCard';
import Btn from '../components/Btn';

export default function IncomeSearchScreen() {
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
      const response = await Alfarooq.get(`/income/search/${name}`, null , {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
          }
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
      showToastError();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenttContainer} >
        <View style={styles.titleContainer} >
          <Text style={styles.title}>د مرستو لټون</Text>
        </View>
      <TextInput placeholder='د مرسته کوونکي نوم د ننه کړئ!' keyboardType='default' style={styles.input} value={name} onChangeText={(text) => setName(text)} />
      <Btn icon={<FontAwesome name="search" size={24} color={colors.darkGray} />} text="لټون" color={colors.light} textColor={colors.dark} width={80} onClick={searchIncome} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <IncomeCard name={item.name} money={item.amount} date={item.date} />;
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
    height: perHeight(90),
    backgroundColor: colors.white,
    position: 'relative'
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
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: perHeight(1),
  },
});
