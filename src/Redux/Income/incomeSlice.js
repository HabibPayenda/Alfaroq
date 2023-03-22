import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getIncomes = createAsyncThunk(
  'incomes/getAllIncomes',
  async () => {
   // Code 
  },
);

export const addIncome = createAsyncThunk(
  'incomes/addIncome',
  async (book) => {
    // Code 
  }
);

export const removeIncome = createAsyncThunk('incomes/removeIncome', async (id) => {
 // Code 
});

const initialState = {
  incomes: [],
  loading: 'idle',
};

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getIncomes.fulfilled, (state, action) => {

     // Code

    });

    builder.addCase(addIncome.fulfilled, (state, action) => {
      // Code
    });

    builder.addCase(removeIncome.fulfilled, (state, action) => {
      // Code
    });
  },
});

export default incomeSlice.reducer;