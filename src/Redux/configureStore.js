import { configureStore } from '@reduxjs/toolkit';
import expencesSlice from './Expences/expencesSlice';
import incomeSlice from './Income/incomeSlice';
import userSlice from './User/userSlice';

const store = configureStore({
  reducer: {
    userSlice,
    expencesSlice,
    incomeSlice,
  },
});

export default store;