import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params) => {
    const { currentPage, limit, category, search, sortType } = params;
    
    const [totalRes, itemsRes] = await Promise.all([    
      // Запрос 1 для получения общего количества пицц (mockapi не сообщает сколько есть страниц) 
      axios.get(`https://6984cb04885008c00db25a56.mockapi.io/items?${category}${search}`), 
      axios.get(`https://6984cb04885008c00db25a56.mockapi.io/items?page=${currentPage}&limit=${limit}&${category}${search}&sortBy=${sortType}&order=asc`)
    ]);

    return {
      items: itemsRes.data,
      totalCount: totalRes.data.length,
    };
  }
);

const initialState = {
  items: [],
  totalCount: 0, 
  status: 'loading', 
};

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalCount = action.payload.totalCount; // Сохраняем кол-во
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.totalCount = 0;
      });
  },
});

export default pizzasSlice.reducer;