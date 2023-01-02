import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import NotificationsReducer from './notificationsSlice';
import { sampleApi } from '../services/sampleApiSlice';

export const store = configureStore({
  reducer: {
    NotificationsReducer,
    [sampleApi.reducerPath]: sampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(sampleApi.middleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

/*
store.subscribe(() => {
  console.log(`store current state: ${JSON.stringify(store.getState())}`);
});
*/

setupListeners(store.dispatch);
