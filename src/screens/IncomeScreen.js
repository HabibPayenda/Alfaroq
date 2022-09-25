import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IncomeCard from '../components/IncomeCard';
import { perHeight, perWidth } from '../functions/heigthWidth';
import colors from '../functions/colors';
import Alfarooq from '../functions/Alfarooq';

export default function IncomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const result = await Alfarooq.get('/income');
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [newData]);
  return (
    <SafeAreaView>
      <View style={styles.topView}>
        <Text style={styles.topViewText}>IncomeScreen</Text>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => navigation.navigate('IncomeSearch')}
        >
          <MaterialCommunityIcons style={{color: colors.light}} name="database-search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => navigation.navigate('AddIncome')}
        >
          <Entypo style={{ color: colors.light }} name="add-to-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <IncomeCard name={item.name} money={item.amount} date={item.date} />;
        }}
        refreshing={refreshing}
        onRefresh={() => fetchData()}
        style={{ width: perWidth(100), height: perHeight(50), backgroundColor: colors.light }}
        contentContainerStyle={styles.screen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: colors.darkGray,
    height: perHeight(30),
    width: perWidth(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topViewText: {
    fontSize: 18,
    color: 'white',
  },
  screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: perHeight(1),
  },
  addIcon: {
    position: 'absolute',
    bottom: perHeight(5),
    right: perWidth(5),
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
  searchIcon: {
    position: 'absolute',
    bottom: perHeight(5),
    right: perWidth(20),
    fontSize: 30,
    color: colors.light,
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
});
