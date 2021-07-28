import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import logoReducer from '../features/register/logoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    logo: logoReducer,
  },
});
