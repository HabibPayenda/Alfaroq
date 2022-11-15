import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const StackNavigator = ({setLocal}) => {

  return (
  <Stack.Navigator>
    <Stack.Screen
      name="login"
      options={{ headerShown: false }}
     >
       {(props) => <LoginScreen setLocal={setLocal} {...props} />}
     </Stack.Screen>
  </Stack.Navigator>
)
}

export default StackNavigator;
