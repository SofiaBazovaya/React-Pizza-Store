import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Тип для элемента без count 
export type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
  sizes: number;
  imageUrl: string;
}

export type CartItemInput =  CartItem & {
  count: number; 
}

interface CartSliceState {
  totalPrice: number;
  items: CartItemInput[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: []
};

const calcTotalPrice = (items:CartItemInput[]) =>
  items.reduce((sum: number, obj: CartItemInput) => sum + obj.price * obj.count, 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        obj =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.sizes === action.payload.sizes
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
            obj.sizes === action.payload.sizes
          )
      );

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        obj =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.sizes === action.payload.sizes
      );

      if (!findItem) return;

      if (findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter(
          obj =>
            !(
              obj.id === action.payload.id &&
              obj.type === action.payload.type &&
              obj.sizes === action.payload.sizes
            )
        );
      }

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