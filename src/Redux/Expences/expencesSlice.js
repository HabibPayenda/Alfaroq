import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Alfarooq from '../../functions/Alfarooq';
import ToastMaker from '../../functions/ToastMaker';


export const getTotalExpences = createAsyncThunk(
  'expences/getAllExpencesTotal',
  async () => {
   // Code 
   try {
    const result = await Alfarooq.get('/expence/total');
    return result.data;
  } catch (error) {
    console.log(error);
  }
  },
);


export const getExpences = createAsyncThunk(
  'expences/getAllExpences',
  async () => {
   // Code 
   try {
    const result = await Alfarooq.get('/expence')
    return result.data;
  } catch (error) {
    console.log(error);
  }
  },
);

export const addExpence = createAsyncThunk(
  'expences/addExpence',
  async (params) => {
    // Code 
    try {  
      const result = await Alfarooq.post('/expence', params.data, {
        onUploadProgress: (progress) => {
          if (progress.loaded / progress.total === 1) {
            ToastMaker('معلومات ذخیره شول!')
            params.setDesc('');
            params.setMoney('');
          }
        },
      });
        return result.data;
    } catch (error) {
      ToastMaker('له سره هڅه وکړئ!')
      return error;
    }
  }
);


export const removeExpence = createAsyncThunk('expences/removeExpence', async (id) => {
 // Code 
 try {
  const result = await Alfarooq.delete(`/expence/${id}`);
  if (result.data === 1) {
    ToastMaker("معلومات له منځه لاړل!")
  }
  return id;
} catch (error) {
  console.log(error)
  ToastMaker("له سره هڅه وکړئ!")
  return error;
}
});

export const updateExpence = createAsyncThunk('expences/updateExpence', async (data) => {
  // Code 
  try {
    const result = await Alfarooq.patch(`/expence/${data.id}`,{discription: data.discription, amount: data.amount } , {
      onUploadProgress: (progress) => {
        if (progress.loaded / progress.total === 1) {
          ToastMaker('معلوماتو بدلون وموند!')
        }
      },
    });
    return result.data;
  } catch (error) {
    ToastMaker('له سره هڅه وکړئ!')
    return error;
  }
 });



export const fetchExpencePageWithUrl = createAsyncThunk('expences/fetchExpencePageWithUrl', async (url) => {
 // Code 
  try {
    const response = await Alfarooq.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchExpencePageWithPageNumber = createAsyncThunk('expences/fetchExpencePageWithPageNumber', async (pageNumber) => {
 // Code 
  try {
    const response = await Alfarooq.get(`/expence?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const initialState = {
  expences: [],
  currPage: 0,
  lastPage: 0,
  firstPage: 1,
  nextPageUrl: '',
  prevPageUrl: '',
  totalExpences: 0,
  loading: 'idle',
  expencesDataLoaded: false,
};

export const expenseSlice = createSlice({
  name: 'expence',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTotalExpences.fulfilled, (state, action) => {
      state.totalExpences = action.payload
      state.expencesDataLoaded = true;
    });

    builder.addCase(getExpences.fulfilled, (state, action) => {
      state.currPage = action.payload.current_page;
      state.lastPage = action.payload.last_page;
      state.expences = action.payload.data;

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

    builder.addCase(addExpence.fulfilled, (state, action) => {
      // Code
      state.expences = [action.payload, ...state.expences]
      state.totalExpences += (action.payload.amount * 1);
    });

    builder.addCase(removeExpence.fulfilled, (state, action) => {
      // Code
      const item = state.expences.filter((item) => item.id === action.payload);
      state.totalExpences -= (item[0].amount * 1);
      state.expences = state.expences.filter((item) => item.id !== action.payload);
    });

    builder.addCase(updateExpence.fulfilled, (state, action) => {
      // Code
      state.expences = state.expences.map((item) => {
        if(item.id === action.payload.id) {
          state.totalExpences -= (item.amount * 1);
          item.amount = action.payload.amount;
          state.totalExpences += (item.amount * 1);
          item.discription = action.payload.discription;
        }
        return item;
      })
    });


    builder.addCase(fetchExpencePageWithUrl.pending, (state, action) => {
      state.loading = "loading";
    });
    
    builder.addCase(fetchExpencePageWithUrl.fulfilled, (state, action) => {
      state.loading = "ideal";
      state.currPage = action.payload.current_page;
      state.lastPage = action.payload.last_page;
      state.expences = action.payload.data;

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

    builder.addCase(fetchExpencePageWithPageNumber.pending, (state, action) => {
      state.loading = "loading";
    });

    builder.addCase(fetchExpencePageWithPageNumber.fulfilled, (state, action) => {
      state.loading = "ideal"
      state.currPage = action.payload.current_page;
      state.lastPage = action.payload.last_page;
      state.expences = action.payload.data;

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

export default expenseSlice.reducer;