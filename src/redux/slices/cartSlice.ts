import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

// Тип для элемента без count 
export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  imageUrlThin: string;
  type: 0 | 1;
  size: 26 | 30 | 40;
  price: number;
}

export type CartItemInput =  CartItem & {
  count: number; 
}

interface CartSliceState {
  totalPrice: number;
  items: CartItemInput[];
}

const {items, totalPrice }=  getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        obj =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(
        obj =>
          !(
            obj.id === action.payload.id &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size
          )
      );

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        obj =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (!findItem) return;

      findItem.count--;

      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;