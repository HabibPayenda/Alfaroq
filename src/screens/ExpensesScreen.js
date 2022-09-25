import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';

import Alfarooq from '../functions/Alfarooq';
import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import ExpenseCard from '../components/ExpensesCard';

export default function ExpensesScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const result = await Alfarooq.get('/expence');
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [newData]);
  return (
    <SafeAreaView>
      <View style={styles.topView}>
        <Text style={styles.topViewText}>ExpensesScreen</Text>
        <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('Add Expense')}>
          <Entypo style={{color: colors.light}} name="add-to-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <ExpenseCard discription={item.discription} money={item.amount} date={item.date} />;
        }}
        refreshing={refreshing}
        onRefresh={() => fetchData()}
        style={{ width: perWidth(100), height: perHeight(50) }}
        contentContainerStyle={styles.screen}
      >
        <ExpenseCard />
        <ExpenseCard />
      </FlatList>
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
    justifyContent: 'center',
  },
  topViewText: {
    fontSize: 18,
    color: 'white',
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
    borderColor: colors.light,
  },
});
