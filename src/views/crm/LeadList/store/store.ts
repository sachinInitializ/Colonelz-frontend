import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadListSlice'; 

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});