import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import colors from '../functions/colors'
import { useDispatch } from 'react-redux';
import { signOut } from '../Redux/User/userSlice';

export default function Logout({iconName}) {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(signOut())
  }
  
  return (
    <TouchableWithoutFeedback
    onPress={() => {
      logout()
    }}
    >
    <View style={styles.container}>
    <MaterialCommunityIcons
              style={{ color: colors.light }}
              name={iconName}
              size={32}
              color="black"
            />
      <Text style={styles.text}> وتل </Text>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.darkGray,
    padding: 8,
    paddingHorizontal: 15,
    marginTop: 20,
    elevation: 3
  },
  text: {
    fontSize: 16,
    color: colors.light,
    fontWeight: 'bold'
  }
})
