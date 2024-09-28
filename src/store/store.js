// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { AssesmentApi } from '../store/AssesmentApi'; 

const store = configureStore({
  reducer: {
    [AssesmentApi.reducerPath]: AssesmentApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AssesmentApi.middleware), 
});

export default store;
