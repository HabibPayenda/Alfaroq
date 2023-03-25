import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';

import { localSignIn } from '../Redux/User/userSlice';
import { getExpences, getTotalExpences } from '../Redux/Expences/expencesSlice';
import { getIncomes, getTotalIncome } from '../Redux/Income/incomeSlice';
import { StatusBar } from 'expo-status-bar';

export default function TopNavigationContainer() {
  const { token, user } = useSelector((state) => state.userSlice);
  const { incomesDataLoaded } = useSelector((state) => state.incomeSlice);
  const dispatch = useDispatch();
  
  const init = () => {
    dispatch(getTotalIncome());
    dispatch(getTotalExpences());
    dispatch(getExpences());
    dispatch(getIncomes());
  }

 
  useEffect(() => {
    if (!token) {
      dispatch(localSignIn())
    } else if (token && !incomesDataLoaded) {
      init();
    }
  }, [token, incomesDataLoaded]);

  if (token && incomesDataLoaded) {
    return (
      <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <MainNavigation user={user} />
      </NavigationContainer>
      </>
  ); 
    
  } else if (!token) {
    return (
      <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
      </>
  );
  }
}
