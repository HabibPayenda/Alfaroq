import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../../env.js'

const Alfarooq = axios.create({
  baseURL:
    api,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
    Connection: 'keep-alive',
  },
});

Alfarooq.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem('token');
    token = token.replace(/['"]+/g, '');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response.message);
  },
);

export default Alfarooq;
