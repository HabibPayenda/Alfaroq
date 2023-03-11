import { StyleSheet, View, TextInput, ToastAndroid, Modal, Text } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import Btn from '../components/Btn';
import colors from '../functions/colors';
import { perHeight, perWidth } from '../functions/heigthWidth';
import AlfarooqLogin from '../functions/AlfarooqLogin';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(3);

  function showToast() {
    ToastAndroid.show('صبر وکړئ!', ToastAndroid.SHORT);
  }

  function showToastSuccess() {
    ToastAndroid.show(`${name} اضافه شو!`, ToastAndroid.SHORT);
  }

  function showToastError() {
    ToastAndroid.show('اشتباه!', ToastAndroid.SHORT);
  }

  const handleRegister = async () => {
    try {
      const result = await AlfarooqLogin.post('/register', {name: name, password: password, isAdmin: isAdmin}, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            showToast();
          }
        },
      });

      if(result.data.user) {
        showToastSuccess()
      }

    } catch (error) {
      console.log(error)
      showToastError();
      return error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="نوم"
      />
      <TextInput
        style={styles.input}
        value={isAdmin}
        onChangeText={(text) => setPassword(text)}
        placeholder="پټه کلیمه"
      />
      <View style={styles.selectUserTypeContainer}>
        <Text>{userType === 2 ? 'کاروونکی' : 'کتونکی'}</Text>
        <Btn onClick={() => setShowModal(true)} text="د کاروونکي بڼه وټاکې!" />
      </View>

      <Modal
        animationType='slide'
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Btn color={colors.light} textColor={colors.dark} width={90} text="کاروونکی" />
            <Btn color={colors.light} textColor={colors.dark} width={90} text="کتونکی" />
          </View>
        </View>
      </Modal>
      
      <Picker
        style={styles.select}
        selectedValue={isAdmin}
        onValueChange={(itemValue, itemIndex) => setIsAdmin(itemValue)}
      >
        <Picker.Item label="کتونکی" value={3} />
        <Picker.Item label="بدلون راوستونکی" value={2} />
      </Picker>
      <Btn color={colors.midGray} text="اضافه کول" onClick={() => handleRegister()} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
   },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: perWidth(80),
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: colors.light,
    elevation: 10,
  },
  selectUserTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: perWidth(70)
  },
  modal: {
    width: perWidth(100),
    height: perHeight(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.darkGray,
    padding: 15, 
    paddingHorizontal: 40,
    borderRadius: 5
  },
  select: {
    width: perWidth(80),
    backgroundColor: colors.light,
    elevation: 10,
  },
});
