import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
};

const calcTotalPrice = (items) =>
  items.reduce((sum, obj) => sum + obj.price * obj.count, 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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

    removeItem(state, action) {
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

    minusItem(state, action) {
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

export const selectCart = state => state.cart;

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;