import { StyleSheet, View, TextInput, Modal, Text,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


import Btn from '../components/Btn';
import colors from '../functions/colors';
import { perHeight, perWidth } from '../functions/heigthWidth';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/User/userSlice';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(3);

  const dispatch = useDispatch();

  const handleRegister = async () => {
    const data = {
      name: name,
      password: password,
      isAdmin: userType
    }
    dispatch(addUser(data))
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
       </View>
       <Btn icon={<FontAwesome5 name="check-circle" size={24} color={colors.darkGray} />} color={colors.light} textColor={colors.dark} width={90} text="ذخیره" onClick={() => handleRegister()} />
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
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: colors.light,
    marginBottom: 10
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
    width: perWidth(70),
    marginBottom: 10
  },
  userTypeText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold'
  },
  modal: {
    width: perWidth(100),
    height: perHeight(80),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: perHeight(20)
  },
  modalContent: {
    backgroundColor: colors.darkGray,
    padding: 15, 
    borderRadius: 5,
    borderColor: colors.light,
    borderWidth: 1,
    elevation: 10
  },
  modalContentTop: {
    alignItems: 'flex-end'
  },
  modalContentBottom: {
    paddingHorizontal: 40
  },

});
