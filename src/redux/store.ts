import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import wordReducer from './slices/wordSlice';
import { authReducer } from './slices/authSlice';
import { AuthState } from '../types';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user',], 
};

const persistedAuthReducer = persistReducer<AuthState>(authPersistConfig, authReducer);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    word: wordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
