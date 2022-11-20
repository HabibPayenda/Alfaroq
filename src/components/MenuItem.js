import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import colors from '../functions/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function MenuItem({navigation, path, name}) {
  return (
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate(path)}
    >
    <View style={styles.container}>
    <MaterialCommunityIcons
              style={{ color: colors.darkGray }}
              name="database-search"
              size={32}
              color="black"
            />
      <Text style={styles.text}> {name} </Text>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.light,
    padding: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    elevation: 3
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
