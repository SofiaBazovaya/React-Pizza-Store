import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type FetchPizzasArgs = {
  currentPage: number;
  limit: number;
  category: string;
  search: string;
  sortType: string;
}

export type Pizza = {
  id: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  imageUrl: string;
}

export type FetchPizzasResponse = {
  items: Pizza[];
  totalCount: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[],
  totalCount: number, 
  status: Status, 
}


export const fetchPizzas = createAsyncThunk<FetchPizzasResponse, FetchPizzasArgs>(
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

const initialState: PizzaSliceState = {
  items: [],
  totalCount: 0, 
  status: Status.LOADING, 
};

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
        state.totalCount = 0;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<FetchPizzasResponse>) => {
        state.items = action.payload.items;
        state.totalCount = action.payload.totalCount; // Сохраняем кол-во
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
        state.totalCount = 0;
      });
  },
}); 

export default pizzasSlice.reducer;