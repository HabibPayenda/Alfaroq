import React, {useState, useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../screens/DrawerContent";
import IncomeScreen from "../screens/IncomeScreen";
import AddIncomeScreen from "../screens/AddIncomeScreen";
import IncomeSearchScreen from "../screens/IncomeSearchScreen";
import IncomeSearchDateScreen from "../screens/IncomeSearchDateScreen";
import OneItemScreen from "../screens/OneItemScreen";
import ExpensesScreen from "../screens/ExpensesScreen";
import AddExpenseScreen from "../screens/AddExpensesScreen";
import ExpensesSearchScreen from "../screens/ExpensesSearchScreen";
import ExpensesSearchDateScreen from "../screens/ExpensesSearchDateScreen";
import ExpensesEditScreen from "../screens/ExpensesEditScreen";
import LoginScreen from "../screens/LoginScreen";
import AddUserScreen from "../screens/AddUserScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserExpensesScreen from "../screens/UserExpensesScreen";
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
      {

      }
      <Stack.Screen name="All Expenses" component={ExpensesScreen} />
      <Stack.Screen name="Add Expense" component={AddExpenseScreen} />
      <Stack.Screen name="ExpencesSearch" component={ExpensesSearchScreen} />
      <Stack.Screen name="ExpencesSearchDate" component={ExpensesSearchDateScreen} />
      <Stack.Screen name="ExpencesEdit" component={ExpensesEditScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();



const DrawerNavigator = ({ setLocal }) => {

return (
  <Drawer.Navigator
   defaultScreenOptions={IncomeStack}
   drawerContent={(props) => <DrawerContent {...props} setLocal={setLocal} />}
   >
  <Drawer.Screen name="مرستې" component={IncomeStack} />
  <Drawer.Screen name="مصارف" component={ExpenseStack} />
  <Drawer.Screen name="کارونکی" component={AddUserScreen} />
</Drawer.Navigator>
)}

export default DrawerNavigator;
