import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Alfarooq from '../../functions/Alfarooq';


export const getTotalExpences = createAsyncThunk(
  'expences/getAllExpencesTotal',
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
  async (book) => {
    // Code 
  }
);

export const removeExpence = createAsyncThunk('expences/removeExpence', async (id) => {
 // Code 
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
    const response = await Alfarooq.get(`/income?page=${pageNumber}`);
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
};

export const expenseSlice = createSlice({
  name: 'expence',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTotalExpences.fulfilled, (state, action) => {
      state.totalExpences = action.payload
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
    });

    builder.addCase(removeExpence.fulfilled, (state, action) => {
      // Code
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