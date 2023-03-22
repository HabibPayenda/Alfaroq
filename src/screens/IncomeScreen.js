import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Network from 'expo-network';

import IncomeCard from '../components/IncomeCard';
import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Alfarooq from '../functions/Alfarooq';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getTotalIncome, getIncomes } from '../Redux/Income/incomeSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function IncomeScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(true);
  const [data, setData] = useState([]);
  const [newData] = useState(false);
  const [refreshing] = useState(false);
  // const [curPage, setCurPage] = useState(0);
  // const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [etotal, setETotal] = useState(0);
  const [role, setRoll] = useState(null);
  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user)
    if (user) {
      setRoll(user.isAdmin)
    }
  }

  // incomes: [],
  // currPage: 0,
  // lastPage: 0,
  // nextPageUrl: '',
  // prevPageUrl: '',
  // totalIncome: 0,
  // loading: 'idle',

  const dispatch = useDispatch();
  const { totalIncome, prevPageUrl, nextPageUrl, incomes, currPage, lastPage, loading } = useSelector((state) => state.incomeSlice);


  console.log("total income is ", totalIncome)

  useEffect(() => {
    dispatch(getTotalIncome());
    dispatch(getIncomes());
  }, [dispatch]);

  useEffect(() => {
    getUser()
  }, [role])

  const getNetworkStatus = async () => {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable);
  };

  useEffect(() => {
    getNetworkStatus();
  });


  const fetchExpensesTotal = async () => {
    try {
      const result = await Alfarooq.get('/expence/total');
      setETotal(result.data);
    } catch (error) {
      console.log(error);
    }
  };


  // const fetchNextData = async () => {
  //   try {
  //     if (curPage === lastPage) {
  //       const result = await Alfarooq.get(`/income?page=${curPage - lastPage + 1}`);
  //       setData(result.data.data);
  //       setCurPage(1);
  //     } else {
  //       const result = await Alfarooq.get(`/income?page=${curPage + 1}`);
  //       setData(result.data.data);
  //       setCurPage(result.data.current_page);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchPrevData = async () => {
  //   try {
  //     const result = await Alfarooq.get(`/income?page=${curPage - 1}`);
  //     setData(result.data.data);
  //     setCurPage(result.data.current_page);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchLastData = async () => {
  //   try {
  //     const result = await Alfarooq.get(`/income?page=${lastPage}`);
  //     setData(result.data.data);
  //     setCurPage(result.data.current_page);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchFirstData = async () => {
  //   try {
  //     const result = await Alfarooq.get(`/income?page=${1}`);
  //     setData(result.data.data);
  //     setCurPage(result.data.current_page);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchExpensesTotal();
  }, []);


  const showScreen = () => {
    if (role === 3) {
      return (
        <View style={styles.topViewUser}>
          <View style={styles.navigationUser}>
            <View style={styles.navigationNums}>
              <Btn text="1"  color={colors.blue} width={perWidth(13)} />
            </View>
            <Btn text="Prev"  color={colors.yellow} width={perWidth(13)} />

            <View style={styles.navigationNums}>
              <Text style={styles.curPageNum}> {currPage} </Text>
            </View>
            <MaterialCommunityIcons name="page-next" size={24} color="black" />
            <View style={styles.navigationNums}>
              <Btn text={lastPage}  color={colors.blue} width={perWidth(13)} />
            </View>
          </View>
        </View>)
    } else {
      return (
        <ImageBackground source={require('../img/bg.jpg')} style={styles.topView}>
          <View style={styles.totalExpenseContainer}>
            <View style={styles.totalExpenseContainerLeft}>
              <MaterialCommunityIcons
                style={styles.totalMoneyIcon}
                name='cash-plus'
                size={30}
                color={colors.light}
              />
            </View>
            <View style={styles.totalExpenseContainerRight}>
              <Text style={styles.topViewText}>مجموعه مرستې</Text>
              <Text style={styles.topViewTextMoney}> {`${totalIncome} افغانۍ`}</Text>
            </View>
          </View>
          <View style={styles.currentMoneyContainer}>
            <View style={styles.currentMoneyContainerLeft}>
              <Ionicons style={styles.totalMoneyIcon} color={colors.light} name="ios-wallet" size={30} />
            </View>
            <View style={styles.currentMoneyContainerRight}>
              <Text style={styles.topViewText}>اوسنۍ پیسې</Text>
              <Text style={styles.topViewTextMoney}> {`${totalIncome - etotal} افغانۍ`}</Text>
            </View>

          </View>
          <View style={styles.navigation}>
            <View style={styles.navigationNums}>
              <Btn borderWidth={1} borderColor={colors.light} textColor={colors.light} text="1" color={colors.darkGray} width={30} height={30} />
            </View>
            <Btn borderWidth={1} borderColor={colors.light} text={<MaterialCommunityIcons name="page-previous" size={24} color={colors.light} />}  color={colors.darkGray} width={perWidth(13)} />

            <View style={styles.navigationNums}>
              <Text style={[styles.curPageNum]}> {currPage} </Text>
            </View>
            <Btn borderWidth={1} borderColor={colors.light} text={<MaterialCommunityIcons name="page-next" size={24} color={colors.light} />} color={colors.darkGray}  width={perWidth(13)} />
            <View style={styles.navigationNums}>
              <Btn borderWidth={1} borderColor={colors.light} textColor={colors.light} text={lastPage}  color={colors.darkGray} width={30} height={30} />
            </View>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity
              style={styles.searchDateIcon}
              onPress={() => navigation.navigate('IncomeSearchDate')}
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
              onPress={() => navigation.navigate('IncomeSearch')}
            >
              <MaterialCommunityIcons
                style={{ color: colors.light }}
                name="database-search"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate('AddIncome')}>
              <Entypo style={{ color: colors.light }} name="add-to-list" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </ImageBackground>)
    }
  }


  return (
    <SafeAreaView>
      {showScreen()}
      {!isConnected ? (
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: colors.red,
            marginVertical: 10,
            padding: 10,
            width: perWidth(50),
            alignSelf: 'center',
            color: colors.light,
            elevation: 10,
            borderRadius: 5,
            fontWeight: 'bold'
          }}
        >
          له انټرنېټ سره اړیکه نشته!
        </Text>
      ) : null}
      <FlatList
        data={incomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <IncomeCard
              navigation={navigation}
              id={item.id}
              name={item.name}
              money={item.amount}
              date={item.date}
            />
          );
        }}
        refreshing={refreshing}
        onRefresh={() => {
          dispatch(getTotalIncome);
          dispatch(getIncomes);
        }}
        style={{
          width: perWidth(100),
          height: role === 3 ? perHeight(100) : perHeight(50),
          marginTop: role === 3 ? perHeight(5) : 0
        }}
        contentContainerStyle={styles.screen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topViewUser: {
    backgroundColor: colors.light,
    height: perHeight(10),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    backgroundColor: colors.light,
    height: perHeight(40),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalExpenseContainer: {
    padding: 5,
    backgroundColor: colors.darkGray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    paddingRight: 20,
    paddingLeft: 5,
    width: 210,
    marginBottom: 5
  },
  currentMoneyContainer: {
    padding: 5,
    backgroundColor: colors.darkGray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    paddingRight: 20,
    paddingLeft: 5,
    width: 210
  },
  totalMoneyIcon: {
    marginRight: 15,
    borderWidth: 1,
    borderColor: colors.light,
    padding: 10,
    textAlign: 'center',
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  topViewText: {
    color: colors.light,
    fontSize: 18
  },
  topViewTextMoney: {
    color: colors.light,
    textAlign: 'right'
  },
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: perHeight(1),
  },
  addIcon: {
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.darkGray,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
  searchIcon: {
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.darkGray,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
    marginBottom: 10,
  },
  loginIcon: {
    fontSize: 30,
    color: colors.darkGray,
    backgroundColor: colors.darkGray,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
    marginBottom: 15,
  },
  searchDateIcon: {
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.darkGray,
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
    backgroundColor: colors.darkGray,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  navigationUser: {
    display: 'flex',
    flexDirection: 'row',
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.darkGray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1
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
    fontSize: 14,
    backgroundColor: colors.darkGray,
    paddingHorizontal: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.light,
    textAlign: 'center'
  },
});
