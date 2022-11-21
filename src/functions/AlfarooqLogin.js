import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../../env'



// eslint-disable-next-line import/no-mutable-exports

const AlfarooqLogin = axios.create({
  baseURL:
    api,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
    Connection: 'keep-alive',
  },
});


export default AlfarooqLogin;
