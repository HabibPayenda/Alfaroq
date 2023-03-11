import { StyleSheet, View, TextInput, ToastAndroid, Modal, Text,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import Btn from '../components/Btn';
import colors from '../functions/colors';
import { perHeight, perWidth } from '../functions/heigthWidth';
import AlfarooqLogin from '../functions/AlfarooqLogin';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
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
    const data = {
      name: name,
      password: password,
      isAdmin: userType
    }
    console.log(data)
    try {
      const result = await AlfarooqLogin.post('/Newregister', data, {
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

  const setViewer = () => {
    setUserType(3);
    setShowModal(false);
  }

  const setUser = () => {
    setUserType(2);
    setShowModal(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.contenttContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>د نوي کاروونکي اضافه کول</Text>
        </View>
        <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="نوم"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="پټه کلیمه"
      />
      <View style={styles.selectUserTypeContainer}>
        <Text style={styles.userTypeText}>{userType === 2 ? 'کاروونکی' : 'کتونکی'}</Text>
        <Btn color={colors.light} textColor={colors.dark} width={180} onClick={() => setShowModal(true)} text="د کاروونکي بڼه وټاکئ!" />
      </View>

      <Modal
        animationType='slide'
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalContentTop}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                 <AntDesign name="closecircleo" size={24} color={colors.light} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContentBottom}>
              <Btn color={colors.light} textColor={colors.dark} width={90} text="کاروونکی" onClick={() => setUser()} />
              <Btn color={colors.light} textColor={colors.dark} width={90} text="کتونکی" onClick={() => setViewer()}/>
            </View>
          </View>
        </View>
      </Modal>
      
      <Btn color={colors.midGray} text="اضافه کول" onClick={() => handleRegister()} />

       </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    paddingVertical: 30,
    backgroundColor: colors.lightGray
  },
  contenttContainer: {
    backgroundColor: colors.darkGray,
    marginTop: perHeight(5),
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 7,
    marginBottom: perHeight(1)
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: colors.light,
  },
  input: {
    width: perWidth(80),
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    elevation: 10
  },
  selectUserTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: perWidth(70)
  },
  userTypeText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold'
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
    borderRadius: 5
  },
  modalContentTop: {
    alignItems: 'flex-end'
  },
  modalContentBottom: {
    paddingHorizontal: 40
  },

});
