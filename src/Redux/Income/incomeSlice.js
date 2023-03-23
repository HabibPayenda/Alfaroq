import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Alfarooq from '../../functions/Alfarooq';
import ToastMaker from '../../functions/ToastMaker';


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
  async (data) => {
    // Code 
    try {  
      const result = await Alfarooq.post('/income', data, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            ToastMaker('معلومات ذخیره شول!')
          }
        },
      });
      return result.data;
    } catch (error) {
      ToastMaker('معلومات ناسم دي!')
      return error;
    }
  }
);

export const removeIncome = createAsyncThunk('incomes/removeIncome', async (id) => {
 // Code 
 try {
  const result = await Alfarooq.delete(`/income/${id}`);
  if (result.data === 1) {
    ToastMaker('معلومات له منځه لاړل!')
  }
  return id;
} catch (error) {
  console.log(error)
  ToastMaker('له سره هڅه وکړئ!')
  return error;
}
});

export const updateIncome = createAsyncThunk('incomes/updateIncome', async ({id, name, amount}) => {
 // Code 
 try {
  const result = await Alfarooq.patch(`/income/${id}`, {name, amount}, {
    onUploadProgress: (progress) => {
      if (progress.loaded / progress.total === 1) {
        ToastMaker('معلوماتو بدلون وموند!')
      }
    },
  });
  console.log(result.data)
  return result.data;
} catch (error) {
  console.log(error);
  ToastMaker('بیا هڅه وکړئ!')
  return error;
}
});


export const fetchPageWithUrl = createAsyncThunk('incomes/fetchPageWithUrl', async (url) => {
 // Code 
  try {
    const response = await Alfarooq.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchPageWithPageNumber = createAsyncThunk('incomes/fetchPageWithPageNumber', async (pageNumber) => {
 // Code 
  try {
    const response = await Alfarooq.get(`/income?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const initialState = {
  incomes: [],
  currPage: 0,
  lastPage: 0,
  firstPage: 1,
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
      state.lastPage = action.payload.last_page;
      state.incomes = action.payload.data;

      if (action.payload.next_page_url !== null) {
        state.nextPageUrl = action.payload.next_page_url.slice(31);
      } else {
        state.nextPageUrl = action.payload.next_page_url;
      }

      if (action.payload.prev_page_url !== null) {
        state.prevPageUrl = action.payload.prev_page_url.slice(31);
      } else {
        state.prevPageUrl = action.payload.prev_page_url;
      }

    });

    builder.addCase(addIncome.fulfilled, (state, action) => {
      // Code
      state.incomes = [action.payload, ...state.incomes]
      state.totalIncome += (action.payload.amount * 1);
    });

    builder.addCase(removeIncome.fulfilled, (state, action) => {
      // Code
      const item = state.incomes.filter((item) => item.id === action.payload);
      state.totalIncome -= (item[0].amount * 1);
      state.incomes = state.incomes.filter((item) => item.id !== action.payload);
    });
    
    builder.addCase(updateIncome.fulfilled, (state, action) => {
      // Code
      state.incomes = state.incomes.map((item) => {
        if(item.id === action.payload.id) {
          item.amount = action.payload.amount;
          item.name = action.payload.name;
        }
        return item;
      })
    });

    builder.addCase(fetchPageWithUrl.pending, (state, action) => {
      state.loading = "loading";
    });
    
    builder.addCase(fetchPageWithUrl.fulfilled, (state, action) => {
      state.loading = "ideal";
      state.currPage = action.payload.current_page;
      state.lastPage = action.payload.last_page;
      state.incomes = action.payload.data;

      if (action.payload.next_page_url !== null) {
        state.nextPageUrl = action.payload.next_page_url.slice(31);
      } else {
        state.nextPageUrl = action.payload.next_page_url;
      }

      if (action.payload.prev_page_url !== null) {
        state.prevPageUrl = action.payload.prev_page_url.slice(31);
      } else {
        state.prevPageUrl = action.payload.prev_page_url;
      }
    });

    builder.addCase(fetchPageWithPageNumber.pending, (state, action) => {
      state.loading = "loading";
    });

    builder.addCase(fetchPageWithPageNumber.fulfilled, (state, action) => {
      state.loading = "ideal"
      state.currPage = action.payload.current_page;
      state.lastPage = action.payload.last_page;
      state.incomes = action.payload.data;

      if (action.payload.next_page_url !== null) {
        state.nextPageUrl = action.payload.next_page_url.slice(31);
      } else {
        state.nextPageUrl = action.payload.next_page_url;
      }

      if (action.payload.prev_page_url !== null) {
        state.prevPageUrl = action.payload.prev_page_url.slice(31);
      } else {
        state.prevPageUrl = action.payload.prev_page_url;
      }
    });
  },
});

export default incomeSlice.reducer;