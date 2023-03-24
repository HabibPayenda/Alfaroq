import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AlfarooqLogin from '../../functions/AlfarooqLogin';
import ToastMaker from '../../functions/ToastMaker';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (data) => {
   // Code 
   try {
    const result = await AlfarooqLogin.post('/login', {name: data.name, password: data.password}, {
      onUploadProgress: (progress) => {
        if (progress.loaded / progress.total === 1) {
          ToastMaker('ننوتل')
        }
      },
    });
    await AsyncStorage.setItem('token', result.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(result.data.user));
    return result.data
  } catch (error) {
    console.log(error)
    showToastError();
    return error;
  }
  },
);

export const localSignIn = createAsyncThunk('user/localSignIn', async () => {
 // Code 
 const token = await AsyncStorage.getItem('token');
 const user = await AsyncStorage.getItem('user');
 return {token, user};
});

export const signOut = createAsyncThunk('user/signOut', async () => {
 // Code 
 await AsyncStorage.removeItem('token');
 await AsyncStorage.removeItem('user');
 return null;
});

export const addUser = createAsyncThunk(
  'user/addUser',
  async (book) => {
    // Code 
  }
);

const initialState = {
  user: {},
  token: null,
  noToken: null,
  loading: 'idle',
  role: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
     // Code
     state.token = action.payload.token;
     state.user = action.payload.user;
    });

    builder.addCase(localSignIn.fulfilled, (state, action) => {
      // Code
      state.token = action.payload.token;
      state.user = action.payload.user;
    });

    builder.addCase(signOut.fulfilled, (state, action) => {
      // Code
      state.token = action.payload;
      state.user = {};
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      // Code
    });
  },
});

export default userSlice.reducer;