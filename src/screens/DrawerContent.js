import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import MenuItem from "../components/MenuItem";
import Logout from "../components/logOut";


const DrawerContent = ({navigation, setLocal}) => {
const [role, setRoll] = useState(null);
const getUser = async () => {
  const user = await JSON.parse(AsyncStorage.getItem('user'));
  console.log(user)
  if(user) {
    setRoll(objUser.isAdmin)
    console.log(JSON.parse(user))
    console.log(role)
  }
}
if(!role) {
  getUser()
}



const adminOptions = () => {
  if(role === 1) {
    return (
      <MenuItem name='add user' path='addUser' navigation={navigation} />
    )
  }
}

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text> Hell</Text>
        <MenuItem name='مرستې' path='مرستې' navigation={navigation} />
        <MenuItem name='مصارف' path='مصارف' navigation={navigation} />
        {adminOptions()}
        <Logout setLocal={setLocal} />
      </View>


    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  }
})
