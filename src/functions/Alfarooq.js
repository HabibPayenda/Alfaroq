import axios from 'axios';

// eslint-disable-next-line import/no-mutable-exports

const Alfarooq = axios.create({
  baseURL:
    'http://10.10.10.248:8000/api',
  headers: {
    // Accept: 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
    // Connection: 'keep-alive'
  },
});

export default Alfarooq;