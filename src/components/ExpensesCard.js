import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

import colors from '../functions/colors'
import { perHeight, perWidth } from '../functions/heigthWidth'

export default function ExpenseCard({money, discription, date}) {
  return (
    <View style={styles.container}>
       <View style={styles.desccContainer}>
        <Text style={styles.descTitle}>شرح:</Text>
        <Text style={styles.descText}> {discription} </Text>
      </View>
      
      <View style={styles.descContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTitle}>تاریخ</Text>
        <Text style={styles.dateText}> {date} </Text>
      </View>
      <View style={styles.expenseContainer}>
        <Text style={styles.expenseTitle}>مصرف په افغانۍ</Text>
        <Text style={styles.expenseText}>{money}</Text>
      </View>     
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
    backgroundColor: colors.lightGray,
    borderRadius: perHeight(1),
    padding: perHeight(1),
    marginBottom: 8
  },
  descContainer: {
    flex: 1,
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
  expenseContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'center',
  }, 
  nameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desccContainer: {
    flex: 2,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    backgroundColor: colors.gray,
    height: '100%',
    padding: 5,
    borderRadius: 5
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})