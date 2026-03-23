import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import filter  from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzasSlice'


export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
})

export type RootState = ReturnType<typeof store.getState>;

// для добавления асинхронных действий
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();