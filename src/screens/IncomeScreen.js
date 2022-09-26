import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IncomeCard from '../components/IncomeCard';
import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Alfarooq from '../functions/Alfarooq';
import Btn from '../components/Btn';

export default function IncomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [etotal, setETotal] = useState(0);


  
  const fetchTotal = async () => {
    try {
      const result = await Alfarooq.get('/income/total');
      console.log(result)
      console.log(`total result is : ${result}`)
      
      setTotal(result.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpensesTotal = async () => {
    try {
      const result = await Alfarooq.get('/expence/total');
      console.log(result)
      console.log(`total result is : ${result}`)
      
      setETotal(result.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await Alfarooq.get('/income');
      
      console.log(result.data);
      setCurPage(result.data.current_page);
      setLastPage(result.data.last_page);
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const fetchNextData = async () => {
    
    try {
      if(curPage === lastPage) {
        const result = await Alfarooq.get(`/income?page=${(curPage - lastPage) + 1}`);
        console.log(result.data);
        setData(result.data.data);
        setCurPage(1);
      } else {
        const result = await Alfarooq.get(`/income?page=${curPage + 1}`);
        console.log(result.data);
        setData(result.data.data);
        setCurPage(result.data.current_page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPrevData = async () => {
    try {
      const result = await Alfarooq.get(`/income?page=${curPage - 1}`);
      console.log(result.data);
      setData(result.data.data);
      setCurPage(result.data.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLastData = async () => {
    try {
      const result = await Alfarooq.get(`/income?page=${lastPage}`);
      console.log(result.data);
      setData(result.data.data);
      setCurPage(result.data.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFirstData = async () => {
    try {
      const result = await Alfarooq.get(`/income?page=${1}`);
      console.log(result.data);
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
    fetchExpensesTotal()
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.topView}>
        <View style={styles.totalExpenseContainer}>
      <Text style={styles.topViewText}>مجموعه مرستې</Text>
        <Text style={styles.topViewTextMoney}> {`${total} افغانۍ`}</Text>

        </View>
        <View style={styles.currentMoneyContainer}>
      <Text style={styles.topViewText}>اوسنۍ پیسې</Text>
        <Text style={styles.topViewTextMoney}> {`${total - etotal} افغانۍ`}</Text>

        </View>
        <View style={styles.navigation} >
        <View style={styles.navigationNums} >
            <Btn text='1' onClick={fetchFirstData} color={ colors.blue} width={perWidth(13)} />
          </View>
          <Btn text="Prev" onClick={fetchPrevData} color={colors.yellow} width={perWidth(13)} />
          
          <View style={styles.navigationNums} >
            <Text style={styles.curPageNum} > {curPage} </Text>
          </View>
          <Btn text="Next" onClick={fetchNextData}  width={perWidth(13)} />
          <View style={styles.navigationNums} >
          <Btn text={lastPage} onClick={fetchLastData} color={ colors.blue} width={perWidth(13)} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.searchDateIcon}
          onPress={() => navigation.navigate('IncomeSearchDate')}
        >
          <MaterialCommunityIcons style={{color: colors.light}} name="archive-search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => navigation.navigate('IncomeSearch')}
        >
          <MaterialCommunityIcons style={{color: colors.light}} name="database-search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => navigation.navigate('AddIncome')}
        >
          <Entypo style={{ color: colors.light }} name="add-to-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <IncomeCard name={item.name} money={item.amount} date={item.date} />;
        }}
        refreshing={refreshing}
        onRefresh={() => {
          fetchData();
          fetchTotal();
          setCurPage(1);
        } }
        style={{ width: perWidth(100), height: perHeight(50), backgroundColor: colors.light }}
        contentContainerStyle={styles.screen}
      />
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
  totalExpenseContainer: {
    padding: 10, 
  },
  currentMoneyContainer: {
    padding: 10,
    marginBottom: 40
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
    elevation: 10
  },
  topViewTextMoney: {
    fontSize: 20,
    color: colors.light,
    backgroundColor: colors.red,
    paddingVertical: 5, 
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 10
  },
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: perHeight(1),
  },
  addIcon: {
    position: 'absolute',
    bottom: perHeight(7),
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
    bottom: perHeight(13),
    right: perWidth(5),
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
  searchDateIcon: {
    position: 'absolute',
    bottom: perHeight(19),
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
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    position: 'absolute',
    bottom: 0
  },
  navigationNums: {
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  curPageNum: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: 18,
  }
});
