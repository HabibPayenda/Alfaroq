import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';

import { localSignIn } from '../Redux/User/userSlice';
import { getExpences, getTotalExpences } from '../Redux/Expences/expencesSlice';
import { getIncomes, getTotalIncome } from '../Redux/Income/incomeSlice';

export default function TopNavigationContainer() {
  const { token } = useSelector((state) => state.userSlice);
  const { totalExpences } = useSelector((state) => state.expenseSlice);
  const { incomesDataLoaded } = useSelector((state) => state.incomeSlice);
  const dispatch = useDispatch();
  
  const init = () => {
    dispatch(getTotalIncome());
    dispatch(getTotalExpences());
    dispatch(getIncomes());
    dispatch(getExpences());
  }
 
  useEffect(() => {
    dispatch(localSignIn())
  }, []);

  console.log(totalExpences);

  if (token && !incomesDataLoaded) {
    init();
  }
  else if(token && incomesDataLoaded) {
    return (
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
  ); 
    
  } else if (!token) {
    return (
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
  );
  }
}
