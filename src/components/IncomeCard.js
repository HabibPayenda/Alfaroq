import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import colors from '../functions/colors';
import { perHeight, perWidth } from '../functions/heigthWidth';

export default function IncomeCard({isAdmin, id, name, money, date, navigation }) {
  const newDate = date.split('-');
  return (
    <TouchableWithoutFeedback onLongPress={() => isAdmin === 1 ? navigation.navigate('IncomeOneItem', {id, name, money}) : null} >
      <View style={styles.container}>
        <View style={styles.descContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>نوم</Text>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={styles.moneyContainer}>
            <Text style={styles.moneyTitle}>مرسته</Text>
            <Text style={styles.text}>{`${money} افغانۍ`}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateDay}>{newDate[2]}</Text>
          <Text style={styles.dateMonth}>{newDate[1]}</Text>
          <Text style={styles.dateYear}>{newDate[0]}</Text>
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
    backgroundColor: colors.gray,
    borderRadius: perHeight(1),
    marginBottom: 10,
    elevation: 10,
  },
  descContainer: {
    flex: 2,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGray,
    padding: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  dateContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: perHeight(10),
    backgroundColor: colors.darkGray,
    height: '100%',
    padding: perHeight(1),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  dateDay: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.light,
  },
  dateMonth: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.light,
  },
  dateYear: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.light,
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
    color: colors.darkGray,
  },
  moneyContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  moneyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  text: {
    color: colors.darkGray,
  },
});
