import React from 'react';
import { Provider } from 'react-redux';

import { StyleSheet } from 'react-native';

import store from './src/Redux/configureStore';
import TopNavigationContainer from './src/navigation/TopNavigationContainer';

export default function App() {


  return ( 
  <Provider store={store}>
     <TopNavigationContainer />
  </Provider>);
}

const styles = StyleSheet.create({});
