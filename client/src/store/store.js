import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './authSlice';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import { patientSlice } from './patientSlice';

const persistConfig = { key: 'root', storage, version: 1 };

const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authSlice.reducer,
  patient: patientSlice.reducer,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
