import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react';

import colors from '../functions/colors'
import { perHeight, perWidth } from '../functions/heigthWidth'

export default function ExpenseCard({ isAdmin ,money, discription, date, navigation, id }) {
  let newDate;

  const months = {
    1: 'حمل',
    2: 'ثور',
    3: 'جوزا',
    4: 'سرطان',
    5: 'اسد',
    6: 'سنبله',
    7: 'میزان',
    8: 'عقرب',
    9: 'قوس',
    10: 'جدی',
    11: 'دلو',
    12: 'حوت',
  }
 
    if(date.includes(140)) {
      newDate = date.split('/');
      newDate[1] = months[newDate[1] * 1]
    } else {
      newDate = date.split('-');
    }

  return (
    <TouchableWithoutFeedback onLongPress={() => isAdmin === 1 || isAdmin === 2 ?  navigation.navigate('ExpencesEdit', {id, discription, money}): null}>
      <View style={styles.container}>
        <View style={styles.desccContainer}>
          <Text style={styles.expenseText}>{`${money} افغانۍ`}</Text>
          <Text style={styles.descTitle}>شرح:</Text>
          <Text style={styles.descText}> {discription} </Text>
        </View>

        <View style={styles.descContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateDay}>{newDate[2]}</Text>
            <Text style={styles.dateMonth}>{newDate[1]}</Text>
            <Text style={styles.dateYear}>{newDate[0]}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: perWidth(95),
    height: perHeight(15),
    backgroundColor: colors.darkGray,
    borderRadius: perHeight(1),
    marginBottom: 8,
    elevation: 10
  },
  descContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10
  },
  dateContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGray,
    height: '100%',
    padding: perHeight(1),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  }, 
  dateDay: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.light
  },
  dateMonth: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.light
  },
  dateYear: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.light
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.light
  },
  expenseContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end', 
    justifyContent: 'center',
  }, 
  expenseText: {
    fontWeight: 'bold'
  },
  nameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desccContainer: {
    flex: 3,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGray,
    height: '100%',
    padding: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})