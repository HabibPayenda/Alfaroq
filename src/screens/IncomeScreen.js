import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, ImageBackground, Dimensions, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import * as Network from 'expo-network';
import Lottie from 'lottie-react-native';

import IncomeCard from '../components/IncomeCard';
import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Btn from '../components/Btn';

import { useDispatch, useSelector } from 'react-redux';
import ToastMaker from '../functions/ToastMaker';
import { fetchPageWithPageNumber, fetchPageWithUrl } from '../Redux/Income/incomeSlice';



const deviceHeigth = Dimensions.get('window').height;



export default function IncomeScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(true);
  const [refreshing] = useState(false);
  const [name, setName] = useState('');


  const dispatch = useDispatch();
  const { totalIncome, prevPageUrl, nextPageUrl, incomes, currPage, lastPage, firstPage, loading } = useSelector((state) => state.incomeSlice);
  const { totalExpences } = useSelector((state) => state.expenseSlice);
  const { user } = useSelector((state) => state.userSlice);

  const getNetworkStatus = async () => {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable);
  };

  useEffect(() => {
    getNetworkStatus();
  });

  const searchIncome = async () => {
    try {
      const response = await Alfarooq.get(`/income/search/${name}`, null , {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            ToastMaker('صبر وکړئ!')
          }
        },
      });
      console.log(response)
    } catch (error) {
      console.log(error);
      ToastMaker('اشتباه!')
    }
  };

  console.log(user)


  const showScreen = () => {
    if (user.isAdmin === 3) {
      return (
        <View style={styles.topViewUser}>
          <View style={styles.contenttContainer} >
            <View style={styles.titleContainer} >
              <Text style={styles.title}>د مرستو لټون</Text>
            </View>
            <TextInput placeholder='د مرسته کوونکي نوم د ننه کړئ!' keyboardType='default' style={styles.input} value={name} onChangeText={(text) => setName(text)} />
            <Btn icon={<FontAwesome name="search" size={24} color={colors.darkGray} />} text="لټون" color={colors.light} textColor={colors.dark} width={80} onClick={searchIncome} />
          </View>
          <View style={styles.navigation}>
            <View style={styles.navigationNums}>
              <Btn borderWidth={1} borderColor={colors.light} textColor={colors.light} text="1" color={colors.darkGray} width={30} height={30} onClick={() => currPage !== firstPage ? dispatch(fetchPageWithPageNumber(firstPage)) : ToastMaker('همدا لومړۍ صفحه ده!')} />
            </View>
            <Btn borderWidth={1} borderColor={colors.light} onClick={() => prevPageUrl !== null ? dispatch(fetchPageWithUrl(prevPageUrl)) : ToastMaker('همدا لومړۍ صفحه ده!')} text={<MaterialCommunityIcons name="page-previous" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />

            <View style={styles.navigationNums}>
              <Text style={[styles.curPageNum]}> {currPage} </Text>
            </View>
            <Btn borderWidth={1} borderColor={colors.light} onClick={() => nextPageUrl !== null ? dispatch(fetchPageWithUrl(nextPageUrl)) : ToastMaker('همدا آخري صفحه ده!')} text={<MaterialCommunityIcons name="page-next" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />
            <View style={styles.navigationNums}>
              <Btn borderWidth={1} borderColor={colors.light} textColor={colors.light} text={lastPage} onClick={() => currPage !== lastPage ? dispatch(fetchPageWithPageNumber(lastPage)) : ToastMaker('همدا آخري صفحه ده!')} color={colors.darkGray} width={30} height={30} />
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
              <Text style={styles.topViewTextMoney}> {`${totalIncome - totalExpences} افغانۍ`}</Text>
            </View>

          </View>
          <View style={styles.navigation}>
            <View style={styles.navigationNums}>
              <Btn borderWidth={1} borderColor={colors.light} textColor={colors.light} text="1" color={colors.darkGray} width={30} height={30} onClick={() => currPage !== firstPage ? dispatch(fetchPageWithPageNumber(firstPage)) : ToastMaker('همدا لومړۍ صفحه ده!')} />
            </View>
            <Btn borderWidth={1} borderColor={colors.light} onClick={() => prevPageUrl !== null ? dispatch(fetchPageWithUrl(prevPageUrl)) : ToastMaker('همدا لومړۍ صفحه ده!')} text={<MaterialCommunityIcons name="page-previous" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />

            <View style={styles.navigationNums}>
              <Text style={[styles.curPageNum]}> {currPage} </Text>
            </View>
            <Btn borderWidth={1} borderColor={colors.light} onClick={() => nextPageUrl !== null ? dispatch(fetchPageWithUrl(nextPageUrl)) : ToastMaker('همدا آخري صفحه ده!')} text={<MaterialCommunityIcons name="page-next" size={24} color={colors.light} />} color={colors.darkGray} width={perWidth(13)} />
            <View style={styles.navigationNums}>
              <Btn borderWidth={1} borderColor={colors.light} textColor={colors.light} text={lastPage} onClick={() => currPage !== lastPage ? dispatch(fetchPageWithPageNumber(lastPage)) : ToastMaker('همدا آخري صفحه ده!')} color={colors.darkGray} width={30} height={30} />
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
      <View style={{ alignItems: 'center' }}>
        {loading === "loading" ?
          <Lottie
            autoPlay
            loop
            source={require('../../assets/lottie/loadingLottieLine.json')}
            style={{ zIndex: 100 }}
          /> : null}
        {incomes.length > 0 ? <FlatList
          data={incomes}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => {
            return (
              <IncomeCard
                isAdmin={user.isAdmin}
                navigation={navigation}
                id={item?.id}
                name={item?.name}
                money={item?.amount}
                date={item?.date}
              />
            );
          }}
          refreshing={refreshing}
          onRefresh={() => {
            dispatch(fetchPageWithPageNumber(firstPage));
          }}
          style={{
            width: perWidth(100),
            height: user.isAdmin === 3 ? perHeight(70) : perHeight(55),
          }}
          contentContainerStyle={styles.screen}
        /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topViewUser: {
    backgroundColor: colors.white,
    height: perHeight(20),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (deviceHeigth / 100) * 3,
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
