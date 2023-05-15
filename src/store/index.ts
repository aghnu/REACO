import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './displaySlice';
import { useAppDispatch, useAppSelector } from './hooks';

const store = configureStore({
  reducer: {
    display: displayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { useAppDispatch, useAppSelector };
export default store;
