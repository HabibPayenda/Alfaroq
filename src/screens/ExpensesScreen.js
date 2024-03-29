import { StyleSheet, Text, SafeAreaView, View, FlatList, TouchableOpacity, ImageBackground, Dimensions, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';


import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import ExpenseCard from '../components/ExpensesCard';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchExpencePageWithPageNumber, fetchExpencePageWithUrl, searchExpences } from '../Redux/Expences/expencesSlice';
import { useDispatch, useSelector } from 'react-redux';
import ToastMaker from '../functions/ToastMaker';


const deviceHeigth = Dimensions.get('window').height;


export default function ExpensesScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [role, setRoll] = useState(null);
  const [date, setDate] = useState('');


  const dispatch = useDispatch();
  const { totalExpences, prevPageUrl, nextPageUrl, expences, currPage, lastPage, firstPage, loading } = useSelector((state) => state.expenseSlice);
  const { totalIncome } = useSelector((state) => state.incomeSlice);
  const { user } = useSelector((state) => state.userSlice);


  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user)
    if (user) {
      setRoll(user.isAdmin)
    }
  }

  useEffect(() => {
    getUser()
  }, [role])

  const searchExpencesByDate = async () => {
    try {
      if (date === '') {
        dispatch(fetchExpencePageWithPageNumber(firstPage))
      } else {
        dispatch(searchExpences(date))
      }
    } catch (error) {
      return error
    }
  };

  const showScreen = () => {
    if (role === 3) {
      return (
        <View style={styles.topViewUser}>
          <View style={styles.userNavigation}>
            <View style={styles.navigationNums}>
              <Btn onClick={() => prevPageUrl !== null ? dispatch(fetchExpencePageWithPageNumber(firstPage)) : ToastMaker('همدا لومړۍ صفحه ده!')} borderWidth={1} borderColor={colors.light} textColor={colors.light} text="1" color={colors.darkGray} width={30} height={30} />
            </View>
            <Btn onClick={() => prevPageUrl !== null ? dispatch(fetchExpencePageWithUrl(prevPageUrl)) : ToastMaker('همدا لومړۍ صفحه ده!')} borderWidth={1} borderColor={colors.light} text={<MaterialCommunityIcons name="page-previous" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />

            <View style={styles.navigationNums}>
              <Text style={styles.curPageNum}> {currPage} </Text>
            </View>
            <Btn onClick={() => nextPageUrl !== null ? dispatch(fetchExpencePageWithUrl(nextPageUrl)) : ToastMaker('همدا آخري صفحه ده!')} borderWidth={1} borderColor={colors.light} text={<MaterialCommunityIcons name="page-next" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />
            <View style={styles.navigationNums}>
              <Btn onClick={() => nextPageUrl !== null ? dispatch(fetchExpencePageWithPageNumber(lastPage)) : ToastMaker('همدا آخري صفحه ده!')} borderWidth={1} borderColor={colors.light} textColor={colors.light} text={lastPage} color={colors.darkGray} width={30} height={30} />
            </View>
          </View>
          <View style={styles.contenttContainer} >
            <View style={styles.searchInputContainer}>
              <Btn marginVertical={0.0001} icon={<FontAwesome name="search" size={24} color={colors.darkGray} />} text="لټون" color={colors.light} textColor={colors.dark} width={80} onClick={searchExpencesByDate} />
              <TextInput placeholder='د لګښت نېټه د ننه کړئ!' keyboardType='default' style={styles.input} value={date} onChangeText={(text) => setDate(text)} />
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
              <Text style={styles.topViewText}>ټولې لګونې </Text>
              <Text style={styles.topViewTextMoney}> {`${totalExpences} افغانۍ`}</Text>
            </View>
          </View>
          <View style={styles.currentMoneyContainer}>
            <View style={styles.currentMoneyContainerLeft}>
              <Ionicons style={styles.totalMoneyIcon} color={colors.light} name="ios-wallet" size={30} />
            </View>
            <View style={styles.currentMoneyContainerRight}>
              <Text style={styles.topViewText}>اوسنۍ پیسې</Text>
              <Text style={styles.topViewTextMoney}> {`${totalIncome - totalExpences} افغانۍ`}</Text>
            </View>
          </View>
          <View style={styles.navigation}>
            <View style={styles.navigationNums}>
              <Btn onClick={() => prevPageUrl !== null ? dispatch(fetchExpencePageWithPageNumber(firstPage)) : ToastMaker('همدا لومړۍ صفحه ده!')} borderWidth={1} borderColor={colors.light} textColor={colors.light} text="1" color={colors.darkGray} width={30} height={30} />
            </View>
            <Btn onClick={() => prevPageUrl !== null ? dispatch(fetchExpencePageWithUrl(prevPageUrl)) : ToastMaker('همدا لومړۍ صفحه ده!')} borderWidth={1} borderColor={colors.light} text={<MaterialCommunityIcons name="page-previous" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />

            <View style={styles.navigationNums}>
              <Text style={styles.curPageNum}> {currPage} </Text>
            </View>
            <Btn onClick={() => nextPageUrl !== null ? dispatch(fetchExpencePageWithUrl(nextPageUrl)) : ToastMaker('همدا آخري صفحه ده!')} borderWidth={1} borderColor={colors.light} text={<MaterialCommunityIcons name="page-next" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />
            <View style={styles.navigationNums}>
              <Btn onClick={() => nextPageUrl !== null ? dispatch(fetchExpencePageWithPageNumber(lastPage)) : ToastMaker('همدا آخري صفحه ده!')} borderWidth={1} borderColor={colors.light} textColor={colors.light} text={lastPage} color={colors.darkGray} width={30} height={30} />
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
        </ImageBackground>)
    }
  }


  return (
    <SafeAreaView>
      {showScreen()}
      <View style={{ alignItems: 'center' }}>
        {loading === "loading" ?
          <Lottie
            autoPlay
            loop
            source={require('../../assets/lottie/loadingLottieLine.json')}
            style={{ zIndex: 100 }}
          /> : null}
        <FlatList
          data={expences}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ExpenseCard isAdmin={user.isAdmin} navigation={navigation} id={item.id} discription={item.discription} money={item.amount} date={item.date} />
            );
          }}
          refreshing={refreshing}
          onRefresh={() => {
            dispatch(fetchExpencePageWithPageNumber(firstPage))
          }}
          style={{
            width: perWidth(100),
            height: user.isAdmin === 3 ? perHeight(77) : perHeight(55),
          }}
          contentContainerStyle={styles.screen}
        >
          <ExpenseCard />
          <ExpenseCard />
        </FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topViewUser: {
    backgroundColor: colors.light,
    height: perHeight(15),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: perHeight(1)
  },
  contenttContainer: {
    backgroundColor: colors.darkGray,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 10,
    borderRadius: 7,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: colors.light,
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5
  },
  input: {
    width: perWidth(60),
    height: 40,
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
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
  userNavigation: {
    display: 'flex',
    flexDirection: 'row',
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
