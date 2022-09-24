import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons'; 

import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import ExpenseCard from '../components/ExpensesCard';


export default function ExpensesScreen() {
  return (
    <SafeAreaView>
      <View style={styles.topView}>
        <Text style={styles.topViewText}>ExpensesScreen</Text>
        <Entypo style={styles.addIcon} name="add-to-list" size={24} color="black" />

      </View>
      <ScrollView style={{width: perWidth(100), marginTop: 10}}>
        <ExpenseCard />
        <ExpenseCard />
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  topView: {
    backgroundColor: colors.darkGray,
    height: perHeight(30),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topViewText: {
    fontSize: 18,
    color: 'white'
  },
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: perHeight(65),
    width: perWidth(100),
    padding: perHeight(1),
  },
  addIcon: {
    position: 'absolute',
    bottom: perHeight(5),
    right: perWidth(5),
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light
  }
});
