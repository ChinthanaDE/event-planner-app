import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const isProduction = process.env.NODE_ENV === 'production';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: !isProduction,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
