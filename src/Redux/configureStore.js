import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from './Expences/expencesSlice'
import incomeSlice from './Income/incomeSlice';
import userSlice from './User/userSlice';

const store = configureStore({
  reducer: {
    userSlice,
    expenseSlice,
    incomeSlice,
  },
});

export default store;