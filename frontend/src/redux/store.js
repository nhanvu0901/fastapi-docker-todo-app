import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import uiSlice from "./uiSlice";


export  const store = configureStore({
  reducer: {
    uiSlice: uiSlice
  }
});

