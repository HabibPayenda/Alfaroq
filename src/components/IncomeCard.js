import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

import colors from '../functions/colors'
import { perHeight, perWidth } from '../functions/heigthWidth'

export default function IncomeCard() {
  return (
    <View style={styles.container}>
      
      <View style={styles.descContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTitle}>نوم</Text>
        <Text style={styles.nameText}>احمد</Text>
      </View>
      <View style={styles.moneyContainer}>
        <Text style={styles.moneyTitle}>مرسته په افغانۍ</Text>
        <Text style={styles.moneyText}>1000</Text>
      </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTitle}>تاریخ</Text>
        <Text style={styles.dateText}>01-01-2022</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: perWidth(95),
    height: perHeight(15),
    backgroundColor: colors.gray,
    borderRadius: perHeight(1),
    padding: perHeight(1)
  },
  descContainer: {
    flex: 2,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  dateContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: perHeight(10),
  }, 
  dateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'center',
  }, 
  nameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moneyContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  moneyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})