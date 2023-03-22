import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getExpences = createAsyncThunk(
  'expences/getAllExpences',
  async () => {
   // Code 
  },
);

export const addExpence = createAsyncThunk(
  'expences/addExpence',
  async (book) => {
    // Code 
  }
);

export const removeExpence = createAsyncThunk('expences/removeExpences', async (id) => {
 // Code 
});

const initialState = {
  expences: [],
  loading: 'idle',
};

export const expencesSlice = createSlice({
  name: 'expences',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getExpences.fulfilled, (state, action) => {

     // Code

    });

    builder.addCase(addExpence.fulfilled, (state, action) => {
      // Code
    });

    builder.addCase(removeExpence.fulfilled, (state, action) => {
      // Code
    });
  },
});

export default expencesSlice.reducer;