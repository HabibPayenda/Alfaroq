import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const signIn = createAsyncThunk(
  'user/signIn',
  async () => {
   // Code 
  },
);

export const signOut = createAsyncThunk('user/signOut', async (id) => {
 // Code 
});

export const addUser = createAsyncThunk(
  'user/addUser',
  async (book) => {
    // Code 
  }
);

const initialState = {
  user: {},
  loading: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {

     // Code

    });

    builder.addCase(signOut.fulfilled, (state, action) => {
      // Code
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      // Code
    });
  },
});

export default userSlice.reducer;