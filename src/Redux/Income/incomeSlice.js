import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Alfarooq from '../../functions/Alfarooq';


export const getTotalIncome = createAsyncThunk(
  'incomes/getAllIncomesTotal',
  async () => {
   // Code 
   try {
    const result = await Alfarooq.get('/income/total');
    return result.data;
  } catch (error) {
    console.log(error);
  }
  },
);

export const getIncomes = createAsyncThunk(
  'incomes/getAllIncomes',
  async () => {
   // Code 
   try {
    const result = await Alfarooq.get('/income');
    return result.data;
  } catch (error) {
    console.log(error);
  }
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
  currPage: 0,
  lastPage: 0,
  nextPageUrl: '',
  prevPageUrl: '',
  totalIncome: 0,
  loading: 'idle',
};

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTotalIncome.fulfilled, (state, action) => {
      state.totalIncome = action.payload
    });

    builder.addCase(getIncomes.fulfilled, (state, action) => {
      state.currPage = action.payload.current_page;
      state.incomes = action.payload.data;
      state.nextPageUrl = action.payload.next_page_url;
      state.prevPageUrl = action.payload.prev_page_url;
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