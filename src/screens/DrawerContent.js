import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import MenuItem from "../components/MenuItem";
import Logout from "../components/logOut";
import colors from "../functions/colors";


const DrawerContent = ({navigation, setLocal}) => {
const [role, setRoll] = useState(null);
const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  console.log(user)
  if(user) {
    const userObj = JSON.parse(user);
    setRoll(userObj.isAdmin)
    console.log(role)
  }
}
if(!role) {
  getUser()
}



const adminOptions = () => {
  if(role === 1) {
    return (
      <MenuItem iconName='account' name='کاروونکي' path='کاروونکی' navigation={navigation} />
      )
  }
}

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('./../../assets/logo.png')} />

        </View>
        <MenuItem iconName='cash-plus' name='مرستې' path='مرستې' navigation={navigation} />
        <MenuItem iconName='cash-minus' name='لګونې' path='لګونې' navigation={navigation} />
        {adminOptions()}
        <Logout iconName='logout' setLocal={setLocal} />
      </View>


    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoContainer: {
    backgroundColor: colors.darkGray,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginVertical: 20
  }
})
