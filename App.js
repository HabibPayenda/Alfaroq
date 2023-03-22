import React, {useState} from 'react';
import { Provider } from 'react-redux';

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainNavigation from './src/navigation/MainNavigation'
import AuthNavigation from './src/navigation/AuthNavigation'

import store from './src/Redux/configureStore';

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
      <Provider store={store}>
        <NavigationContainer>
        <MainNavigation setLocal={setLocal}/>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AuthNavigation setLocal={setLocal} />
        </NavigationContainer>
      </Provider>
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
