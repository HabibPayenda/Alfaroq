import React from "react";
import {
  StyleSheet,
  View,
  Image
} from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import MenuItem from "../components/MenuItem";
import Logout from "../components/logOut";
import colors from "../functions/colors";
import { useSelector } from "react-redux";


const DrawerContent = ({ navigation }) => {

const { user } = useSelector((state) => state.userSlice);

console.log(user);

const adminOptions = () => {
  if(user.isAdmin === 1) {
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
        <Logout iconName='logout' />
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
