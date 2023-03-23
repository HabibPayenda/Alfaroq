import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from './MainNavigation';
import AuthNavigation from './AuthNavigation';

import { localSignIn } from '../Redux/User/userSlice';

export default function TopNavigationContainer() {
  const { token } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(localSignIn())
  }, []);


  

  if(token) {
    return (
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
    );
  } else {
    return (
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
    );
}
}
