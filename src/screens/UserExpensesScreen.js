import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Alfarooq from '../functions/Alfarooq';
import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import ExpenseCard from '../components/ExpensesCard';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserExpensesScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [moneyTotal, setMoneyTotal] = useState(0);
  const [role, setRoll] = useState(0);
const getUser = async () => {
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user)
  if(user) {
    setRoll(user.isAdmin)
  }
}

useEffect(() => {
  getUser()
}, [role])

  const fetchData = async () => {
    try {
      const result = await Alfarooq.get('/expence');
      result.data.current_page ? setCurPage(result.data.current_page) : setCurPage(1);
      result.data.last_page ? setLastPage(result.data.last_page) : setLastPage(1);
      setData(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchETotal = async () => {
    try {
      const result = await Alfarooq.get('/income/total');
      setMoneyTotal(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextData = async () => {
    try {
      if (curPage === lastPage) {
        const result = await Alfarooq.get(`/expence?page=${curPage - lastPage + 1}`);
        setData(result.data.data);
        setCurPage(1);
      } else {
        const result = await Alfarooq.get(`/expence?page=${curPage + 1}`);
        setData(result.data.data);
        setCurPage(result.data.current_page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPrevData = async () => {
    try {
      const result = await Alfarooq.get(`/expence?page=${curPage - 1}`);
      setData(result.data.data);
      setCurPage(result.data.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLastData = async () => {
    try {
      const result = await Alfarooq.get(`/expence?page=${lastPage}`);
      setData(result.data.data);
      setCurPage(result.data.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotal = async () => {
    try {
      const result = await Alfarooq.get('/expence/total');
      setExpenseTotal(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFirstData = async () => {
    try {
      const result = await Alfarooq.get(`/expence?page=${1}`);
      setData(result.data.data);
      setCurPage(result.data.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchTotal();
    fetchETotal();
  }, []);


  return (
    <SafeAreaView>
    <View style={styles.topView}>
        <View style={styles.navigation}>
          <View style={styles.navigationNums}>
            <Btn text="1" onClick={fetchFirstData} color={colors.blue} width={perWidth(13)} />
          </View>
          <Btn text="Prev" onClick={fetchPrevData} color={colors.yellow} width={perWidth(13)} />

          <View style={styles.navigationNums}>
            <Text style={styles.curPageNum}> {curPage} </Text>
          </View>
          <Btn text="Next" onClick={fetchNextData} width={perWidth(13)} />
          <View style={styles.navigationNums}>
            <Btn text={lastPage} onClick={fetchLastData} color={colors.blue} width={perWidth(13)} />
          </View>
        </View>
        </View>


      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ExpenseCard navigation={navigation} id={item.id} discription={item.discription} money={item.amount} date={item.date} />
          );
        }}
        refreshing={refreshing}
        onRefresh={() => {
          fetchData();
          fetchTotal();
          fetchETotal();
          setCurPage(1);
        }}
        style={{
          width: perWidth(100),
           height: role === 3 ? perHeight(100) : perHeight(50),
           marginTop: role === 3 ? perHeight(10) : 0
          }
          }
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
    height: perHeight(10),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',

  },
  navigationNums: {
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  curPageNum: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
