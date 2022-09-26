import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Alfarooq from '../functions/Alfarooq';
import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import ExpenseCard from '../components/ExpensesCard';
import Btn from '../components/Btn';

export default function ExpensesScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [result, setResult ] = useState({});


  let totalExpenses = 0;
  // for(var i = 0; i < data.length; i++) {
  //   totalExpenses += JSON.parse(data[i].amount)
  // }

  const fetchData = async () => {
    try {
      const result = await Alfarooq.get('/expence');
      console.log(result.data);
      setResult(result.data);
      setData(result.data.data);
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
        <Text style={styles.topViewText}>مجموعه مصارف</Text>
        <Text style={styles.topViewTextMoney}> {`${totalExpenses} افغانۍ`}</Text>
        <Btn text="next" />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => navigation.navigate('ExpencesSearch')}
        >
          <MaterialCommunityIcons style={{color: colors.light}} name="database-search" size={24} color="black" />
        </TouchableOpacity>
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
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.light,
    marginBottom: 10
  },
  topViewTextMoney: {
    fontSize: 20,
    color: colors.light
  },
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGray,
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
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
  searchIcon: {
    position: 'absolute',
    bottom: perHeight(5),
    right: perWidth(20),
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
});
