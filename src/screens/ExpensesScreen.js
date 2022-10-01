import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
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
  const [curPage, setCurPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [etotal, setETotal] = useState(0);

  const fetchData = async () => {
    try {
      const result = await Alfarooq.get('/expence');
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchETotal = async () => {
    try {
      const result = await Alfarooq.get('/income/total');
      setETotal(result.data);
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
      console.log(`total result is : ${result}`);
      setTotal(result.data);
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
  }, [newData]);

  useEffect(() => {
    fetchTotal();
    fetchETotal();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.topView}>
        <View style={styles.totalExpenseContainer}>
          <Text style={styles.topViewText}>مجموعه مصارف</Text>
          <Text style={styles.topViewTextMoney}> {`${total} افغانۍ`}</Text>
        </View>
        <View style={styles.currentMoneyContainer}>
          <Text style={styles.topViewText}>اوسنۍ پیسې</Text>
          <Text style={styles.topViewTextMoney}> {`${etotal - total} افغانۍ`}</Text>
        </View>
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
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.searchDateIcon}
            onPress={() => navigation.navigate('ExpencesSearchDate')}
          >
            <MaterialCommunityIcons
              style={{ color: colors.light }}
              name="archive-search"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => navigation.navigate('ExpencesSearch')}
          >
            <MaterialCommunityIcons
              style={{ color: colors.light }}
              name="database-search"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => navigation.navigate('Add Expense')}
          >
            <Entypo style={{ color: colors.light }} name="add-to-list" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ExpenseCard discription={item.discription} money={item.amount} date={item.date} />
          );
        }}
        refreshing={refreshing}
        onRefresh={() => {
          fetchData();
          fetchETotal();
          setCurPage(1);
        }}
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
    height: perHeight(40),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalExpenseContainer: {
    padding: 10,
  },
  currentMoneyContainer: {
    padding: 10,
    marginBottom: 40,
  },
  topViewText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 10,
    backgroundColor: colors.light,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
    borderRadius: 5,
    elevation: 10,
  },
  topViewTextMoney: {
    fontSize: 20,
    color: colors.light,
    backgroundColor: colors.red,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10,
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
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
    marginBottom: 10,
  },
  searchDateIcon: {
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
    marginBottom: 10,
  },
  icons: {
    position: 'absolute',
    bottom: perHeight(10),
    right: perWidth(5),
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
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
