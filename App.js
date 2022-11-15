import React, {useState} from 'react';

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainNavigation from './src/navigation/MainNavigation'
import AuthNavigation from './src/navigation/AuthNavigation'

export default function App() {
  const [local, setLocal] = useState(false);

  const getToken = async () => {
    const localToken = await AsyncStorage.getItem("token");
    const dToken = localToken !== null ? true : false;
    dToken === true ? setLocal(true) : setLocal(false);
  };
  getToken();

  console.log(local)


  if(local) {
    return (
      <NavigationContainer>
       <MainNavigation setLocal={setLocal}/>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthNavigation setLocal={setLocal} />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
