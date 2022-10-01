import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import ExpensesScreen from './src/screens/ExpensesScreen';
import IncomeScreen from './src/screens/IncomeScreen';
import AddIncomeScreen from './src/screens/AddIncomeScreen';
import AddExpenseScreen from './src/screens/AddExpensesScreen';
import IncomeSearchScreen from './src/screens/IncomeSearchScreen';
import ExpensesSearchScreen from './src/screens/ExpensesSearchScreen';
import IncomeSearchDateScreen from './src/screens/IncomeSearchDateScreen';
import ExpensesSearchDateScreen from './src/screens/ExpensesSearchDateScreen';
import OneItemScreen from './src/screens/OneItemScreen';

export default function App() {
  const Drawer = createDrawerNavigator();

  const Stack = createStackNavigator();

  function IncomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="All Incomes" component={IncomeScreen} />
        <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
        <Stack.Screen name="IncomeSearch" component={IncomeSearchScreen} />
        <Stack.Screen name="IncomeSearchDate" component={IncomeSearchDateScreen} />
        <Stack.Screen name="IncomeOneItem" component={OneItemScreen} />
      </Stack.Navigator>
    );
  }
  function ExpenseStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="All Expenses" component={ExpensesScreen} />
        <Stack.Screen name="Add Expense" component={AddExpenseScreen} />
        <Stack.Screen name="ExpencesSearch" component={ExpensesSearchScreen} />
        <Stack.Screen name="ExpencesSearchDate" component={ExpensesSearchDateScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator defaultScreenOptions={IncomeStack}>
        <Drawer.Screen name="مرستې" component={IncomeStack} />
        <Drawer.Screen name="مصارف" component={ExpenseStack} />
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
