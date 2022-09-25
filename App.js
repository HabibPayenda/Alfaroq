import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';


import ExpensesScreen from './src/screens/ExpensesScreen';
import IncomeScreen from './src/screens/IncomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import AddIncomeScreen from './src/screens/AddIncomeScreen';

export default function App() {
  const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function IncomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Incomes" component={IncomeScreen} />
      <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
    </Stack.Navigator>
  );
}

const newStack = IncomeStack();

  return (
    <NavigationContainer>
      <Drawer.Navigator defaultScreenOptions={IncomeStack}>
      <Drawer.Screen name="Incomes" component={IncomeStack} />
      <Drawer.Screen name="Expenses" component={ExpensesScreen} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
